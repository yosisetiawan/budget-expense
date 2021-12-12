<template>
  <div class="mt-8 h-16 w-full grid gap-2 grid-cols-2">
    <div class="h-full rounded-l-md w-full bg-white text-black p-2">
      <div class="text-left font-bold nunito-font font-sans text-xs text-black">
        Pemasukan
      </div>
      <div class="text-right font-bold font-nunito font-sans text-lg text-green-400">
        {{ $rupiah(income) }}
      </div>
    </div>
    <div class="h-full rounded-r-md w-full bg-white text-black p-2">
      <div class="text-left font-bold nunito-font font-sans text-xs text-black">
        Pengeluaran
      </div>
      <div class="text-right font-bold font-nunito font-sans text-lg  text-red-500">
        {{ $rupiah(expense) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PanelBalance",
  props:{
    income:{
      type:Number,
      default: 0
    },
    expense:{
      type:Number,
      default: 0
    }
  }
};
</script>

<style scoped>

</style>