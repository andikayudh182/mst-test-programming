const Sales = require('../models').t_sales
const { sequelize } = require('../models'); // Import instance Sequelize
const { QueryTypes } = require('sequelize');

module.exports = {
  async getAllSales(req,res) {
    try {
        const sales = await Sales.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            order:[
                ['id','ASC']
            ]
        })

        if (sales.length==0) {
            return res.status(400).send({
                message:'Data Sales tidak ada'
            })
        }

        return res.status(200).send({
            message: 'Get all Sales sukses',
            data: sales
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async getSalesWithCustomerName(req, res) {
    try {
        const query = ` SELECT c."nama", t."id", t."kode", TO_CHAR(t."tgl", 'DD-Mon-YYYY') as tgl_transaksi, t."jumlah_barang", t."subtotal", t."diskon", t."ongkir", t."total_bayar" 
        FROM "t_sales" as t
        JOIN "m_customer" as c ON t."cust_id" = c."id" ORDER BY t."id" ASC`

        const results = await sequelize.query(query, { type: QueryTypes.SELECT });

        if (!results) {
            return res.status(404).send({
                message:'data tidak ada'
            })
        }

        return res.status(200).send({
            message: 'sukses',
            data : results
        })
    
  
    } catch (error) {
        return res.status(400).send({
            message:error.message
        })
    }
  },

  async getLatestIdSales(req, res) {
    try {
        const sales = await Sales.findOne({
            order: [['id', 'DESC']]
        })

        if (sales) {
            return res.status(200).send({
                message: 'Get id sales terakhir berhasil',
                data: sales.id
            })
        }

        return res.status(200).send({
            message:'Data sales masih kosong',
            data: 0
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
  
  async addSales(req, res) {
    const data = req.body
    const options = {
        fields: ['kode','tgl','cust_id','jumlah_barang','subtotal','diskon','ongkir','total_bayar'],
        returning:true
    }
    try {
        const sales = await Sales.create(data,options)

        return res.status(200).send({
            message:'add sales sukses',
            data:sales
        })
        
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async getSalesById(req, res){
    const { id } = req.params

    try {
        const sales = await Sales.findByPk(id)

        if(!sales) {
            return res.status(404).send({
                message:'data Sales tidak ditemukan'
            })
        }

        return res.status(200).send({
            message: 'get Sales by id berhasil',
            data: sales
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },


  async updateSales(req, res) {
    const { id } = req.params
    const data = req.body

    try {
        const sales = await Sales.findByPk(id)

        if (!sales) {
            return res.status(404).send({
                messsage:'data Sales tidak ditemukan'
            })
        }

        const updateSales = await Sales.update(data,{
            where: {
                id : id
            },
            returning:true
        })
        
        if (updateSales) {
            return res.status(200).send({
                message:'update Sales sukses',
                data: updateSales
            })
        }

    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
  async deleteSales(req, res){
    const { id } = req.params

    try {
        const sales = await Sales.findByPk(id)

        if(!sales) {
            return res.status(404).send({
                message:'data Sales tidak ditemukan'
            })
        }

        const deleteSales = await Sales.destroy({
            where: {
                id: id
            }
        })

        return res.status(200).send({
            message: 'delete Sales berhasil',
            data: deleteSales
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
}