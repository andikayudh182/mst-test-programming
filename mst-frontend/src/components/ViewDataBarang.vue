<template>
  <div >
<!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #961c1a;">Data Barang</h4>
      <h4 style="margin-left: 1%;margin-right: 1%; color: #961c1a;">|</h4>
      <v-breadcrumbs-item 
      :disabled="false" 
      to="/transaksi">
        <v-icon >mdi-finance</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true">
        /
      </v-breadcrumbs-item>
      <v-breadcrumbs-item 
      :disabled="true"
      to="/barang">
        <span>Data Barang</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Datatables -->
    <v-card class="custom-card">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="barang"
        sort-by="calories"
        class="elevation-1"
        style="padding-top: 0.5%;"
      >
        <template v-slot:top>
          <v-toolbar
            dense
            flat
          >
            <v-toolbar-title>Data Barang</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <!-- Start Button Add Barang -->
              <template v-slot:activator="{ on, attrs } " >
                <v-btn
                  color="#961c1a"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  style="margin-top: auto;margin-bottom: auto;" 
                >
                  + TAMBAH BARANG
                </v-btn>
              </template>
              <!-- End Button Add Barang -->
              <!-- Start Card Pop up Add/Edit Data Barang -->
              <v-card >
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text >
                  <v-form ref="form" v-model="valid">
                  <v-container >
                    <v-text-field
                      v-model="editedItem.kode"
                      :rules="rules.kode"
                      label="Kode barang"
                      
                      :disabled="editedIndex > -1"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.nama"
                      :rules="rules.nama"
                      label="Nama Barang"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.harga"
                      :rules="rules.harga"
                
                      label="Harga Barang"
                    ></v-text-field>
                  </v-container>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#1a5f7a"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="#1a5f7a"
                    text
                    @click="save()"
                    :disabled="!valid"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
              <!-- End Card Pop up Add/Edit Data Barang -->
            </v-dialog>
            <!-- Start Card Pop up Delete Data Barang -->
            <v-dialog v-model="dialogDelete" max-width="350">
              <v-card>
                <v-card-title class="headline">
                  Delete  
                </v-card-title>
                <v-card-text>
                  <div>Do you really want to delete this item?</div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="deleteItemConfirm"
                  >
                    Yes
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="closeDelete"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- End Card Pop up Delete Data Barang -->
          </v-toolbar>

          <!-- Start Input Search -->
          <v-text-field
            dense
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            style="width: 20%;margin-right: 1%; margin-bottom: 0.5%; "
            class="custom-card"
          ></v-text-field>
          <!-- End Input Search -->
        </template>
        <!-- Start Kolom Action -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil-outline
          </v-icon>
          <v-icon
            @click="deleteItem(item)"
          >
            mdi-trash-can-outline
          </v-icon>
        </template>
        <!-- End Kolom Action -->
        <template v-slot:no-data>
          No Data
        </template>
      </v-data-table>
    </v-card>
    <!-- End Datatables -->
    <v-snackbar 
      v-model="snackbar.show" 
      :color="snackbar.color" 
      top 
      right 
      :timeout="3000"
      style="margin-right: 1%;"
    >
      <span>
        {{ snackbar.message }}
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar.show = false">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>
import axios from 'axios'

  export default {
    
    data: () => ({
     
      id_barang:'',
      duplikatNIMUpdated :false,
      resultAkhir:'',
      search : '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Kode Barang',
          align: 'start',
          value: 'kode',
        },
        { text: 'Nama Barang', value: 'nama' },
        { text: 'Harga', value: 'harga' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      // Data validasi Input
      valid: false,
      rules: {
        kode: [
          v => !!v || "Kode Barang  wajib diisi",
          v => (v && v.length >= 5) || "Kode  Minimal 5 huruf",
          v => (v && v.length <= 10) || "Kode Maksimal 10 huruf"
        ],
        nama: [
          v => !!v || "Nama Barang wajib diisi",
        ],
        harga: [
          v => !!v || "Harga Barang wajib diisi",
        //   v => /^[0-9]+$/.test(v) || 'Harga harus berupa angka',
          v => /^\d+(\.\d{1,2})?$/.test(v) || 'Harga harus berupa angka desimal'
        ]
      },
      MessageError :'',

      barang: [],
      editedIndex: -1,
      editedItem: {
        kode: '',
        nama: '',
        harga: '',
      },
      defaultItem: {
        NIM: '',
        nama: '',
        email: '',
        KoTA: '',
      },

      // Notifikasi Berhasil
      snackbar: {
        show: false,
        message: "",
        color: "",
      },

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Barang' : 'Sunting Data Barang'
      },
    },

    
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    mounted () {
      this.initialize()
      // this.$validate()

    
    },

  
   
    methods: {
     
      async initialize () {
        try {
          const response = await axios.get('http://localhost:3000/api/barang');
       
          this.barang = response.data.data
       
        } catch (error) {
          console.error(error.message);
        }

        
      },

      editItem (item) {
        this.editedIndex = this.barang.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.id_barang = this.editedItem.id
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.barang.indexOf(item)
  
        this.editedItem = Object.assign({}, item)
        this.id_barang = this.editedItem.id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        console.log(this.id_barang)
        axios({
            method:'delete',
            url: 'http://localhost:3000/api/barang/'+ this.id_barang
            
          })
          .then(response => {
          
            console.log(response.data)
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data barang berhasil dihapus!";
            if(this.snackbar.message) {
              window.location.reload()
            }
    
          })
          .catch(error => {
              console.log(error.request.response)
          })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1

          
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
       
          axios({
            method:'put',
            url: 'http://localhost:3000/api/barang/'+ this.id_barang,
            data: this.editedItem
          })
          .then(response => {
          
            console.log(response.data)
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data barang berhasil diubah!";
              if(this.snackbar.message) {
              window.location.reload()
            }
    
          })
          .catch(error => {
              console.log(error.request.response)
              this.MessageError = error.request.response
              if (this.MessageError.includes('Validation')){
                this.snackbar.show = true;
                this.snackbar.color = "error";
                this.snackbar.message = "Kode Barang Sudah Terdaftar!!!";
              }
          })
        } else {

           axios({
            method:'post',
            url: 'http://localhost:3000/api/barang/',
            data: this.editedItem
          })
          .then(response => {
          
            console.log(response.data)
            // Show success notification
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data barang berhasil disimpan!";
              if(this.snackbar.message) {
              window.location.reload()
            }
    
          })
          .catch(error => {
            console.log(error.request.response)
            this.MessageError = error.request.response
            if (this.MessageError.includes('Validation')){
              this.snackbar.show = true;
              this.snackbar.color = "error";
              this.snackbar.message = "Kode Barang Sudah Terdaftar!!!";
            }
           
          })
        }
        this.close()
      },
    },
  }
</script>



<style scoped>

.theme--light.v-sheet{
  color: #961c1a;
}
.custom-card {
  width: 97%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
}

.theme--light.v-icon{
  color:#961c1a;
}

.header_bg{
  background-color: #91BBCB
  ;
}

::v-deep .v-data-table-header{
  background-color: rgba(208, 102, 72, 0.35);
}
::v-deep .v-data-table-header span{
  color: #961c1a;
}

::v-deep .theme--light.v-data-table .v-data-table-header th.sortable.active .v-data-table-header__icon {
  color: #961c1a;
}

::v-deep .theme--light.v-data-table .v-data-table-header th.sortable .v-data-table-header__icon {
    color: rgba(145, 187, 203, 0.35);
}

</style>
