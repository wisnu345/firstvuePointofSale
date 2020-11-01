<template>
    <div>
        <div class="containe">
            <div v-for="(page, index) in pages" :key="index" class="page" @click="setPage(page)"
            >
                {{page}}
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      changePage: false,
      pages: []

    }
  },
  methods: {
    ...mapActions({
      getall: 'products/getData'
    }),
    setPage (x) {
      this.$emit('setpage', x)
    }
  },
  computed: {
    ...mapGetters({
      allproducts: 'products/getallData'
    })
  },
  mounted () {
    this.getall()
      .then((response) => {
        // console.log(this.allproducts.meta)
        const meta = (this.allproducts.meta)
        for (let i = 1; i <= meta.totalPage; i++) {
          this.pages.push(i)
          // console.log(this.pages)
        }
      })
  }
}
</script>

<style scoped>
.containe {
    width: 100%;
    height: 50px;
    position: absolute;
    background-color: #fff;
    bottom: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.page {
    width: 30px;
    height: 30px;
    background-color: #57cad5;
    text-align: center;
    margin: 5px;
    cursor: pointer;
    font-weight: 600;
    color: white;
    border-radius: 5px;
    font-size: 20px;
}
</style>
