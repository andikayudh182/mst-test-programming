<template>
  <div>
    <SideBar />
    <NavBar />
    <InputTransaksi />
  </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import InputTransaksi from '@/components/ViewInputTransaksi.vue'

export default {
  name: 'InputTransaksiView',
  components: {
    NavBar,
    SideBar,
    InputTransaksi
  }
}
</script>
