const Customer = require('../models').m_customer

module.exports = {
  async getAllCustomer(req,res) {
    try {
        const customer = await Customer.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            order:[
                ['id','ASC']
            ]
        })

        if (customer.length==0) {
            return res.status(400).send({
                message:'Data customer tidak ada'
            })
        }

        return res.status(200).send({
            message: 'Get all customer sukses',
            data: customer
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
  
  async addCustomer(req, res) {
    const data = req.body
    const options = {
        fields: ['kode','nama','telp'],
        returning:true
    }
    try {
        const customer = await Customer.create(data,options)

        return res.status(200).send({
            message:'add customer sukses',
            data:customer
        })
        
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },

  async getCustomerById(req, res){
    const { id } = req.params

    try {
        const customer = await Customer.findByPk(id)

        if(!customer) {
            return res.status(404).send({
                message:'data customer tidak ditemukan'
            })
        }

        return res.status(200).send({
            message: 'get customer by id berhasil',
            data: customer
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },


  async updateCustomer(req, res) {
    const { id } = req.params
    const data = req.body

    try {
        const customer = await Customer.findByPk(id)

        if (!customer) {
            return res.status(404).send({
                messsage:'data customer tidak ditemukan'
            })
        }

        const updateCustomer = await Customer.update(data,{
            where: {
                id : id
            }
        })
        
        if (updateCustomer) {
            return res.status(200).send({
                message:'update customer sukses',
                data: updateCustomer
            })
        }

    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
  async deleteCustomer(req, res){
    const { id } = req.params

    try {
        const customer = await Customer.findByPk(id)

        if(!customer) {
            return res.status(404).send({
                message:'data customer tidak ditemukan'
            })
        }

        const deleteCustomer = await Customer.destroy({
            where: {
                id: id
            }
        })

        return res.status(200).send({
            message: 'delete customer berhasil',
            data: deleteCustomer
        })
    } catch (error) {
        return res.status(400).send({
            message: error.message
        })
    }
  },
}