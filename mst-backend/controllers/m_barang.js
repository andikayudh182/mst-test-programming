const Barang = require('../models').m_barang

module.exports = {
  async getAllBarang(req,res) {
    try {
        const barang = await Barang.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            order:[
                ['id','ASC']
            ]
        })

        if (barang.length==0) {
            return res.status(400).send({
                message:'Data barang tidak ada'
            })
        }

        return res.status(200).send({
            message: 'Get all barang sukses',
            data: barang
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
  
  async addBarang(req, res) {
    const data = req.body
    const options = {
        fields: ['kode','nama','harga'],
        returning:true
    }
    try {
        const barang = await Barang.create(data,options)

        return res.status(200).send({
            message:'add barang sukses',
            data:barang
        })
        
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async getBarangById(req, res){
    const { id } = req.params

    try {
        const barang = await Barang.findByPk(id)

        if(!barang) {
            return res.status(404).send({
                message:'data barang tidak ditemukan'
            })
        }

        return res.status(200).send({
            message: 'get barang by id berhasil',
            data: barang
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async getBarangByKode(req, res) {
    const { id } = req.params

    try {
        const barang = await Barang.findOne({
            where: {
                kode: id
            }
        })

        if (!barang) {
            return res.status(404).send({
                message: 'data barang tidak ditemukan'
            })
        }

        return res.status(200).send({
            message:'get data barang sukses',
            data: barang
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async updateBarang(req, res) {
    const { id } = req.params
    const data = req.body

    try {
        const barang = await Barang.findByPk(id)

        if (!barang) {
            return res.status(404).send({
                messsage:'data barang tidak ditemukan'
            })
        }

        const updateBarang = await Barang.update(data,{
            where: {
                id : id
            }
        })
        
        if (updateBarang) {
            return res.status(200).send({
                message:'update barang sukses',
                data: updateBarang
            })
        }

    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
  async deleteBarang(req, res){
    const { id } = req.params

    try {
        const barang = await Barang.findByPk(id)

        if(!barang) {
            return res.status(404).send({
                message:'data barang tidak ditemukan'
            })
        }

        const deleteBarang = await Barang.destroy({
            where: {
                id: id
            }
        })

        return res.status(200).send({
            message: 'delete barang berhasil',
            data: deleteBarang
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
}