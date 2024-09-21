const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')


router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register')
})

// Rutas protegidas que requieren autenticación
router.post('/registerTask', authController.isAuthenticated, authController.registerTask);
router.get('/getAllTareas', authController.isAuthenticated, authController.getAllTareas);
router.get('/', authController.isAuthenticated, authController.getAllTareas);
router.post('/deleteTask/:id', authController.isAuthenticated, authController.deleteTask);
router.post('/editTask', authController.isAuthenticated, authController.editTask);
router.get('/search', authController.isAuthenticated, authController.searchTasks);

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);



module.exports = router