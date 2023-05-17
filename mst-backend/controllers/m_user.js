const User = require('../models').m_user
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret ='secret'

module.exports = {
    async signUpUser(req, res) {
        const { username, password, nama } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
    
        const options = {
          fields: ['username', 'password', 'nama'],
          returning:true
        }
        try {
          const user =await User.create({
            username: username,
            password: hashPassword,
            nama: nama,
          }, options)

          if (user) {
            return res.status(200).send({
              message: 'signUp new user success',
              data: user
            })
          }
        } catch (error) {
          return res.status(400).send({
            message: error.message
          })
        }
      },

      async loginUser(req, res) {
        const { username, password } = req.body
        
        try {
          const user = await User.findOne({
            where:{
              username
            },
          })
    
          if (!user) {
            return res.status(404).send({
              message:'Invalid username or password'
            })
          }
    
          const isPasswordValid = await bcrypt.compare(password, user.password)
    
          if (!isPasswordValid) {
            return res.status(400).send({
              message: 'Invalid Password'
            })
          }
    
          const token = jwt.sign({ user }, secret)
    
          return res.status(200).send({
            message:'Login berhasil',
            token: token
          })
        } catch (error) {
          return res.status(400).send({
            message: error.message
          })
        }
      },

      async getUserById(req, res) {
        const { id } = req.params
        try{
          const user = await User.findOne({
            where:{
             id: id
            }
          })
          if (user.length === 0){
            return res.status(404).send({
              message:'data tidak ditemukan',
            })
            
          }
          return res.status(200).send({
            message:'success',
            data: user
          })
        }
          catch(error){
            return res.status(400).send({
              message:error.message
            })
        }
    }
}