<template>
  <main-wrapper>
    <template slot="header">
      <div class="flex justify-between flex-col h-full">
        <div @click="toHome" class="text-sm font-bold font-nunito text-white text-left">
          Kembali
        </div>
        <selection-type-panel v-model="selectedType"></selection-type-panel>
      </div>
    </template>
    <template slot="content">
      <div class="grid gap-6">
        <input-text
          :placeholder="placeholderTitle"
          v-model="title"
        ></input-text>
        <input-text
          type="number"
          v-model.number="total"
          placeholder="Rp 150.000"
        ></input-text>
        <input-text
          type="date"
          placeholder="11/12/2021"
          v-model="selectedDate"
        ></input-text>
        <input-text
          type="file"
          placeholder="Upload Gambar"
        ></input-text>
      </div>
      <button @click="setExpense" class="bg-orange-tiger mt-6 w-full h-10 rounded-md text-white font-sans font-semibold">
        Simpan</button>
    </template>
  </main-wrapper>
</template>

<script>
import indexDb from '../helper/indexDB'
import network from '../helper/network.mixin.js'

export default {
  name: "addIncomeAndExpense",
  components:{
    'main-wrapper': () => import(/* webpackChunkName: "main-wrapper" */ "@/components/wrapper/wrapper.vue"),
    'selection-type-panel': () => import(/* webpackChunkName: "selection-panel-type"*/ '@/components/panelSelectionType.vue'),
    'input-text': () => import(/* webpackChunkName: "input-text"*/ '@/components/inputText.vue')
  },
  mixins: [network],
  data(){
    return{
      selectedType: 'income',
      title: '',
      total: 0,
      selectedDate: '',
    }
  },
  computed:{
    placeholderTitle(){
      return this.selectedType === 'income' ? 'Gaji Bulanan' : 'Jajan Mie Ayam'
    },
    firestoreCollection(){
      return this.$firestore.collection('expense')
    }
  },
  methods:{
    setExpense(){
      const currentSelectedDate = new Date(this.selectedDate).getTime()
      let payload = {
        name: this.title,
        type: this.selectedType,
        total: this.total,
        time: currentSelectedDate
      }

      this.firestoreCollection.doc(this.$userId).collection('budget_flow').add(payload)

      if(!this.onlineStatus){
        this.setSaveToCurrentLocalDB(payload)
      }

      this.setSaveToCurrentLocalDB(payload)


      this.$router.replace('/')
    },
    async setSaveToCurrentLocalDB(data){
      let _db = await indexDb({ db_name: 'expense-local-db', db_version: 1})

      const collection = _db.transaction(['transaction-list'], 'readwrite').objectStore('transaction-list')

      collection.add(data)
    },
    toHome(){
      this.$router.replace('/')
    }
  }
};
</script>

<style scoped>

</style>