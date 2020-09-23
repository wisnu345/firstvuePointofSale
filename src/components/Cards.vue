<template>
  <div>
    <div
      @change="check()"
      :class="{imgcard:true, selectedcard:selectedcard }"
      @click.prevent="classes()"
    >
      <img :src="url+'/'+product.image" />
    </div>
    <div class="body-card">
      <h5 class="title-card">{{product.product_name}}</h5>
      <span @click="fun()">
        <img src="../assets/icons/more.svg" />
        <!-- <div>Menu</div> -->
        <div class="dropdownmenu" :style="{display: display}">
          <a @click="toEdit()"> Edit</a>
          <a @click="toDelete()"> delete</a>
        </div>
      </span>
      <p class="text-card">Rp. {{product.product_price}}</p>
    </div>
  </div>
</template>

<script>
import functions from '../mixins/functions'

const { url } = require('../helpers/env')

export default {
  name: 'Cards',
  props: ['product', 'listorders', 'seeCancelation'],
  mixins: [functions],
  data () {
    return {
      selectedcard: false,
      lists: [],
      a: false,
      display: 'none',
      url: url
    }
  },
  methods: {
    classes () {
      if (!this.checkmark) {
        this.selectedcard = true
        this.$emit('coba', this.product.id)
        this.checkmark = true
        // console.log(this.product)
      } else {
        this.selectedcard = false
        this.checkmark = false
      }
    },
    fun () {
      if (this.display === 'none') {
        this.display = 'flex'
      } else {
        this.display = 'none'
      }
    },
    toEdit () {
      this.$emit('toEdit', this.product.id)
    },
    toDelete () {
      this.$emit('toDelete', this.product.id)
    }
  },
  watch: {
    check () {

    }
  }
}
</script>

<style scoped>
/* cards */

div.imgcard img {
  width: 100%;
  min-height: 150px;
  max-height: 200px;
  height: 100%;
  border-radius: 10px 10px 0px 0px;
}
.body-card {
  max-width: 100%;
  display: grid;
  grid-template-areas:
    "h5 button"
    "price price";
  grid-template-columns: 1fr 20px;
  grid-template-rows: auto;
  background-color: #fff;
  border-radius: 0px 0px 10px 10px;
  padding: 5px;
}
.body-card span {
  cursor: pointer;
}

div.body-card h5 {
  display: flex;
  align-self: flex-end;
  font-family: "Airbnb Cereal App Light";
  font-size: 25px;
  margin: 0px;
}
div.body-card p {
  display: flex;
  font-size: 25px;
  font-family: "Airbnb Cereal App Medium";
  margin: 0px;
}

/* card selected */
.imgcard {
  position: relative;
  cursor: pointer;
  height: 100%;
  max-height: 200px;
}
div.imgcard:hover::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 10px 10px 0px 0px;
  right: 0;
  align-self: center;
  background-image: url("../assets/icons/checklist.svg");
}

.selectedcard::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 10px 10px 0px 0px;
  right: 0;
  align-self: center;
  background-image: url("../assets/icons/checklist.svg");
}

span {
  justify-content: end;
  position: relative;
}
span img {
  height: 25px;
}

.dropdownmenu {
  flex-direction: column;
  position: absolute;
  min-width: 100px;
  background-color: white;
  border: 1px solid black;
  right: 0;
}

.dropdownmenu a:hover{
  background-color: black;
  color: white !important;
}
/* end cards */
</style>
