<template>
  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="container" v-else>
    <nav class="navbar navbar-expand-sm navbar-light bg-light mb-4">
      <a class="navbar-brand" href="#">Laravel Vue 3</a>
      <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
              aria-expanded="false" aria-label="Toggle navigation"></button>
      <div class="navbar-nav" v-if="isLoggedIn">
        <router-link to="/dashboard" class="nav-item nav-link">Dashboard</router-link>
        <router-link to="/posts" class="nav-item nav-link">Posts</router-link>
        <a class="nav-item nav-link" style="cursor: pointer;" @click="logout">Logout</a>
      </div>
      <div class="navbar-nav" v-else>
        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <router-link to="/login" class="nav-item nav-link">Login</router-link>
        <router-link to="/register" class="nav-item nav-link">Register</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from "axios";
// import {computed} from "vue";
import axios from "axios";

export default {
  name: 'App',
  data(){
    return {
      isLoggedIn:false,
      User:"",
      loading:"",
      token: localStorage.getItem('token'),
    }
  },
  // beforeCreate() {
  //
  // },
  created() {
    if (JSON.parse(localStorage.getItem('isLogin'))) {
      this.loading = true
      this.checkAuth()
    }
  },

  // mounted() {
  // },
  methods:{
      checkAuth(){
       axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}` //include this in your created function
        this.$axios.get('http://localhost:8000/sanctum/csrf-cookie').then(()=>{
        this.$axios.get('http://localhost:8000/api/check-auth').then(res=>{
          window.isLoggedin=JSON.stringify(res.data.auth)
          window.user=JSON.stringify(res.data.user)
          localStorage.setItem('isAuth',window.isLoggedin)
          localStorage.setItem('User',window.user)
          this.isLoggedIn=JSON.parse(localStorage.getItem('isAuth'))
          this.loading=false
          // this.User=window.user
        })
      })
    },
    logout(e) {
        this.loading=true
       localStorage.setItem('isAuth',"false")
       localStorage.setItem('isLogin',"false")
       localStorage.setItem('User',"{}")
      localStorage.removeItem('token')
      e.preventDefault()
      this.$axios.get('http://localhost:8000/sanctum/csrf-cookie').then(() => {
        this.$axios.post('http://localhost:8000/api/logout')
            .then(response => {
              if(response.status===200) {
                window.location.href = "/"
                this.loading=false
              } else {
                console.log(response);
              }
            })
            .catch(function (error) {
              console.error(error);
            });
      })
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
  margin-top: 60px;
}
</style>
