<template>
  <div>
    <SideBar />
    <NavBar />
    <DataTransaksi />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import DataTransaksi from '@/components/ViewDataTransaksi.vue'

export default {
  name: 'BarangView',
  components: {
    NavBar,
    SideBar,
    DataTransaksi
  }
}
</script>
