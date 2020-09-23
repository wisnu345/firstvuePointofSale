<template>
  <div>
    <Header @passSearch="search($event)" @passSearchent="searchenter($event)" @openSide="sideopen" :totalItem="totalItem"/>
    <div v-if="sidebaropen">
      <Sidebar @close="sideopen"/>
    </div>
    <div class="main">
      <div class="submain">
        <div class="leftbar" id="leftbar">
          <a  class="leftbarbtn">
            <img src="../assets/icons/fork.svg" />
          </a>
          <router-link class="leftbarbtn" to="/history">
            <img src="../assets/icons/clipboard.svg" />
          </router-link>
          <a href="#" class="leftbarbtn" @click="add()">
            <img src="../assets/icons/add.svg" />
          </a>
        </div>
        <div class="cards-area">
          <div v-if="allproducts.loading">Loading ...</div>
          <div v-else class="card-grid" v-for="product in products" :key="product.id">
            <Cards :product="product" @coba="checklist"
            :listorder="listorders"
            @toDelete="rdtoDelete"
            @toEdit="rdtoEdit"
            ></Cards>
          </div>
        </div>
      </div>
        <div class="outercart" ref="cart">
          <div v-if="empty">
            <Empty />
          </div>
          <div class="cart-body" id="cart-b" v-if="orders">
            <div class="cart-listorder" id="listorder">
              <div
                v-for="({product_name, qnty, product_price, image}, index) in listorders"
                :key="index"
              >
                <div class="img-listorder">
                  <img :src="url+'/'+image" />
                </div>
                <div class="qty">
                  <h3>{{product_name}}</h3>
                  <div class="counter">
                    <span @click="dec(index)">-</span>
                    <input :value="qnty" type="text" />
                    <span @click="inc(index)">+</span>
                  </div>
                </div>
                <div class="newclass">
                  <p class="price">Rp. {{ product_price * qnty}}</p>
                  <div class="closebtn" @click="deleteorder(index)"><img src="../assets/icons/close.svg"></div>
                </div>
              </div>
            </div>
            <div class="cart-footer" id="cartfooter">
              <h2>
                <span class="total">Total :</span>
                <span class="total-price">Rp. {{subtotal}} *</span>
              </h2>
              <p>*Belum Termasuk ppn</p>
              <a class="checkout" href="#" @click="checkout()">Checkout</a>
              <a class="cancel" href="#" id="cancel" @click="cancel()">Cancel</a>
            </div>
          </div>
        </div>
      <button type="button" class="btn" @click="popUpCartbtn()" id="cart">
        <span>{{totalItem}}</span>
        <div v-if="imgCart">
          <img src="../assets/icons/cart.svg" />
        </div>
        <div v-if="imgMenu">
          <img src="../assets/icons/close.svg" />
        </div>
      </button>
      <div v-if="checkoutmodal">
        <div @click.self="checkoutmodal=false">
          <Checkout @close="checkoutmodal=false" :taxTotal="taxtotal" :grandTotal="grandTotal" :listorders="listorders"/>
        </div>
      </div>
      <div v-if="addmodal">
        <div class="screenblock">
          <Add @sendcancel="canceladd" />
        </div>
      </div>
      <div v-if="editmodal">
        <div class="screenblock">
          <Edit @sendcanceledit="canceledit" :idtoedit="idtoedit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Headerv.vue'
import Empty from '@/components/Empty'
import Checkout from '@/components/Checkout'
import Cards from '@/components/Cards.vue'
import Add from '@/components/Add'
import Edit from '@/components/Edit'
import { mapActions, mapGetters } from 'vuex'
import functions from '../mixins/functions'
import Sidebar from '@/components/Sidebar.vue'

const { url } = require('../helpers/env')

