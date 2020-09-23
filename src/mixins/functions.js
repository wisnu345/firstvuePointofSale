const functions = {
  data () {
    return {
      pinkcolor: '#f24f8a',
      bluecolor: '#57cad5',
      sidebaropen: false
    }
  },
  methods: {
    popUpCartbtn () {
      const cart = this.$refs.cart.classList
      cart.contains('hide') ? cart.remove('hide') : cart.add('hide')
      cart.contains('hide') ? this.imgMenu = true : this.imgMenu = false
      cart.contains('hide') ? this.imgCart = false : this.imgCart = true
    },
    sidebarbtn () {
      alert(this.sidebaropen)
      this.sidebaropen = true
      const cart = this.$refs.sidebar.classList
      cart.contains('hidesidebar') ? cart.remove('hidesidebar') : cart.add('hidesidebar')
    }
  },
  directives: {
    colorbtn: {
      bind: (element, binding) => {
        element.style.background = binding.value
      }
    }
  }
}

export default functions
