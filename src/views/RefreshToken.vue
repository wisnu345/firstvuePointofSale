<template>
  <div>
      <h4>Loading refresh token...</h4>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      refreshToken: {
        refreshToken: localStorage.getItem('refreshtoken')
      }
    }
  },
  mounted () {
    this.actionRefresh(this.refreshToken)
      .then((response) => {
        window.location = '/'
      })
  },
  methods: {
    ...mapActions({
      actionRefresh: 'auth/refreshToken'
    })
  }
}

</script>

<style scoped>
</style>
