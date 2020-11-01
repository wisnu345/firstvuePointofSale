<template>
  <div>
    <div class="container">
      <div class="box">
          <h1>Login</h1>
        <form @submit.prevent="onLogin">
          <input type="email" placeholder=" Email" v-model="form.email" />
          <input type="password" placeholder=" Password" v-model="form.password" />
          <button type="submit" v-colorbtn="bluecolor">Login</button>
          <p>Haven't any accounts? <router-link class="leftbarbtn" to="/register">
            Register
          </router-link> now</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import functions from '../mixins/functions'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin () {
      this.actionLogin(this.form)
        .then((response) => {
          if (response === 'Login success') {
            window.location = '/'
          } else {
            alert(response)
          }
        })
        .catch((err) => {
          alert(err)
        })
    },
    ...mapActions({
      actionLogin: 'auth/login'
    })
  },
  mixins: [functions]
}
</script>

<style scoped>
.container {
    margin: 0;
    padding: 0;
    display: flex;
    min-width: 100vw;
    height: 100%;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}
.box{
    padding: 60px 0px;
    min-width: 400px;
    border: 2px solid black;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 15px;
}
input, button{
    display: block;
    margin: 20px;
    width: 300px;
    border-radius: 7px;
    border: 1px solid grey;

}
input{
    padding: 0px 10px;
    height: 35px;
}
button {
  margin-left: 20px;
  color: white;
  width: 100px;
    border: none;
}
</style>
