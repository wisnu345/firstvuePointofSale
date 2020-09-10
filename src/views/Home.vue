<template>
  <div >
    <div class="container-grid">
        <Main :searchkey="searchkey"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main.vue'

export default {
  name: 'Home',
  data () {
    return {
      searchkey: '',
      disable: false
    }
  },
  components: {
    Main
  },
  methods: {
    myMethod (x) {
      this.searchkey = x
      console.log(this.searchkey)
    }
  }
}
</script>

<style scoped>
.container-grid{
  position: relative;
  padding: 0px;
  margin: 0px;
  height: 100vh;
  overflow: hidden;
}

</style>
