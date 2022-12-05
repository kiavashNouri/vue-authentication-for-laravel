<template>
  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="container" v-else>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="error!==''" class="alert alert-danger alert-dismissible fade show" role="alert">
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
          <strong>{{ error }}</strong>
        </div>
        <div class="card card-default">
          <div class="card-header"><h5>Login</h5></div>
          <div class="card-body">
            <form action="">
              <div class="form-group row">
                <label for="email" class="col-sm-4 col-form-label text-md-right">E-mail</label>
                <div class="col-md-8">
                  <input type="email" id="email" class="form-control"
                         placeholder="please enter your e-mail address" v-model="email" autofocus>
                </div>
              </div>
              <div class="form-group row mt-1">
                <label for="password" class="col-sm-4 col-form-label text-md-right">Password</label>
                <div class="col-md-8">
                  <input type="email" id="password" class="form-control"
                         placeholder="please enter your password" v-model="password" autofocus>
                </div>
              </div>
              <div class="form-group row mt-1 mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-success" @click="handleLogin">Login</button>
                </div>
              </div>
              <div class="row mt-1">
                <div class="col-md-8 offset-md-4">
                  <small class="text-muted">
                    Dont have any account yet? Please
                    <router-link to="/register">Register</router-link>
                  </small>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import router from "@/router";
// import axios from "axios";


export default {
  inject:['checkAuth'],
  data() {
    return {
      email: "",
      password: "",
      error: '',
      loading:false,
      token: localStorage.getItem('token'),
      User:JSON.parse(localStorage.getItem('User'))
    }
  },
  methods: {
    async handleLogin(e) {
      this.loading=true
      e.preventDefault();
      await this.$axios.get('http://localhost:8000/sanctum/csrf-cookie').then(() => {
         this.$axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        }).then(res => {
          if (res.status===200) {
            localStorage.setItem('token', res.data.token) //store them from response
            localStorage.setItem('isLogin','true')
            window.location.href="http://localhost:8080/"
            this.loading=false
          }
        }).catch(function (error) {
           localStorage.setItem('isLogin','false')
           console.error(error)
        })
      })
    }
  },
  created() {
  },
  beforeRouteEnter(to, from, next) {
    if (JSON.parse(localStorage.getItem('isAuth'))) {
      window.location.href="http://localhost:8080/dashboard"
    }
    next();
  }
}
</script>

<style scoped>

</style>