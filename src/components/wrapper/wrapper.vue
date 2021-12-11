<template>
  <div class="grid custom-wrapper h-full">
    <div class="h-full bg-royal-blue p-4 sm:hidden" v-if="isHaveHeader">
      <slot name="header"></slot>
    </div>
    <div class="h-full sm:hidden p-4 overflow-y-auto" v-if="isHaveContent">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "wrapper",
  computed:{
    isHaveHeader(){
      return this.$slots.hasOwnProperty('header')
    },
    isHaveContent(){
      return this.$slots.hasOwnProperty('content')
    }
  }
};
</script>

<style scoped>

</style>