export default {
  name: 'Main',
  props: ['searchkey'],
  mixins: [functions],
  components: {
    Header,
    Cards,
    Checkout,
    Empty,
    Add,
    Edit,
    Sidebar
  },
  data () {
    return {
      products: [],
      listorders: [],
      display: 'none',
      checkoutmodal: false,
      empty: true,
      orders: false,
      addmodal: false,
      editmodal: false,
      searchproduct: '',
      popUpCart: false,
      imgCart: true,
      imgMenu: false,
      idtoedit: [],
      totalItem: 0,
      tax: 0.1,
      url: url,
      sidebaropen: false
    }
  },
  methods: {
    setProduct (data) {
      this.products = data
    },
    setlistorder (datalist) {
      this.empty = false
      this.orders = true
      this.listorders.push(datalist)
      this.listorders.forEach((e, i) => {
        if (i === this.listorders.length - 1) {
          e.qnty = 1
          this.totalItem += 1
        }
      })
    },
    checklist (x) {
      this.getdetail(x)
        .then(async (response) => {
          await this.setlistorder(this.getdetaildata)
        })
    },
    dec (index) {
      const databaru = this.listorders.map((e, i) => {
        if (i === index) {
          e.qnty -= 1
          this.totalItem -= 1
        }
        return e
      })
      this.listorders = databaru
    },
    inc (index) {
      const databaru = this.listorders.map((e, i) => {
        if (i === index) {
          e.qnty += 1
          this.totalItem += 1
        }
        return e
      })
      this.listorders = databaru
    },
    // onCheckout () {
    //   const order = {
    //     invoice: '#wab123',
    //     cashier: 'mamat',
    //     amount: '500000',
    //     detailorder: [{
    //       product_name: '',
    //       product_price: '',
    //       qty: ''
    //     }]
    //   }

    // },
    checkout () {
      this.checkoutmodal = true
      console.log(this.listorders)
    },
    add () {
      this.addmodal = true
    },
    cancel () {
      this.listorders = []
      this.empty = true
      this.orders = false
      this.refresh()
    },
    canceladd () {
      this.addmodal = false
    },
    canceledit () {
      this.editmodal = false
    },
    search (searchkey) {
      this.getall(searchkey)
        .then(() => {
          this.setProduct(this.allproducts.products)
        })
    },
    searchenter (searchkey = 'sa') {
      this.getall(searchkey)
        .then(() => {
          this.setProduct(this.allproducts.products)
        })
      this.$router.push({ path: '/', query: { name: searchkey } })
    },
    refresh () {
      location.reload()
    },
    rdtoDelete (x) {
      if (confirm('are you sure?')) {
        this.deletedata(x)
          .then((response) => {
            alert(response)
            this.getall()
              .then((response) => {
                this.setProduct(this.allproducts.products)
              })
          })
      }
    },
    rdtoEdit (x) {
      this.editmodal = true
      this.idtoedit = x
    },
    sideopen () {
      if (this.sidebaropen) {
        this.sidebaropen = false
      } else {
        this.sidebaropen = true
      }
    },
    deleteorder (index) {
      this.listorders.map((e, i) => {
        if (i === index) {
          this.totalItem = this.totalItem - e.qnty
        }
        return this.totalItem
      })
      this.listorders.splice(index, 1)
      if (this.listorders.length === 0) {
        this.empty = true
        this.orders = false
      }
      this.checkmark = false
    },
    ...mapActions({
      getall: 'products/getData',
      refreshToken: 'auth/refreshToken',
      getdetail: 'products/getDataDetail',
      deletedata: 'products/deleteData'
    })
  },
  mounted () {
    this.getall()
      .then((response) => {
        this.setProduct(this.allproducts.products)
      })
  },
  computed: {
    subtotal: function () {
      return this.listorders.reduce((total, item) => {
        return total + item.qnty * item.product_price
      }, 0)
    },
    taxtotal: function () {
      return this.subtotal * this.tax
    },
    grandTotal: function () {
      return this.subtotal + this.taxtotal
    },
    ...mapGetters({
      allproducts: 'products/getallData',
      getdetaildata: 'products/getdetail'
    })
  }
}
</script>

<style scoped>
.btn {
  display: none;
}

.main {
  display: grid;
  grid-template-columns: 8fr 4fr;
  background-color: rgba(190, 195, 202, 0.3);
  height: 100vh;
}
.submain {
  display: grid;
  grid-template-columns: 80px auto;
}
.sortnsearch {
  margin: 20px 20px 5px 20px;
}
.leftbar {
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
a {
  display: flex;
  justify-content: center;
}
img {
  width: 40px;
  height: 40px;
  margin: 10px 0px;
}
.cards-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px,200px));
  grid-template-rows: auto;
  gap: 30px;
  height: 87vh;
  overflow: scroll;
  padding: 30px;
  justify-content: center;
    background-color: rgb(236, 236, 236);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

}
.cards-area::-webkit-scrollbar {
  height: 0;
  width: 5px;
}
/* Track */
.cards-area::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* Handle */
.cards-area::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.cards-area::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.searchdata {
  right: 30%;
  width: 200px;
}
/* cart body */
div.outercart {
  max-height: 90vh;
  overflow: scroll;
  background-color: #fff;
}
.outercart::-webkit-scrollbar {
  height: 0;
  width: 5px;
}
/* Track */
.outercart::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* Handle */
.outercart::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.outercart::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.cart-body {
  display: grid;
  grid-template-areas:
    "cart-listorder"
    "cart-footer";
  grid-template-rows: 2fr 1fr;
  background-color: #fff;
}

