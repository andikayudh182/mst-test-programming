<template>
  <div>
    <SideBar />
    <NavBar />
    <DataBarang />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import DataBarang from '@/components/ViewDataBarang.vue'

export default {
  name: 'BarangView',
  components: {
    NavBar,
    SideBar,
    DataBarang
  }
}
</script>
