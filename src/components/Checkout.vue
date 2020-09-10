<template>
  <div class="outercheckbox" @click.self="close">
    <div class="checkout-box" id="checkout">
      <div class="display-table">
        <div>
          <div class="checkout">
            Checkout
          </div>
          <div class="rightside">
            Receipt no: #010410919
          </div>
        </div>
        <div>
          <div>
            Cashier : Pevita Pearce
          </div>
        </div>
        <div class="items" v-for="order in listorders" :key="order.index">
          <div>
            {{order.product_name}} {{order.qnty}}x
          </div>
          <div class="rightside">
            Rp. {{order.product_price}}
          </div>
        </div>
        <div>
          <div>
            Ppn 10%
          </div>
          <div class="rightside">
            Rp. {{taxTotal}}
          </div>
        </div>
        <div>
          <div>Payment: Cash</div>
          <div class="rightside total">Total: Rp. {{grandTotal}}</div>
        </div>
      </div>
      <div class="checkoutbtn-area">
        <a href="#" class="print-btn">Print</a>
        <p>Or</p>
        <a href="#" class="email-btn">Send Email</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  props: ['taxTotal', 'grandTotal', 'listorders'],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
/* display table */
.rightside {
  text-align: right !important;
}
.display-table {
  width: 100%;
  padding: 20px 20px 0px 20px;
  display: table;
  font-weight: 500;
}
.display-table > div {
  display: table-row;
}
.display-table > div > div {
  display: table-cell !important;
  padding: 2px;
}
.checkout, .total {
  font-size: 20px !important;
  font-weight: 600 !important;
}
/* end display table */
.outercheckbox {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 3;
}

.checkout-box {
  z-index: 5;
  /* height: 70%; */
  width: 60%;
  max-height: 100%;
  background-color: #fff;
  position: fixed;
  justify-self: center;
  align-self: center;
  border-radius: 10px;
  flex-direction: column;
  right: 0;
  left: 0;
  margin: auto;
  top: 10%;
}

.checkout-box div.checkout-detail {
  background-color: #fff;
  border-radius: 15px 15px 0px 0px;
  display: grid;
  margin: 25px 45px 0px 45px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr autofit;
  grid-template-areas:
    "h2 h3"
    "h4 h4"
    "p p"
    "div div"
    "h5 h5"
    "h6 h6";
}

.checkout-detail h2 {
  grid-area: h2;
  text-align: start;
  font-size: 20px;
}

.checkout-detail h3 {
  grid-area: h3;
  text-align: end;
  font-size: 15px;
}

.checkout-detail h4 {
  grid-area: h4;
  font-size: 12px;
  vertical-align: top;
}
.checkout-detail div.items {
  grid-area: div;
  font-size: 18px;
  display: grid;
  grid-template-rows: repeat(autofit, minmax(20px, 30px));
  grid-template-columns: 1fr;
}

div.items div {
  display: flex;
}

div.items p.item-name {
  text-align: start;
  flex: 3;
}

div.items p.items-price {
  text-align: end;
  flex: 1;
}

.checkout-detail h5 {
  grid-area: h5;
  font-size: 20px;
  text-align: end;
  vertical-align: bottom;
  margin: 0;
}

.checkout-detail h6 {
  grid-area: h6;
  font-size: 20px;
  text-align: start;
  vertical-align: bottom;
  margin: 0;
}

.checkout-box div.checkoutbtn-area {
  margin: 45px;
  display: grid;
  flex: 1;
  background-color: #fff;
  border-radius: 0px 0px 15px 15px;
  grid-template-rows: auto;
}

div.checkoutbtn-area a {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 15px;
  border-radius: 10px;
  height: 40px;
}
div.checkoutbtn-area a:hover {
  text-decoration: none;
  opacity: 0.8;
  transition-duration: 0.5s;
}

div.checkoutbtn-area a.print-btn {
  background-color: #57cad5;
}
div.checkoutbtn-area a.email-btn {
  background-color: #f24f8a;
}
div.checkoutbtn-area p {
  text-align: center;
  height: 10px;
}

/* End of Checkout Box */
</style>
