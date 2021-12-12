<template>
  <div id="app" class="h-screen">
    <router-view />
  </div>
</template>

<script>
import uuid from "./helper/uuid";

export default{
  computed:{
    isHaveClientId(){
      const userId = localStorage.getItem('clientId')

      return userId !== null
    }
  },
  watch:{
    isHaveClientId:{
      immediate:true,
      handler(val){
        if(!val){
          this.initClientId()
          return
        }
      }
    }
  },
  methods:{
    initClientId(){
      const uuidNumber = uuid()
      const userId = `client-${uuidNumber}`

      localStorage.setItem('clientId', userId)
      window.location.reload()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
