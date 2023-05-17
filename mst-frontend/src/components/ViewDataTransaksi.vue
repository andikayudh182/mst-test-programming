<template>
  <div >
<!-- Start Breadcrumbs -->
    <v-breadcrumbs style="margin-left: 0.5%;">
      <h4 style="color: #961c1a;">Data Transaksi</h4>
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
        <span>Data Transaksi</span>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <!-- End Breadcrumbs -->

    <!-- Start Datatables -->
    <v-card class="custom-card">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="transaksi"
        sort-by="calories"
        class="elevation-1"
        style="padding-top: 0.5%;"
      >
        <template v-slot:top>
          <v-toolbar
            dense
            flat
          >
            <v-toolbar-title>Data Transaksi</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
           
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

        <template v-slot:no-data>
          No Data
        </template>
      </v-data-table>

      <v-row>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-col>
            <h3>Grand Total Rp {{ grandTotal}}</h3>
        </v-col>
      </v-row>
    </v-card>
    <!-- End Datatables -->

  </div>

</template>

<script>
import axios from 'axios'

  export default {
    
    data: () => ({
      grandTotal:0,
      search:'',
      transaksi: [],
      headers: [
        {
          text: 'No',
          align: 'start',
          value: 'id',
        },
        { text: 'No Transaksi', value: 'kode' },
        { text: 'Tanggal', value: 'tgl_transaksi' },
        { text: 'Nama Customer', value: 'nama' },
        { text: 'Jumlah Barang', value: 'jumlah_barang' },
        { text: 'Sub Total', value: 'subtotal' },
        { text: 'Diskon', value: 'diskon' },
        { text: 'Ongkir', value: 'ongkir' },
        { text: 'Total', value: 'total_bayar' },
       
      ],

      

    }),

    mounted () {
      this.initialize()
    },

  
   
    methods: {
        formatRupiah(value) {
        if (value) {
            const numberFormat = new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            });

            return numberFormat.format(value);
        }
        return "0.00";
    },
     
      async initialize () {
        try {
          const response = await axios.get('http://localhost:3000/api/saleswithcustomer');
          this.transaksi = response.data.data

          this.transaksi.forEach((item) => {
            item.subtotal = this.formatRupiah(item.subtotal);
            item.diskon = this.formatRupiah(item.diskon);
            item.ongkir = this.formatRupiah(item.ongkir);
            item.total_bayar = this.formatRupiah(item.total_bayar);
          });

        this.transaksi.forEach((item) => {
        const totalBayar = parseFloat(item.total_bayar.replace(/\./g, '').replace(',', '.'));
        this.grandTotal += totalBayar;
        });

        const formattedGrandTotal = this.formatRupiah(this.grandTotal);
        this.grandTotal = formattedGrandTotal
          
       
        } catch (error) {
          console.error(error.message);
        }
 
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
