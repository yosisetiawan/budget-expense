<template>
  <input
    :type="type"
    class="border-2 text-sm rounded-lg p-2 w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-tiger"
    :placeholder="placeholder"
    :value="value"
    @change="emitToParent"
  >
</template>

<script>
export default {
  name: "inputText",
  props:{
    value:{},
    placeholder:{
      type:String,
      default: ''
    },
    type:{
      type:String,
      default: 'text'
    }
  },
  methods:{
    emitToParent(e){
      let currentValue = e.target.value

      this.$emit('input', currentValue)
    }
  }
};
</script>

<style scoped>

</style>