const SalesDetail = require('../models').t_sales_det

module.exports = {
  async getAllSalesDetail(req,res) {
    try {
        const salesDetail = await SalesDetail.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            order:[
                ['id','ASC']
            ]
        })

        if (salesDetail.length==0) {
            return res.status(400).send({
                message:'Data Sales_Detail tidak ada'
            })
        }

        return res.status(200).send({
            message: 'Get all Sales_Detail sukses',
            data: salesDetail
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
  
  async addSalesDetail(req, res) {
    const data = req.body.addBulk
    const options = {
        fields: ['kode_transaksi','kode_barang','harga_bandrol','qty','diskon_pct','diskon_nilai','harga_diskon','total'],
        returning:true
    }
    try {
        const salesDetail = await SalesDetail.bulkCreate(data,options)

        return res.status(200).send({
            message:'add Sales_Detail sukses',
            data:salesDetail
        })
        
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

 

  async getSalesDetailById(req, res){
    const { id } = req.params

    try {
        const salesDetail = await SalesDetail.findByPk(id)

        if(!salesDetail) {
            return res.status(404).send({
                message:'data Sales_Detail tidak ditemukan'
            })
        }

        return res.status(200).send({
            message: 'get Sales_Detail by id berhasil',
            data: salesDetail
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },


  async updateSalesDetail(req, res) {
    const { id } = req.params
    const data = req.body

    try {
        const salesDetail = await SalesDetail.findByPk(id)

        if (!salesDetail) {
            return res.status(404).send({
                messsage:'data Sales_Detail tidak ditemukan'
            })
        }

        const updateSalesDetail = await SalesDetail.update(data,{
            where: {
                id : id
            },
            returning:true
        })
        
        if (updateSalesDetail) {
            return res.status(200).send({
                message:'update Sales_Detail sukses',
                data: updateSalesDetail
            })
        }

    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
  async deleteSalesDetail(req, res){
    const { id } = req.params

    try {
        const salesDetail = await SalesDetail.findByPk(id)

        if(!salesDetail) {
            return res.status(404).send({
                message:'data Sales_Detail tidak ditemukan'
            })
        }

        const deleteSalesDetail = await SalesDetail.destroy({
            where: {
                id: id
            }
        })

        return res.status(200).send({
            message: 'delete Sales_Detail berhasil',
            data: deleteSalesDetail
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
}