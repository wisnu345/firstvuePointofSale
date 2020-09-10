<template>
  <div>
    <div id="empty">
      <div class="cart-images">
        <img src="../assets/icons/foodndrink.svg" />
      </div>
      <h2 class="empty-notes">Your Cart is Empty</h2>
      <p class="empty-notes">Please add some items from menu</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Empty'
}
</script>

<style scoped>

/* Empty */
#empty{
    display: block;
    flex-direction: column;
}
#empty div {
    display: flex;
    align-self: end;
    justify-content: center;
}
#empty div img{
    display: flex;
    align-self: end;
    justify-content: center;
}

#empty h2 {
    font-size: 30px;
    display: flex;
    justify-content: center;
}
#empty p {
    font-size: 20px;
    display: flex;
    justify-content: center;
    color: #cecece;
}
/* End of Empty */
</style>
