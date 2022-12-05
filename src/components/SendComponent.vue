<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>

          <div class="card-body">

            <!-- THIS SECTION IS FOR ERRORS THAT WOULD COME FROM API -->
            <div v-if="errors">
              <div v-for="error in errors" :key="error" class="alert alert-danger">{{ error }}</div>
            </div>

            <!-- FORM WITH v-if WILL BE SHOWN BUT THEN HIDDEN AFTER SUCCESS SUBMIT -->
            <form v-if="showForm">

              <div class="form-group row">
                <label for="first_name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <!-- NOTICE v-model="formData.name" - THAT'S HOW IT GETS ATTACHED TO THE FIELD -->
                  <input v-model="formData.first_name" id="name" type="text" class="form-control" name="first_name" required
                         autocomplete="first_name" autofocus>
                </div>
              </div>

              <div class="form-group row">
                <label for="family" class="col-md-4 col-form-label text-md-right">family</label>

                <div class="col-md-6">
                  <input v-model="formData.last_name" id="family" type="text" class="form-control" name="family"
                         required autocomplete="new-family">
                </div>
              </div>

              <div class="form-group row">
                <label for="team" class="col-md-4 col-form-label text-md-right">team</label>

                <div class="col-md-6">
                  <input v-model="formData.team_id" id="team" type="text" class="form-control" name="team" required
                         autocomplete="new-team">
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right">Avatar</label>
                <div class="col-md-6">
                  <div class="custom-file">
                    <!-- MOST IMPORTANT - SEE "ref" AND "@change" PROPERTIES -->
                    <input type="file" class="custom-file-input" id="customFile"
                           ref="file" @change="handleFileObject()">
                    <label class="custom-file-label text-left" for="customFile">{{ avatarName }}</label>
                  </div>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button @click.prevent="submit" type="submit" class="btn btn-primary"
                          style="background: #42b983; border: #42b983;">
                    ارسال
                  </button>
                </div>
              </div>
            </form>

            <!-- THIS IS THE RESULT BLOCK - SHOWING USER DATA IN CASE OF SUCCESS -->
            <div v-if="user">
              <div class="alert alert-success">User created</div>
              <div>
                <img height="100px" width="auto" :src="user.avatar_url" alt="">
              </div>
              <div>Name : {{ user.first_name }}</div>
              <div>Family : {{ user.last_name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import _ from 'lodash'

export default {
  data() {
    return {
      formData: {
        first_name: null,
        last_name: null,
        team_id: null,
      },
      image: null,
      avatarName: null,
      showForm: true,
      user: null,
      errors: null,
    }
  },
  methods: {
    submit() {
      this.errors = null

      let formData = new FormData()

      formData.append('image', this.image)

      _.each(this.formData, (value, key) => {
        formData.append(key, value)
      })


      axios.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2NmZWNjNS0yOTY1LTQyNDUtOTkwNi1lYjcyOTQ1Yzk3ZWEiLCJqdGkiOiIzMzc4NDEyNDBiYzcwNTE5NWI1ZTdhN2MwNDhiMTU5ODE2YzVmZmY2OWFhMTAzN2U5NGJhMjZiMWUzNjBjM2YzMjA5Yzg3ZGU5Mjc2OWU1NiIsImlhdCI6MTY2OTUzOTU1MC43ODcwNTYsIm5iZiI6MTY2OTUzOTU1MC43ODcwNTgxLCJleHAiOjE2ODUxNzc5NTAuNzg0MjM1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.fEtmEO4DVVkkq-_g4CW8L5ANLkAaH_CF2K25o963B37-DgNYrl8rs0NB4pjhKRgu17hQRCIHJLp816pQ48ylbIrcgJEhYnUWj7E_1FiLWaDsXjqYiCHvs1FzMHxJIIdF_-RiCMyGLNww8VovrABBs-gIAx4VXqGyGGwkxD8lYswf1q3imPOlY8mTtpmuOMTMkcKlr2-9q10Pmm8gazbuAW4ovRsBCPmaJQsABRdw0w_lIbg4JFNps_VOjFGC8BTeTVtIT1E_62doLUr1FLn25FlKjC7DmVJ8-5HOfzHv339vYBNaA9tR3hFZ8fdC_AWKLQLRZB-AjMuZdkHjFt41q18Dm91zXtUWQCODrTSVWj3Egl-7sXLNBzRZf1kOvfN3tSM6XexBSbmN5QxIE2GDEzz8CGFwA0U9XFP5NNHagwoOjSrHJuxUNWWgNgdTxZFIe158shjNK5LCDVw1PRnZJ-2h9zbB9l7cSt-0-ICXXloVqCWgmvlvq5gjCm0S1dU02uSUOTvlnkLBX06P8qPLed5bkcWVDfnbqJ3LdcBBzVDqNloSOt6gLGYiWUiWchz_tic5bcEaRcEolaaeaivCdT_aJ7syoXnbh05mQzmZxktAUUT7jg0IUZNZVBNn6QJh7STgpvUSyERsXfPFM4_Fff5mh6YGyL9ghe9mGEO4UrU`;
      axios.post('http://manager.avatoop.com/api/profile/update', formData, {
            headers: {
              'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            }
          }
      ).then(response => {
        console.log(response)
        this.showForm = false
        this.user = response.data.data
      }).catch(err => {
        if (err.response.status === 422) {

          this.errors = []
          _.each(err.response.data.errors, error => {
            _.each(error, e => {
              this.errors.push(e)
            })
          })

        }
        console.log(err)
      });
    },
    handleFileObject() {
      this.image = this.$refs.file.files[0]
      this.avatarName = this.image.name
    }
  }

}

</script>