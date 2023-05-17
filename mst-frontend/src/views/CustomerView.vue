<template>
  <div>
    <SideBar />
    <NavBar />
    <DataCustomer />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import DataCustomer from '@/components/ViewDataCustomer.vue'

export default {
  name: 'BarangView',
  components: {
    NavBar,
    SideBar,
    DataCustomer
  }
}
</script>
