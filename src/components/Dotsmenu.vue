<template>
  <v-menu>
    <v-btn flat slot="activator" color="black">
      <v-icon>mdi-dots-vertical</v-icon>
      <span>More</span>
    </v-btn>
    <v-list>
      <v-list-tile v-for="(item, i) in items" :key="i">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: 'Dotsmenu',
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  })
}
</script>

<style scoped>
</style>
