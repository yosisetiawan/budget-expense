<template>
  <main-wrapper>
    <template slot="header">
      <div class="flex justify-between flex-col h-full">
        <div class="text-sm font-bold font-nunito text-white text-left">
          Kembali
        </div>
        <selection-type-panel v-model="selectedType"></selection-type-panel>
      </div>
    </template>
    <template slot="content">
      <div class="grid gap-6">
        <input-text
          :placeholder="placeholderTitle"
        ></input-text>
        <input-text
          type="number"
          placeholder="Rp 150.000"
        ></input-text>
        <input-text
          type="date"
          placeholder="11/12/2021"
        ></input-text>
        <input-text
          type="file"
          placeholder="Upload Gambar"
        ></input-text>
      </div>
      <button class="bg-orange-tiger mt-6 w-full h-10 rounded-md text-white font-sans font-semibold">
        Simpan</button>
    </template>
  </main-wrapper>
</template>

<script>
export default {
  name: "addIncomeAndExpense",
  components:{
    'main-wrapper': () => import(/* webpackChunkName: "main-wrapper" */ "@/components/wrapper/wrapper.vue"),
    'selection-type-panel': () => import(/* webpackChunkName: "selection-panel-type"*/ '@/components/panelSelectionType.vue'),
    'input-text': () => import(/* webpackChunkName: "input-text"*/ '@/components/inputText.vue')
  },
  data(){
    return{
      selectedType: 'income'
    }
  },
  computed:{
    placeholderTitle(){
      return this.selectedType === 'income' ? 'Gaji Bulanan' : 'Jajan Mie Ayam'
    }
  }
};
</script>

<style scoped>

</style>