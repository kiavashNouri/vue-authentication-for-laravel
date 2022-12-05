<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if='error!==""' class="alert alert-danger alert-dismissible fade show" role="alert">
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
          <strong>{{ error }}</strong>
        </div>
        <div class="card card-default">
          <div class="card-header"><h5>Register New User</h5></div>
          <div class="card-body">
            <form action="">
              <div class="form-group row">
                <label for="email" class="col-sm-4 col-form-label text-md-right">E-mail</label>
                <div class="col-md-8">
                  <input type="text" id="email" class="form-control"
                         placeholder="please enter your e-mail address" v-model="email" autofocus>
                </div>
              </div>
              <div class="form-group row mt-2">
                <label for="name" class="col-sm-4 col-form-label text-md-right">E-mail</label>
                <div class="col-md-8">
                  <input type="text" id="name" class="form-control"
                         placeholder="please enter your name" v-model="name" autofocus>
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
                  <button type="submit" class="btn btn-success" @click="handleRegister">Register
                  </button>
                </div>
              </div>
              <div class="row mt-1">
                <div class="col-md-8 offset-md-4">
                  <small class="text-muted">
                    have an account? Please
                    <router-link to="/login">Login</router-link>
                  </small>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-link to="{name:'TestComponent',params:{id:2}}"></router-link>
</template>

<script>
// import router from "@/router";
// import axios from "axios";

export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      error: "",
    }
  },
  methods: {
    // handleRegister(e) {
    //   e.preventDefault();
    //   this.$axios.get('http://localhost:8000/sanctum/csrf-cookie').then(() => {
    //     this.$axios.post('http://localhost:8000/api/register', {
    //       name: this.name,
    //       email: this.email,
    //       password: this.password
    //     }).then(res => {
    //       if (res.data.status === 201) {
    //         router.push('/login')
    //       }
    //     }).catch(error => {
    //       if (error.response.status === 422) {
    //         this.error = error.response.data.errors.email[0]
    //       }
    //     })
    //   })
    // }
  },
  created() {
    this.$axios.get('http://manager.avatoop.com/api/indexnews').then((res)=>{
      console.log(res)
    })
    // console.log('ok')
  },
  // beforeRouteEnter(to, from, next) {
  //   if (JSON.parse(localStorage.getItem('isAuth'))) {
  //     window.location.href="http://localhost:8080/dashboard"
  //   }
  //   next();
  // }
}
</script>

<style scoped>

</style>