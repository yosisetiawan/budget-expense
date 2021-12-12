<template>
  <div class="grid grid-cols-2">
    <div
      :class="['text-xl text-white font-semibold font-sans', value == text.type ? 'selected-expense--type' : '']"
      :key="index"
      @click="emitFromChild(text.type)"
      v-for="(text, index) in typeList">
      {{ text.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "panelSelectionType",
  props:{
    value:{}
  },
  data(){
    return{
      typeList: [
        {
          name: 'Pemasukan',
          type: 'income'
        },
        {
          name: 'Pengeluaran',
          type: 'expense'
        }
      ]
    }
  },
  methods:{
    emitFromChild(value){
      console.log(value)
      this.$emit('input', value)
    }
  }
};
</script>

<style scoped>

</style>