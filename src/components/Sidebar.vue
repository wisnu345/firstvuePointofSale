<template>
    <div>
        <div class="contain" ref="sidebar">
            <div class="about">About</div>
            <button v-colorbtn="pinkcolor" @click="logOut">
                Logout
            </button>
            <span @click="close"> x </span>
        </div>
    </div>
</template>

<script>
import functions from '../mixins/functions'
export default {
  mixins: [functions],
  methods: {
    close () {
      this.$emit('close')
    },
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      location.reload()
    }
  }
}
</script>

<style scoped>
.contain{
    position: absolute;
    top:0;
    left: 0;
    height: 100vh;
    width: 300px;
    background: white;
    z-index: 100;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);
}
.hidesidebar {
    left: -100%;
}
button{
    height: 40px;
    display: block;
    width: 100px;
    border-radius: 7px;
    border: 1px solid grey;
    color: white;
    font-size: 20px;
    margin: 0px;
    position: absolute;
    bottom: 40px;
    left: 40px;

}
div.about{
    width: 100%;
    height: 50px;
    background: whitesmoke;
    justify-content: center;
    display: flex;
    text-align: center;
    align-items: center;
}
div.about:hover {
    background: lightgrey;
}
span{
    position: absolute;
    top: 0px;
    right: 20px;
    cursor: pointer;
    font-size: 30px;
}
</style>
