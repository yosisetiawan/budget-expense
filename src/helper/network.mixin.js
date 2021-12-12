let data = {
  data(){
    return{
      onlineStatus: navigator.onLine
    }
  },
  mounted(){
    window.addEventListener('online', this.changeStatusNetwork)
    window.addEventListener('offline', this.changeStatusNetwork)
  },
  methods:{
    changeStatusNetwork({ type }){
      console.log('Network Status Is Change To => ', type)
      this.onlineStatus = type.toLowerCase() == 'online'
    }
  }
}

export default data