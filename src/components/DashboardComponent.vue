<template>
  welcome {{Name}}
</template>

<script>
export default {
  name: "DashboardComponent",
  inject:['checkAuth'],
  data(){
    return {
      Name:null,
      User:JSON.parse(localStorage.getItem('User'))
    }
  },
  created() {
    if (!JSON.parse(localStorage.getItem('isAuth'))){
      this.Name=""

    }else if(JSON.parse(localStorage.getItem('isAuth'))){
      this.Name=this.User.name
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!JSON.parse(localStorage.getItem('isAuth'))) {
      window.location.href = "http://localhost:8080";
    }
    next();
  }
}
</script>

<style scoped>

</style>