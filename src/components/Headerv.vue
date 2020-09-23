<template>
  <div>
    <div class="top">
      <div class="header">
        <a href="" @click.prevent="opensidebar" class="menubtn" id="menubtn">
          <img src="../assets/icons/menu.svg" />
        </a>
        <h3 class="brand-title">Food Items</h3>
        <a class="searchbtn" @click.self="popup">
          <input type="text" @keyup="search" @keyup.enter="searchent" v-model="searchproduct" :style="{display:display}" />
          <img src="../assets/icons/search.svg" @click.self="popup" />
        </a>
      </div>
      <div class="cart-header" id="cart-h">
        <img src="../assets/icons/addcart.svg" />
        <h2>Cart</h2>
        <span class="counter">{{totalItem}}</span>
      </div>
    </div>
    <Sidebar/>
  </div>
</template>

<script>
import functions from '../mixins/functions'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: Sidebar,
  name: 'Header',
  props: ['totalItem'],
  mixins: [functions],
  data () {
    return {
      searchproduct: '',
      display: 'none'
    }
  },
  methods: {
    search () {
      this.$emit('passSearch', this.searchproduct)
    },
    searchent () {
      this.$emit('passSearchent', this.searchproduct)
    },
    popup () {
      if (this.display === 'inline-block') {
        this.display = 'none'
        this.searchproduct = ''
        this.search()
        this.searchent()
      } else {
        this.display = 'inline-block'
      }
    },
    opensidebar () {
      this.$emit('openSide')
    }
  },
  mounted () {
    console.log(this.totalItem)
  }
}
</script>

<style scoped>
.top {
  display: grid;
  grid-template-columns: 8fr 4fr;
}
.header {
  display: grid;
  grid-template-columns: 80px auto 100px;
  grid-template-rows: 80px;
  height: auto;
  grid-template-areas: "menu brand-title search";
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.menubtn {
  height: 60px;
  width: 60px;
  grid-area: menu;
  justify-content: center;
  display: flex;
  place-self: center;
}
.brand-title {
  font-size: 30px;
  font-family: "Airbnb Cereal App Medium";
  grid-area: brand-title;
  place-self: center;
}
.searchbtn {
  height: 60px;
  width: 60px;
  grid-area: search;
  justify-content: center;
  display: flex;
  place-self: center;
  position: relative;
}
input {
  position: absolute;
  right: 50px;
  top: 30% !important;
  border: 2px solid black;
  border-radius: 10px;
}
img {
  width: 30px;
  height: 30px;
  align-self: center;
}

div.cart-header h2 {
  font-size: 25px;
}
div.cart-header span {
  width: 35px;
  height: 35px;
  background-color: #57cad5;
  margin-left: 10px;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.cart-header {
  background-color: #fff;
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  z-index: 2;
}

.cart-header h2 {
  place-content: center;
}
img {
  width: 30px;
  height: auto;
}

@media (max-width: 768px) {
  #cart-h {
    display: none !important;
  }
  .top {
  display: grid;
  grid-template-columns: auto;
}
}
</style>
