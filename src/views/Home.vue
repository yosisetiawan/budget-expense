<template>
  <main-wrapper>
    <template slot="header">
      <div class="flex flex-row-reverse font-nunito text-xs font-sans text-white mb-2" @click="$router.replace('/budget')">
        <span :class="['h-4 w-4 rounded-full ml-3', onlineStatus ? 'bg-green-500' : 'bg-red-600']">
        </span>
        {{ currentStatusNetwork }}
      </div>
      <div class="text-xl font-sans font-semibold font-nunito text-white text-left mb-1">
        Sisa Uangku
      </div>
      <div class="text-xl font-sans font-semibold font-nunito font-sans text-left text-white">
        {{ $rupiah(currentSpentTransaction['current_balance']) }}
      </div>
      <panel-balance
      :expense="currentSpentTransaction['expense']"
      :income="currentSpentTransaction['income']"
      ></panel-balance>
    </template>
    <template slot="content">
      <budget-list
      :transactions="transactionList"
      ></budget-list>
    </template>
    <template slot="content">
      <add-event></add-event>
    </template>
  </main-wrapper>
</template>

<script>
import indexDb from '../helper/indexDB'

//Mixins
import network from '../helper/network.mixin.js'

export default {
  name: "Home",
  components: {
    'main-wrapper': () => import(/* webpackChunkName: "main-wrapper" */ "@/components/wrapper/wrapper.vue"),
    'panel-balance': () => import(/* webpackChunkaName: "panel-balance" */ '@/components/PanelBalance.vue'),
    'budget-list': () => import(/* webpackChunkName: "budget-list"*/ '@/components/budgetList.vue'),
    'add-event': () => import(/* webpackChunkName: "budget-list"*/ '@/components/addEvent.vue')
  },
  data(){
    return{
      transactionList: [],
      indexDbModel: null
    }
  },
  mixins: [network],
  mounted() {
    this.initialIndexDb()
  },
  watch:{
    indexDbModel:{
      immediate:true,
      handler(val){
        if(val){
          this.initialUserCredential()
        }
      }
    }
  },
  computed:{
    firestoreCollection(){
      return this.$firestore.collection('expense')
    },
    isTransactionHaveData(){
      return this.transactionList.length !== 0
    },
    currentSpentTransaction(){
      if(this.isTransactionHaveData){
        const income = this.calculateSubTransaction(this.transactionList, 'income')
        const expense = this.calculateSubTransaction(this.transactionList, 'expense')
        return {
          income: income,
          expense: expense,
          current_balance: parseInt(income) - parseInt(expense)
        }
      }

      return 0
    },
    currentStatusNetwork(){
      return this.onlineStatus ? 'Online' : 'Offline'
    },
    localStoreIndexDb(){
      let _self = this

      return (type = 'readonly') => {
        if(this.indexDbModel){
          let transactionModel = _self.indexDbModel.transaction(['transaction-list'], type)

          return transactionModel.objectStore('transaction-list')
        }

        return null
      }

    }
  },
  methods:{
    async initialIndexDb(){
      this.indexDbModel = await indexDb({ db_name: 'expense-local-db', db_version: 1})
    },
    async initialUserCredential(){
      const userId = this.$userId
      const isValidClient = await this.checkClientIdHasRegistered(userId)

      if(!isValidClient){
        this.firestoreCollection.doc(userId).set({
          client_id: userId,
          balance: 0
        })
        return
      }

      this.initialCalculateBudget()
    },
    checkClientIdHasRegistered(){
      return new Promise(async (resolve) => {
        if(!this.onlineStatus){
          return resolve(true)
        }

        let result = []
        const query = this.firestoreCollection.where('client_id', '==', this.$userId)

        await query.get().then((querySnapShoot) => {
          querySnapShoot.forEach((doc) => {
            result.push(doc.data())
          })
        })

        const isHaveId = result.some((data) => data.client_id == this.$userId)

        return resolve(isHaveId)
      })
    },
    async initialCalculateBudget(){
      if(!this.onlineStatus){
        console.log('Load Data From Index DB')
        this.getLocalData()
        return
      }

      let localDb = this.localStoreIndexDb('readwrite')
      localDb.clear()
      let transactions = []
      const userId = this.$userId

      const collection = this.firestoreCollection.doc(userId).collection('budget_flow').orderBy('time', 'desc').get()
      console.log('Loaded From Firestore')
      await collection.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          transactions.push({
            id: doc.id,
            ...doc.data()
          })
        })
      }).catch((err) => {
        console.log(err, 'OOPS Error')
      })

      transactions.forEach((data) => {
        console.group()
        console.log('Insert ID to Local Database', data.id)
        this.localStoreIndexDb('readwrite').add(data)
        console.log('Success insert id:', data.id)
        console.groupEnd()
      })

      this.transactionList = transactions
    },
    calculateSubTransaction(transactionList,type){
      return transactionList
        .filter((transaction) => transaction.type == type)
        .reduce((acc, transaction) => {
          return acc + transaction.total
        }, 0)
    },
    async getLocalData(){
      const localData = await this.localStoreIndexDb('readwrite')

      let self = this

      localData.openCursor().onsuccess = e => {
        let cursor = e.target.result

        if(cursor){
          self.transactionList.push(cursor.value)
          cursor.continue()
        }
      }
    }
  }
};
</script>
