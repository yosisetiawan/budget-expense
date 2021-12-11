<template>
  <main-wrapper>
    <template slot="header">
      <div class="flex flex-row-reverse font-nunito text-xs font-sans text-white mb-2">
        <span class="h-4 w-4 rounded-full bg-green-500 ml-3">
        </span>
        Online
      </div>
      <div class="text-xl font-sans font-semibold font-nunito text-white text-left mb-1">
        Sisa Uangku
      </div>
      <div class="text-xl font-sans font-semibold font-nunito font-sans text-left text-white">
        Rp 20.000
      </div>
      <panel-balance></panel-balance>
    </template>
    <template slot="content">
      <budget-list></budget-list>
    </template>
  </main-wrapper>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    'main-wrapper': () => import(/* webpackChunkName: "main-wrapper" */ "@/components/wrapper/wrapper.vue"),
    'panel-balance': () => import(/* webpackChunkaName: "panel-balance" */ '@/components/PanelBalance.vue'),
    'budget-list': () => import(/* webpackChunkName: "budget-list"*/ '@/components/budgetList.vue')
  },
};
</script>
