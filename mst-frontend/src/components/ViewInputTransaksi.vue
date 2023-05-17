<template>
    <div>
<!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #961c1a;">Input Transaksi</h4>
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
        <span>Input Transaksi</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->
     <!-- Start-->
     <v-card
    class="custom-card"
    >
        <div style="width: 97%;margin-left: auto;margin-right: auto;">
            <v-form v-model="externalValid">
                <v-row>
                    <v-col cols="6">
                        <v-card-title>Transaksi</v-card-title>
                        <v-card-text >
                            <!-- Start Form No Transaksi -->
                            <v-row>
                            <v-col cols="4">
                                <div class="justify-center">
                                <span 
                                   style="font-size:1rem; color:black; font-weight:bold"
                                
                                >No Transaksi</span>
                                </div>
                            </v-col>
                            <v-col cols="8" >
                                <v-text-field
                                    style="background-color:#ada7a5" 
                                    v-model="generateNoTransaksi"
                                    dense
                                    outlined
                                    readonly
                                    hide-details
                                    ></v-text-field>
                            </v-col>
                            </v-row>
                            <!-- End Form No Transaksi -->
                            <!-- Start Form Tanggal Disidangkan -->
                            <v-row>
                            <v-col cols="4">
                                <div class="justify-center">
                                <span 
                                   style="font-size:1rem; color:black; font-weight:bold"
                                >Tanggal Transaksi</span>
                                <v-text-field__details></v-text-field__details>
                                </div>
                            </v-col>
                            <v-col cols="8" >
                                <v-dialog
                                ref="dialog"
                                v-model="menu_transaksi"
                                :return-value.sync="date"
                                persistent
                                width="290px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="tgl_transaksi"
                                    placeholder="Pilih Tanggal"
                                    dense
                                    outlined
                                    :rules="rules.tgl_transaksi"
                                    clearable
                                    readonly
                                    append-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="tgl_transaksi"
                                    @change="handleGenerateNoTransaksi"
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                    text
                                    color="primary"
                                    @click="menu_transaksi = false"
                                    >
                                    Cancel
                                    </v-btn>
                                    <v-btn
                                    text
                                    color="primary"
                                    @click="menu_transaksi = false"
                                    >
                                    OK
                                    </v-btn>
                                </v-date-picker>
                                </v-dialog>
                            </v-col>
                            </v-row>
                            <!-- End Form Tanggal Disidangkan -->
                        </v-card-text>
                    </v-col>
                    <v-col cols="6" >
                        <v-card-title>Customer</v-card-title>
                        <v-card-text>
                            <!-- Start Form Tanggal Disetujui -->
                            <v-row>
                            <v-col cols="4">
                                <div class="justify-center">
                                <span 
                                   style="font-size:1rem; color:black; font-weight:bold"
                                >Kode</span>
                                </div>
                            </v-col>
                            <v-col cols="8" >
                              <v-row v-for="(item, index) in formCustomer" :key="index">
                                <v-col>
                                  <v-select
                                    v-model="item.selectedItem"
                                    :items="filteredCustomer(index)"
                                    :rules="rules.customer"
                                    clearable
                                    outlined
                                    dense
                                    @change="handleGetNama"
                                    :menu-props="{ offsetY: true}"
                                    :placeholder="'Pilih Customer '"
                                  >
                                    <template v-slot:prepend-item>
                                      <v-text-field
                                      style="width: 97%;margin-left: auto;margin-right: auto;"
                                        v-model="item.search"
                                        :label="'Cari Penguji '"
                                        hide-details
                                        @input="onSearchCustomer(index )"
                                      />
                                    </template>
                                  </v-select>
                                </v-col>
                              </v-row>
                            </v-col>
                            </v-row>
                            <!-- End Form Tanggal Disetujui -->
                            <!-- Start Form Tanggal Disetujui -->
                            <v-row>
                            <v-col cols="4">
                                <div class="justify-center">
                                <span 
                                  style="font-size:1rem; color:black; font-weight:bold"
                                >Nama</span>
                                </div>
                            </v-col>
                            <v-col cols="8" >
                                <v-text-field 
                                    v-model="customer.nama"
                                    dense
                                    outlined
                                    readonly
                                    hide-details
                                    ></v-text-field>
                            </v-col>
                            </v-row>
                            <!-- End Form Tanggal Disetujui -->
                            <!-- Start Form Tanggal Disetujui -->
                            <v-row>
                            <v-col cols="4">
                                <div class="justify-center">
                                <span 
                                 style="font-size:1rem; color:black; font-weight:bold"
                                >No Telp</span>
                                </div>
                            </v-col>
                            <v-col cols="8" >
                                <v-text-field 
                                    v-model="customer.telp"
                                    dense
                                    outlined
                                    hide-details
                                    readonly   
                                    ></v-text-field>
                            </v-col>
                            </v-row>
                            <!-- End Form Tanggal Disetujui -->
                            
                        </v-card-text>
                    </v-col>
                </v-row>
                <!-- Start Datatables with snackbar  -->
                <v-row>
                    <v-col>
                      <v-data-table
                        :headers="headers"
                        :items="itemsBarang"
                        :item-key="itemKey"
                        sort-by="calories"
                        class="elevation-1"
                      > 

                        <template v-slot:top>
                          <v-toolbar
                            flat
                          >
                           
                          
                            <v-dialog
                              v-model="dialog"
                              max-width="500px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="#961c1a"
                                  dark
                                  class="mb-2"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  + Tambah Transaksi
                                </v-btn>
                              </template>
                              <v-card>
                                <v-card-title>
                                  <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container>
                                     <v-form @input="calculateValues" ref="form" v-model="valid">
                                         <v-row v-for="(item, index) in formBarang" :key="index">
                                          <v-col>
                                            <v-select
                                              v-model="item.selectedItem"
                                              :rules="rules.kode_barang"
                                              :items="filteredBarang(index)"
                                              clearable
                                              outlined
                                              dense
                                               @change="handleGetBarang"
                                              :menu-props="{ offsetY: true}"
                                              :placeholder="'Pilih Kode Barang '"
                                            >
                                              <template v-slot:prepend-item>
                                                <v-text-field
                                                style="width: 97%;margin-left: auto;margin-right: auto;"
                                                  v-model="item.search"
                                         
                                                  :label="'Cari Kode Barang '"
                                                  hide-details
                                                  @input="onSearchBarang(index)"
                                                />
                                              </template>
                                            </v-select>
                                          </v-col>
                                        </v-row>
                
                                        <v-text-field
                                          v-model="editedItem.nama"
                                          label="Nama Barang"
                                          :rules="rules.nama_barang"
                                          readonly
                                          @input="calculateValues"
                                        ></v-text-field>

                                        <v-text-field
                                          v-model.number="editedItem.qty"
                                          label="Qty"
                                          :rules="rules.qty"
                                          @input="calculateValues"
                                        ></v-text-field>
                       
                                        <v-text-field
                                          v-model.number="editedItem.harga_bandrol"
                                          label="Harga Bandrol"
                                         :rules="rules.harga_bandrol"
                                          readonly
                                          @input="calculateValues"
                                        ></v-text-field>
                                      
                                        <v-text-field
                                          v-model.number="editedItem.diskon_pct"
                                          label="Diskon (%)"
                                          :rules="rules.diskon_pct"
                                          @input="calculateValues"
                                         
                                        ></v-text-field>
                                      
                                        <v-text-field
                                          v-model.number="editedItem.diskon_nilai"
                                          label="Diskon (Rp)"
                                          :rules="rules.diskon_nilai"
                                          readonly
                                          
                                        ></v-text-field>
                                  
                                        <v-text-field
                                          v-model.number="editedItem.harga_diskon"
                                          label="Harga Diskon"
                                          :rules="rules.harga_diskon"
                                          readonly
                                        ></v-text-field>
                                        <v-text-field
                                          v-model.number="editedItem.total"
                                          label="Total"
                                          :rules ="rules.total"
                                          readonly
                                        ></v-text-field>
                                     </v-form>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="primary"
                              
                                    :disabled="!valid"
                                    @click="save"
                                  >
                                    Save
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                              <v-card>
                                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-toolbar>
                        </template>
                        <template  v-slot:[`item.actions`]="{ item }">
                          <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                          >
                            mdi-pencil
                          </v-icon>
                          <v-icon
                            small
                            @click="deleteItem(item)"
                          >
                            mdi-delete
                          </v-icon>
                        </template>
                        <template v-slot:no-data>
                        </template>
                      </v-data-table>
                    </v-col>
                </v-row>
                <!-- Sub Total -->
                <v-row>
                  <v-col>

                  </v-col>
                  <v-col cols="1">
                      <div class="justify-center">
                      <span 
                         style="font-size:1rem; color:black; font-weight:bold"
                      >Sub Total</span>
                      </div>
                  </v-col>
                  <v-col cols="3" >
                      <v-text-field
                          style="" 
                          v-model="sub_total"
                          dense
                          outlined
                          readonly
                          hide-details
                          ></v-text-field>
                  </v-col>
                </v-row>  
                 <!-- Diskon -->
                <v-row>
                  <v-col>

                  </v-col>
                  <v-col cols="1">
                      <div class="justify-center">
                      <span 
                        style="font-size:1rem; color:black; font-weight:bold"
                      >Diskon (Input)</span>
                      </div>
                  </v-col>
                  <v-col cols="3" >
                      <v-text-field
                          style="" 
                          v-model="diskon"
                          dense
                          outlined
                          :rules="rules.diskon"
                          
                          hide-details
                          ></v-text-field>
                  </v-col>
                </v-row>

                <!-- Ongkir -->  
                <v-row>
                  <v-col>

                  </v-col>
                  <v-col cols="1">
                      <div class="justify-center">
                      <span 
                      style="font-size:1rem; color:black; font-weight:bold"
                      >Ongkir (Input)</span>
                      </div>
                  </v-col>
                  <v-col cols="3" >
                      <v-text-field
                          style="" 
                          v-model="ongkir"
                          dense
                          outlined
                          :rules="rules.ongkir"
                          
                          hide-details
                          ></v-text-field>
                  </v-col>
                </v-row>  
                <v-row>
                  <v-col>

                  </v-col>
                  <v-col cols="1">
                      <div class="justify-center">
                      <span 
                         style="font-size:1rem; color:black; font-weight:bold"
                      >Total Bayar</span>
                      </div>
                  </v-col>
                  <v-col cols="3" >
                      <v-text-field
                          style="" 
                          v-model="total_bayar"
                          dense
                          outlined
                          readonly
                          hide-details
                          ></v-text-field>
                  </v-col>
                </v-row>  
                <v-row>
                  <v-spacer></v-spacer>
                  <!-- <v-col cols="2">

                  </v-col> -->
                  <v-col cols="2">
                    <v-btn
                      color="primary"
                      class="ukuranButton"
                      @click="saveTransaksi"
                      :disabled="!externalValid"
                      >
                      Simpan
                    </v-btn>                    
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      color="error"
                      class="ukuranButton"
                      @click="handleReset"
                      >
                      Batal
                    </v-btn>  
                  </v-col>
                </v-row>
            </v-form>   

        </div>
    </v-card>
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

  data() {
    return {
      //
      externalValid: false,
      valid: false,
      rules: {
        tgl_transaksi : [
           v => !!v || "Tanggal Transaksi wajib diisi",
        ],
        customer : [
           v => !!v || "Customer wajib diisi",
        ],
        nama_barang : [
           v => !!v || "Nama Barang  wajib diisi",
        ],
        kode_barang: [
          v => !!v || "Kode Barang  wajib diisi",
        ],
        harga_bandrol: [
          v => !!v || "Harga Barang  wajib diisi",
        ],
        qty: [
          v => v !== "0" && v !== 0 || "Qty tidak boleh 0",
          v => (!!v || v === 0) || "Qty wajib diisi",
          v => /^\d+$/.test(v) || "Qty harus berupa angka",
         
        ],
        diskon_pct: [
         v => (!!v || v === 0) || "Diskon (%) wajib diisi",
          v => /^\d+$/.test(v) || "Diskon (%) harus berupa angka",
        ],
        diskon_nilai: [
         v => (!!v || v === 0) || "Diskon (Rp) wajib diisi",
         v => /^\d+$/.test(v) || "Diskon (Rp) harus berupa angka",
        ],
        harga_diskon: [
         v => (!!v || v === 0) || "Harga Diskon wajib diisi",
         v => /^\d+$/.test(v) || "Harga Diskon harus berupa angka",
        ],
        total: [
         v => (!!v || v === 0) || "Total wajib diisi",
         v => /^\d+$/.test(v) || "Total harus berupa angka",
        ],
        ongkir: [
         v => (!!v || v === 0) || "Ongkir wajib diisi",
         v => /^\d+$/.test(v) || "Ongkir harus berupa angka",
        ],
        diskon: [
         v => (!!v || v === 0) || "Diskon wajib diisi",
         v => /^\d+$/.test(v) || "Diskon harus berupa angka",
        ],
     
      },
      sub_total:0,
      diskon:0,
      ongkir:0,
      total_bayar:0,

      generateNoTransaksi:null,
      itemKey: 'name',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Kode Barang',
          align: 'start',

          sortable: false,
          value: 'kode_barang',
        },
        
        { text: 'Nama Barang', value: 'nama' },
        { text: 'Qty', value: 'qty' },
        { text: 'Harga Bandrol', value: 'harga_bandrol' },
        { text: 'Diskon (%)', value: 'diskon_pct' },
        { text: 'Diskon (Rp)', value: 'diskon_nilai' },
        { text: 'Harga Diskon', value: 'harga_diskon' },
        { text: 'Total', value: 'total' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      itemsBarang: [],
      editedIndex: -1,
      editedItem: {
        kode_barang:'',
        nama:'',
        qty:0,
        harga_bandrol:0,
        diskon_pct:0,
        diskon_nilai:0,
        harga_diskon:0,
        total:0,
      },
      defaultItem: {
       kode_barang:'',
        nama:'',
        qty:0,
        harga_bandrol:0,
        diskon_pct:0,
        diskon_nilai:0,
        harga_diskon:0,
        total:0,
      },
    
      // end datatable
      latest_id: '',
      noTransaksi:'', 
      tgl_transaksi:'', 

      //List Customer
      customer:'',
      // rules: [
      //   value => !!value || 'Required.',
      //   // value => (value && value.length >= 3) || 'Min 3 characters',
      // ],

      menu_transaksi : false,
      // Dropdown Search
      formCustomer: [
        { selectedItem: null, items: [], search: '' },
      ],
      formBarang: [
        { selectedItem: null, items: [], search: '' },
      ],


      // Notifikasi Berhasil
      snackbar: {
        show: false,
        message: "",
        color: "",
      },

    }
  },

  computed: {
    total_bayar_with_calculation() {
      // Menghitung total_bayar berdasarkan sub_total, diskon, dan ongkir
      return this.sub_total - this.diskon - this.ongkir;
    },
    isNoTransaksiDisabled() {
      return this.tgl_transaksi === null;
    },
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    filteredCustomer() {
      return (index) => {
        const items = this.formCustomer[index].items;
        const search = this.formCustomer[index].search;
      
        if (search.length === 0) {
          return items;
        } else {
          return items.filter((item) =>
            item.text.toLowerCase().includes(search.toLowerCase())
          );
        }
      };
    },
    filteredBarang() {
      return (index) => {
        const items = this.formBarang[index].items;
        const search = this.formBarang[index].search;
      
        if (search.length === 0) {
          return items;
        } else {
          return items.filter((item) =>
            item.text.toLowerCase().includes(search.toLowerCase())
          );
        }
      };
    },
  },

  watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      tgl_transaksi() {
        this.updateGenerateNoTransaksi();
      },
      total_bayar_with_calculation() {
      // Memperbarui nilai total_bayar dengan nilai terbaru dari total_bayar_with_calculation
      this.total_bayar = this.total_bayar_with_calculation;
       },

      itemsBarang: {
        deep: true,
        handler() {
          // Menghitung sub_total berdasarkan total dari setiap item addBulk
          this.sub_total = this.itemsBarang.reduce((acc, item) => acc + item.total, 0);
          this.total_bayar = this.sub_total - this.diskon - this.ongkir
        }
    }
    },

  mounted () {
    // this.initialize()
    this.getLatestIdTransaksi()

    this.initializeCustomerList()
    this.initializeBarangList()
  },

  methods: {

    calculateDiskonNilai() {
     
      return (this.editedItem.harga_bandrol * this.editedItem.diskon_pct) / 100;
    },
    calculateHargaDiskon() {
        
      return this.editedItem.harga_bandrol - this.editedItem.diskon_nilai;
    },
    calculateTotal() {
         
      return this.editedItem.harga_diskon * this.editedItem.qty;
    },
    calculateValues() {
         
      this.editedItem.diskon_nilai = this.calculateDiskonNilai();
      this.editedItem.harga_diskon = this.calculateHargaDiskon();
      this.editedItem.total = this.calculateTotal();
    },

    updateGenerateNoTransaksi() {
      if (this.tgl_transaksi === null) {
        this.generateNoTransaksi = null;
      }
    },

    handleReset(){
      window.location.reload()
    },
    
    handleGenerateNoTransaksi() {
      const dateString = this.tgl_transaksi.replace(/-/g, '')
      const paddedNumber = String(this.latest_id).padStart(4, '0');
      this.generateNoTransaksi = dateString + '-' + paddedNumber
      console.log(this.generateNoTransaksi)

      if(!this.tgl_transaksi) {
        console.log('kososngg')
      }
    },
    handleGetNama() {
  
       this.getNameTelpCustomer(this.formCustomer[0].selectedItem)
    },
    handleGetBarang() {
      console.log(this.formBarang[0].selectedItem)
       this.getNamaHargaBarang(this.formBarang[0].selectedItem)
    },

    async getNameTelpCustomer(idCustomer) {
       try {
         const response = await axios.get('http://localhost:3000/api/customer/' + idCustomer);
          this.customer = response.data.data
       } catch (error) {
          console.log(error.message.request)
          this.customer = ''
       }
      
    },
    async getNamaHargaBarang(kodeBarang) {
       try {
         const response = await axios.get('http://localhost:3000/api/barangbykode/' + kodeBarang);
         const barang = response.data.data
          this.editedItem.kode_barang = barang.kode
          this.editedItem.nama = barang.nama
          this.editedItem.harga_bandrol = barang.harga
       } catch (error) {
          console.log(error.message.request)
          this.editedItem.kode_barang = ''
          this.editedItem.nama = ''
          this.editedItem.harga_bandrol = 0
       }
      
    },

    async initializeCustomerList () {
        try {
          const response = await axios.get(`http://localhost:3000/api/customer`);
          const customer = response.data.data
        
          this.formCustomer.forEach((item) => {
            item.items = customer.map((cst) => ({ value: cst.id, text: `${cst.kode} - ${cst.nama}` }));
          });
        } catch (error) {
          console.error(error.message);
        }
      },
    async initializeBarangList () {
        try {
          const response = await axios.get(`http://localhost:3000/api/barang`);
          const barang = response.data.data
        
          this.formBarang.forEach((item) => {
            item.items = barang.map((brg) => ({ value: brg.kode, text: `${brg.kode} - ${brg.nama}` }));
          });
        } catch (error) {
          console.error(error.message);
        }
      },

    async getLatestIdTransaksi() {
        try {
            const response = await axios.get('http://localhost:3000/api/saleslatestid')
            
            if(response.data.data === 0) {
               this.latest_id= 1
            }

            else if(response.data.data !== 0) {
              this.latest_id= response.data.data + 1
            }
          
        
        } catch (error) {
            console.log(error.message.request)
        }
    },
        
     onSearchCustomer() {
      if (this.customer.search.length > 0) {
        this.customer.selectedItem = null;
      }
    },
     onSearchBarang() {
      if (this.barang.search.length > 0) {
        this.barang.selectedItem = null;
      }
    },

      editItem (item) {
        this.editedIndex = this.itemsBarang.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.itemsBarang.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.itemsBarang.splice(this.editedIndex, 1)
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
          Object.assign(this.itemsBarang[this.editedIndex], this.editedItem)
          console.log(this.itemsBarang)
         
        } else {
          this.itemsBarang.push(this.editedItem)
          console.log(this.itemsBarang)
          console.log(this.formCustomer[0].selectedItem)
        }
        this.close()
      },

      async saveTransaksi() {

         await axios({
            method:'post',
            url: 'http://localhost:3000/api/sales/',
            data: {
              kode: this.generateNoTransaksi,
              tgl: this.tgl_transaksi,
              cust_id: this.formCustomer[0].selectedItem,
              jumlah_barang: this.itemsBarang.reduce((acc, item) => acc + item.qty, 0),
              subtotal: this.sub_total,
              diskon: this.diskon,
              ongkir: this.ongkir,
              total_bayar: this.total_bayar
            }
          })
          .then(response => {
          
            console.log(response.data)
            // Show success notification
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data Transaksi berhasil disimpan!";
            
    
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
         this.itemsBarang.forEach((item) => {
          item.kode_transaksi = this.generateNoTransaksi
          delete item.nama;
        });
         await axios({
            method:'post',
            url: 'http://localhost:3000/api/salesdetail/',
            data: {
              addBulk: this.itemsBarang
            }
          })
          .then(response => {
          
            console.log(response.data)
            // Show success notification
            this.snackbar.show = true;
            this.snackbar.color = "primary";
            this.snackbar.message = "Data Transaksi berhasil disimpan!";

              setTimeout(() => {
                this.$router.push('/transaksi');
              }, 2000)
    
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
      }
    

  }

</script>

<style scoped>
/* ::v-deep .v-text-field .v-input__control .v-input__slot{
  /* background-color: rgba(145, 187, 203, 0.35); */


.theme--light.v-sheet{
  color: #961c1a;
}
.custom-card {
  width: 97%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
}

.header_bg{
  background-color: #91BBCB;
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

::v-deep .v-select-list .v-list-item {
  font-size: 2rem ;
}

.theme--light.v-icon{
  color:#961c1a;
}

.v-card__subtitle, .v-card__text{
  line-height: 2.5rem;
}

.ukuranButton {
  width: 12em; 
}



</style>
