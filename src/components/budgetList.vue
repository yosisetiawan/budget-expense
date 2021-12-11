<template>
  <div class="grid gap-4">
    <div class="h-20 bg-gray-300 rounded-xl p-3">
      <div class="flex justify-between font-nunito font-sans font-bold content-center items-center mb-1">
        <div class="tex-sm">
          Gajian Metranet
        </div>
        <div class="text-xs">
          ASSUISUSUS
        </div>
      </div>
      <div class="text-2xl text-left font-bold">
        70.000
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "budgetList",
  props:{
    budgetList:{
      type:Array,
      default: () => []
    }
  }
};
</script>

<style scoped>

</style>