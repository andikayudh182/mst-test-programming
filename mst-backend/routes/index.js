var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* Import Controller */
const userController = require('../controllers').user
const barangController = require('../controllers').barang
const customerController = require('../controllers').customer
const salesController = require('../controllers').sales
const salesDetailController = require('../controllers').sales_detail

/* Endpoint User Controller */ 
router.post('/api/user/signup', userController.signUpUser)
router.post('/api/user/login', userController.loginUser)
router.get('/api/user/:id', userController.getUserById)
// router.get('/api/barang/:id', barangController.getBarangById)
// router.get('/api/barangbykode/:id', barangController.getBarangByKode)
// router.post('/api/barang', barangController.addBarang)
// router.put('/api/barang/:id', barangController.updateBarang)
// router.delete('/api/barang/:id', barangController.deleteBarang)

/* Endpoint Barang Controller */ 
router.get('/api/barang', barangController.getAllBarang)
router.get('/api/barang/:id', barangController.getBarangById)
router.get('/api/barangbykode/:id', barangController.getBarangByKode)
router.post('/api/barang', barangController.addBarang)
router.put('/api/barang/:id', barangController.updateBarang)
router.delete('/api/barang/:id', barangController.deleteBarang)

/* Endpoint Customer Controller */ 
router.get('/api/customer', customerController.getAllCustomer)
router.get('/api/customer/:id', customerController.getCustomerById)
router.post('/api/customer', customerController.addCustomer)
router.put('/api/customer/:id', customerController.updateCustomer)
router.delete('/api/customer/:id', customerController.deleteCustomer)

/* Endpoint Sales Controller */ 
router.get('/api/sales', salesController.getAllSales)
router.get('/api/saleswithcustomer', salesController.getSalesWithCustomerName)
router.get('/api/saleslatestid', salesController.getLatestIdSales)
router.get('/api/sales/:id', salesController.getSalesById)
router.post('/api/sales', salesController.addSales)
router.put('/api/sales/:id', salesController.updateSales)
router.delete('/api/sales/:id', salesController.deleteSales)

/* Endpoint Sales Detail Controller */ 
router.get('/api/salesdetail', salesDetailController.getAllSalesDetail)
router.get('/api/salesdetail/:id', salesDetailController.getSalesDetailById)
router.post('/api/salesdetail', salesDetailController.addSalesDetail)
router.put('/api/salesdetail/:id', salesDetailController.updateSalesDetail)
router.delete('/api/salesdetail/:id', salesDetailController.deleteSalesDetail)
module.exports = router;
