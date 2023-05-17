<template>
  <nav>
    <v-toolbar 
    class="custom-toolbar" 
    style="border-radius: 5px;">
      <v-spacer></v-spacer>
      <v-toolbar-title class="text_main--text text-end" style="line-height:1.25rem;">

        <v-row no-gutters style="justify-content: end;">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <span               
              v-bind="attrs"
              v-on="on"
              >
              Hello, {{ loggedIn.nama }} </span>
            </template>
            <v-list>
              <!-- <v-list-item v-for="(item, index) in items" :key="index" :to="item.link" @click="handleItemClick(item)"> -->
              <v-list-item>
                <v-list-item-title>
                  <v-btn 
                    @click="handleLogout"
                  >
                  Keluar
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row no-gutters style="justify-content: end; ">
          <span class="font-weight-light" ></span>
        </v-row>

      </v-toolbar-title>
    </v-toolbar>
  </nav>

  
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      items: [
        { title: 'Keluar' , link:'/'},
        
      ],
      status_navbar:false,
      loggedIn:'',
      navbar:''
    }),

    mounted() {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.navbar= payload.user;
      }

      this.initializeNavbarLoggedIn()

    },
    methods:{
      handleLogout() {
     
        // Hapus token dari localStorage
        localStorage.removeItem('token');

       setTimeout(() => {
        this.$router.push('/');
      }, 1000); // Penundaan selama 1 detik (1000 milidetik)
            
    },
      async initializeNavbarLoggedIn (){
        // const token = localStorage.getItem('token'); 
        // const headers = { Authorization: `Bearer ${token}` };
        
        try {
          // const response = await axios.get(`http://localhost:3000/api/getkoordata/${this.navbar.id_user}`, { headers });
          const response = await axios.get(`http://localhost:3000/api/user/${this.navbar.id}`);
          this.loggedIn = response.data.data
          console.log(this.loggedIn)
         
        } catch (error) {
          console.error(error.message);
        }
      }
    },

  }
</script>

<style scoped>
.costum_dropdown{
  margin-top: 50%;
  margin-right: auto;
}

.custom-toolbar {
  width: 97%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
}

.v-list .v-list-item{
  border-radius: 6px;
}

.v-list .v-list-item--active{
  background-color: white !important;
  border-radius: 6px;
}

</style>
