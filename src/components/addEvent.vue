<template>
    <div @click="toBudgetPage" class="absolute btn-add bg-orange-tiger rounded-full flex items-center text-white justify-center ">
        <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        toBudgetPage(){
            this.$router.push('/budget')
        }
    }
}
</script>

<style>

</style>