.cart-listorder {
  grid-area: cart-listorder;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: minmax(50px, 100px);
  gap: 20px;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  grid-template-columns: auto;
  grid-template-rows: repeat(autofit, minmax(100px));
  margin: 30px 10px 30px 30px;
}
.cart-listorder div {
  display: flex;
}
.cart-listorder div div.img-listorder {
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  max-width: 100px;
  border-radius: 5px 5px 5px 5px;
  background-size: cover;
  margin-right: 10px;
}
div.img-listorder img {
  /* min-height: 90%; */
  height: 70%;
  width: 100%;
}
.cart-listorder div div.qty {
  flex: 2;
  display: grid;
  grid-template-rows: 1fr 1fr;
}
.newclass {
  display: flex;
  flex-direction: column;
}
.closebtn {
  justify-content: flex-end;
  cursor: pointer;
}
.qty input,
.qty span {
  width: 35px;
  height: 35px;
  background: rgba(130, 222, 58, 0.2);
  border: 1px solid #82de3a;
  box-sizing: border-box;
  color: #82de3a;
  font-size: 25px;
  text-align: center;
}
.qty span {
  cursor: pointer;
}
.qty input {
  background: #fff;
}

.cart-listorder div p.price {
  flex: 1;
  font-size: 20px;
  align-self: flex;
}
/* end of cart body */
/* start of cart footer */
.cart-footer {
  display: grid;
  grid-area: cart-footer;
  grid-template-rows: 2fr 1fr 2fr 2fr;
  margin: 0px 30px;
}

.cart-footer h2 {
  display: grid;
  font-size: 25px;
  grid-template-columns: 1fr 1fr;
}
.cart-footer h2 span.total {
  display: flex;
  justify-self: start;
}

.cart-footer span.total-price {
  justify-self: end;
  display: flex;
}
.cart-footer a {
  display: flex;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 25px;
}

.cart-footer a:hover {
  text-decoration: none;
  opacity: 0.8;
  transition-duration: 0.5s;
}

.cart-footer a.checkout {
  background-color: #57cad5;
  height: 61px;
}

.cart-footer a.cancel {
  background-color: #f24f8a;
  height: 61px;
}

/* end of cart footer */
/* media breakpoint */

@media (max-width: 768px) {
  .main {
    display: grid;
    grid-template-columns: auto;
    background-color: rgba(190, 195, 202, 0.3);
  }

  #cart-b {
    background-color: #fff;
    height: fit-content;
    width: 100%;
    z-index: 4;
    right: 0;
    top: 70px;
  }
  .hide{
  right: 0px !important;
}
  .outercart {
    position: absolute;
    right: -500px;
    bottom: 0;
    height: 90vh;
    box-shadow: -6px -5px 8px rgba(0, 0, 0, 0.4);
  }
  .cart-body {
    display: grid;
    grid-template-areas:
      "cart-listorder"
      "cart-footer";
    grid-template-rows: 2fr 1fr;
  }
  .cart-listorder {
    grid-template-columns: auto;
    grid-template-rows: minmax(50px, 100px);
    gap: 20px;
    height: auto;
    background-color: #fff;
    flex-direction: column;
    margin: 30px 10px 30px 30px;
  }
  .cart-listorder div {
    display: flex;
  }
  .cart-listorder div div.img-listorder {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
    max-width: 100px;
    border-radius: 5px 5px 5px 5px;
    background-size: cover;
    margin-right: 10px;
  }

  .cart-listorder div div.qty {
    flex: 2;
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
  .cart-listorder div div.qty h3 {
    font-size: 20px;
  }
  .btn {
    background-color: #fff;
    position: fixed;
    display: inline-flex;
    right: 30px;
    bottom: 30px;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    border: 2px solid #cecece;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);
    z-index: 100;
  }
  .btn img {
    width: 30px;
    height: 30px;
  }
  .btn span{
    background: #57cad5;
    position: absolute;
    top: -15px;
    left: -15px;
    border-radius: 10px;
    height: 30px;
    width: 30px;
    color: white;
    font-size: 20px;
    font-weight: bolder;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);
  }
}
</style>
