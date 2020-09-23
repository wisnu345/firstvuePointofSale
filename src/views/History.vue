<template>
  <div class="history">
    <div class="container-grid" id="container">
      <!-- header -->
      <div class="header">
        <a href="#" class="menubtn" @click="sideopen"
          ><img src="../assets/icons/menu.svg"
        /></a>
        <h3 class="brand-title">History</h3>
      </div>
      <div v-if="sidebaropen">
        <Sidebar @close="sideopen" />
      </div>
      <!-- Main Page -->
      <div class="main-page">
        <div class="leftbar" id="sidebar">
          <router-link to="/" class="leftbarbtn"
            ><img src="../assets/icons/fork.svg"
          /></router-link>
        </div>
        <div class="history">
          <div class="recap">
            <div class="twinbox twinbox1">
              <h5>Today's Income</h5>
              <h3>Rp. 100.000.000</h3>
              <p>+2% Yesterday</p>
            </div>
            <div class="twinbox twinbox2">
              <h5>Order</h5>
              <h3>3.270</h3>
              <p>+5% Last week</p>
            </div>
            <div class="twinbox twinbox3">
              <h5>This Year Income</h5>
              <h3>Rp. 100.000.000.000</h3>
              <p>+10% Last Year</p>
            </div>
          </div>
          <div class="chart-line">
            <h3>Revenue</h3>
            <select id="month" placeholder="Category" required>
              <option value="" disabled selected class="option">Month</option>
              <option value="#">January</option>
              <option value="#">February</option>
            </select>
            <canvas id="chart_0"></canvas>
          </div>
          <div class="recordertable">
            <h3>Revenue</h3>
            <select id="today" placeholder="Category" required>
              <option value="" disabled selected class="option">Today</option>
              <option value="#">Yesterday</option>
              <option value="#">23 August 2020</option>
            </select>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Invoices</th>
                  <th scope="col">Cashier</th>
                  <th scope="col">Date</th>
                  <th scope="col">Order</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">#10928</td>
                  <td>Cashier 1</td>
                  <td>06 Oct 2019</td>
                  <td>Ice Tea, Salad With peanut sauce</td>
                  <td>Rp. 120.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
  data () {
    return {
      sidebaropen: false
    }
  },
  components: {
    Sidebar
  },
  methods: {
    sideopen () {
      if (this.sidebaropen) {
        this.sidebaropen = false
      } else {
        this.sidebaropen = true
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.none {
  display: none;
}
body {
  background-color: #fff;
  font-family: "Airbnb Cereal App Medium";
  font-style: medium;
}

/* Header */
.container-grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-areas:
    "header"
    "main-page";
  position: relative;
  /* height: 120% */
}
.header {
  z-index: 5;
  display: grid;
  grid-template-columns: 80px auto;
  grid-template-rows: 80px;
  height: auto;
  grid-template-areas: "menu brand-title";
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

/* End Header */
/* Start of Main Page */

.main-page {
  display: grid;
  grid-area: main-page;
  grid-template-areas: "leftbar history";
  grid-template-columns: 80px 12fr;
  background-color: rgba(190, 195, 202, 0.3);
  margin-bottom: 20px;
}

.main-page div.leftbar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 3;
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
.menubtn img {
  width: 30px;
  height: 30px;
}
/* End of Main Page */

/* CHart Js */
.history {
  grid-area: history;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.recap {
  width: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px;
}

.recap div.twinbox {
  display: flex;
  flex-direction: column;
  width: auto;
  height: 150px;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}
.twinbox h3 {
  font-size: 30px;
}
.twinbox h5 {
  top: 20%;
  font-size: 15px;
}
.twinbox p {
  vertical-align: top;
  font-size: 15px;
}

.twinbox1 {
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  border-radius: 10px;
}

.twinbox2 {
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
  border-radius: 10px;
}
.twinbox3 {
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
}
.chart-line {
  background-color: white;
  height: 100%;
  width: 90%;
  display: grid;
  grid-template-areas:
    "revenue month"
    "canvas canvas";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  /* margin: 30px 0px 30px 30px; */
  place-self: center;
}

.chart-line h3 {
  margin: 20px 0px 0px 20px;
  display: flex;
  font-size: 30px;
  grid-area: revenue;
  align-self: end;
}
.chart-line select#month:required {
  width: 20%;
  height: 50%;
  grid-area: month;
  margin: 20px 20px 0px 0px;
  display: flex;
  place-self: end;
  border-radius: 15px;
  background-color: #cecece;
  border: 0px;
  color: black;
}

canvas {
  grid-area: canvas;
  background: #ffffff;
  border-radius: 10px;
  max-height: 500px;
  width: 100%;
  overflow: scroll;
}

.recordertable {
  background-color: white;
  height: 100%;
  width: 90%;
  display: grid;
  grid-template-areas:
    "recent today"
    "table table";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  /* margin: 30px 0px 30px 30px; */
  place-self: center;
  margin-top: 30px;
}
.recordertable h3 {
  margin: 20px 0px 0px 20px;
  display: flex;
  font-size: 30px;
  grid-area: recent;
  align-self: end;
}

.recordertable select#today:required {
  width: 20%;
  height: 50%;
  grid-area: today;
  margin: 20px 20px 0px 0px;
  display: flex;
  place-self: end;
  border-radius: 15px;
  background-color: #cecece;
  border: 0px;
  color: black;
}

table {
  grid-area: table;
  overflow: scroll;
}
tbody td {
  color: #cecece;
}

/*end chart JS */
/* Media Breakpoints */

@media (min-width: 769px) and (max-width: 1023px) {
  .menubtn {
    height: 60px;
    width: 60px;
    justify-content: center;
    display: flex;
  }
  .menubtn img {
    height: 30px;
    width: 30px;
    place-self: center;
  }
  .header {
    grid-template-columns: 1fr 9fr 1fr;
    height: 70px;
  }

  .main-page div.leftbar {
    grid-template-columns: auto;
    height: 100%;
    grid-template-rows: 60px 60px 60px;
  }

  .leftbar a {
    height: 50px;
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .leftbar a img {
    height: 70%;
    width: 28px;
    display: flex;
    align-self: center;
  }

  .main-page div.cards-area {
    grid-area: cards-area;
    height: 100%;
  }

  .cards-area {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(3, 165px);
    gap: 20px;
    margin: 20px;
  }

  .card-grid div.body-card h5 {
    display: flex;
    justify-content: flex-start;
    align-self: flex-end;
    font-family: "Airbnb Cereal App Light";
    font-size: 12px;
  }
  .card-grid div.body-card p {
    display: flex;
    justify-content: flex-start;
    align-self: center;
    font-size: 12px;
    font-family: "Airbnb Cereal App Medium";
  }
  .cart-body div img {
    height: 150px;
  }
  .cart-body h2 {
    font-size: 15px;
  }
  .cart-body p {
    font-size: 12px;
  }
}
/* madia up to 1300px */

@media (max-width: 768px) {
  #cart-b,
  #cart-h {
    display: none;
  }
  div.addmenu-box {
    height: 50%;
    max-height: 80%;
  }

  .addform-box div label {
    font-size: 20px;
  }
  .addform-box div input,
  .addform-box div select {
    font-size: 15px;
  }

  div.addbtn-area {
    background-color: #fff;
    border-radius: 0px 0px 10px 10px;
    display: flex;
    justify-content: flex-end;
    margin: 0px 30px 30px 30px;
  }

  div.addbtn-area a {
    display: flex;
    width: 180px;
    height: 66px;
    border-radius: 10px;
    font-size: 30px;
    text-decoration: none;
    color: white;
    justify-content: center;
    align-items: center;
  }
  div.addbtn-area a:hover {
    text-decoration: none;
    opacity: 0.8;
    transition-duration: 0.5s;
  }
  div.addbtn-area a.addbtn {
    background: #57cad5;
    margin-left: 20px;
  }
  div.addbtn-area a.cancelbtn {
    background: #f24f8a;
  }
}

@media (max-width: 425px) {
  .recap {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 20px;
    place-self: center;
  }
  .header {
    height: 50px;
    grid-template-columns: 1fr;
    grid-template-areas: "brand-title";
    position: relative;
    align-content: center;
  }
  .menubtn {
    height: 30px;
    width: 30px;
    position: absolute;
    align-self: center;
    justify-self: start;
    margin-left: 10px;
    align-items: center;
  }
  .menubtn img {
    height: 80%;
    width: 80%;
  }
  .brand-title {
    font-size: 20px;
  }
  .main-page {
    display: grid;
    grid-template-areas:
      "leftbar"
      "history";
    grid-template-rows: 1fr auto;
    grid-template-columns: auto;
  }

  .main-page div.leftbar {
    z-index: 1;
    display: grid;
    grid-area: leftbar;
    grid-template-columns: auto;
    height: 100%;
    grid-template-rows: 50px;
    grid-gap: 1px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }

  .leftbar a img {
    height: 100%;
    width: 28px;
    display: flex;
    align-self: center;
  }
  .leftbar a {
    height: 50px;
    display: flex;
    justify-self: center;
  }
  .chart-line h3 {
    font-size: 20px;
  }
  .chart-line select#month:required {
    width: 50%;
    height: 50%;
    font-size: 15px;
  }
  .recordertable h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .recordertable select#today:required {
    width: 50%;
    height: 50%;
    font-size: 15px;
    margin-bottom: 10px;
  }

  table {
    grid-area: table;
    font-size: 8px;
  }
  tbody td {
    color: #cecece;
  }
  div.addmenu-box {
    height: 60%;
    max-height: 80%;
    width: 90%;
  }
  div.addform-box div {
    width: max-content;
  }
  div.detail-add h2 {
    font-size: 25px;
  }
  .addform-box div label {
    font-size: 15px;
  }
  .addform-box div input,
  .addform-box div select {
    font-size: 12px;
    margin-left: 40px;
    border-radius: 5px;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
  }

  div.addbtn-area {
    background-color: #fff;
    border-radius: 0px 0px 10px 10px;
    display: flex;
    justify-content: center;
    margin: 0px 30px 30px 30px;
  }

  div.addbtn-area a {
    width: 80px;
    height: 40px;
    font-size: 15px;
  }
}
</style>
