<template>
  <div>
    <div class="outerbox">
    <form @submit.prevent="sendData" enctype="multipart/form-data">
    <div class="addmenu-box" id="addmenu-box">
      <div class="detail-add">
        <h2>Edit Item</h2>
        <div class="addform-box" @submit.prevent="sendData" enctype="multipart/form-data">
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="product_name" :placeholder="dataToEdit.product_name"/>
          </div>
          <div>
            <label for="name">Image</label>
            <input type="file" id="image" @change="processFile($event)" />
          </div>
          <div>
            <label for="name">Price</label>
            <input type="text" id="price" :placeholder="dataToEdit.product_price" v-model="product_price" @keyup="show()"/>
          </div>
          <div>
            <label for="category">Category</label>
            <select id="category" required v-model="category_id" >
                <option  disabled selected="selected">{{dataToEdit.category_name}}</option>
              <option :value="category.id" v-for="category in categories" :key="category.id">{{category.category_name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="addbtn-area">
        <button type="button" class="cancelbtn" @click="cancel()">Cancel</button>
        <button type="submit" class="addbtn" @click="refresh()">Edit</button>
      </div>
    </div>
    </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Add',
  props: ['idtoedit'],
  data () {
    return {
      categories: [],
      dataToEdit: [],
      product_name: null,
      category_id: null,
      product_price: null,
      image: null
    }
  },
  watch: {

  },
  methods: {
    setCategory (dataCategory) {
      this.categories = dataCategory
    },
    latestData (datadetail) {
      this.dataToEdit = datadetail
    },
    processFile (event) {
      this.image = event.target.files[0]
    },
    cancel () {
      this.$emit('sendcanceledit')
    },
    show () {
    //   console.log(this.idtoedit)
      console.log(this.product_name)
      console.log(this.category_id)
      console.log(this.product_price)
      console.log(this.image)
    //   console.log(this.dataToEdit)
    },
    refresh () {
      location.reload()
    },
    sendData () {
      if (this.product_name == null) {
        this.product_name = this.dataToEdit.product_name
      } if (this.category_id == null) {
        this.category_id = this.dataToEdit.category_id
      } if (this.product_price == null) {
        this.product_price = this.dataToEdit.product_price
      }
      const dataFormdata = {
        product_name: this.product_name,
        category_id: this.category_id,
        product_price: this.product_price,
        image: this.image,
        id: this.dataToEdit.id
      }
      this.onUpdateData(dataFormdata).then((response) => {
      })
    },
    ...mapActions({
      getcategory: 'category/getData',
      getdetail: 'products/getDataDetail',
      onUpdateData: 'products/updateData'
    })
  },
  mounted () {
    this.getdetail(this.idtoedit)
      .then(async (response) => {
        await this.latestData(this.getdetaildata)
      })
    this.getcategory()
      .then((response) => {
        this.setCategory(this.dataCategory)
      })
  },
  computed: {
    ...mapGetters({
      dataCategory: 'category/getallDataCategory',
      getdetaildata: 'products/getdetail'
    })
  }
}
</script>

<style scoped>
/* Add Item Box */
.outerbox {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 3;
}

div.addmenu-box {
  grid-template-rows: 6fr 1fr;
  z-index: 5;
  height: 80%;
  width: 60%;
  max-height: 100%;
  background-color: #fff;
  position: fixed;
  justify-self: center;
  align-self: center;
  border-radius: 10px;
  right: 0;
  left: 0;
  top: 10%;
  margin: auto;
}

div.detail-add {
  background-color: #fff;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  flex-direction: column;
}

div.detail-add h2 {
  flex: 1;
  margin: 30px 30px 30px 30px;
  background-color: #fff;
}

div.detail-add div.addform-box {
  flex: 5;
  margin: 0px 30px 30px 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.addform-box div {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-bottom: 10px;
}
.addform-box div label {
  font-size: 30px;
}

.addform-box div input,
.addform-box div select {
  font-size: 20px;
  background: #ffffff;
  border: 1px solid #cecece;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.addform-box div input[type="file"] {
  min-width: -webkit-fill-available;
  width: 50%;
  height: auto;
  align-self: center;
  border-radius: 5px;
}
.addform-box div input#price {
  width: 70%;
}
select:required {
  color: #000;
  width: 50%;
}
select option {
  color: black;
}

div.addbtn-area {
  background-color: #fff;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  justify-content: flex-end;
  margin: 0px 30px 30px 30px;
}

div.addbtn-area button {
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
div.addbtn-area button {
  text-decoration: none;
  opacity: 0.8;
}
div.addbtn-area button.addbtn {
  background: #57cad5;
  margin-left: 20px;
}
div.addbtn-area button.cancelbtn {
  background: #f24f8a;
}

/* End of Add items */
</style>
