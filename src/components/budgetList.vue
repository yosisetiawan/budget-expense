<template>
  <div class="grid gap-4">
    <div class="h-20 bg-gray-300 rounded-xl p-3" v-for="(transaction, index) in transactions" :key="index">
      <div class="flex justify-between font-nunito font-sans font-bold content-center items-center mb-1">
        <div class="text-sm">
          {{ transaction.name }}
        </div>
        <div class="text-xs">
          {{ transaction.time | toLocaleTime }}
        </div>
      </div>
      <div :class="['text-2xl text-left font-bold',transaction.type == 'expense' ? 'text-red-500' : 'text-green-400']" >
        {{ formatMoney(transaction.total) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "budgetList",
  props:{
    transactions:{
      type:Array,
      default: () => []
    }
  },
  filters:{
    toLocaleTime: function (value){
      return new Date(value).toLocaleDateString('id')
    }
  },
  methods:{
    toRupiah(val) {
      return `Rp. ${this.formatMoney(Number(val))}`
    },
    formatMoney(amountCount, countDesimal = 2, thousands = ".") {
      try {
        countDesimal = Math.abs(countDesimal);
        countDesimal = isNaN(countDesimal) ? 2 : countDesimal;

        const signNegative = amountCount < 0 ? "-" : "";
        amountCount = Math.abs(Number(amountCount) || 0).toFixed(countDesimal)
        let i = parseInt(amountCount).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return signNegative + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
      } catch (e) {
        return '0,00'
      }
    }
  }
};
</script>

<style scoped>

</style>