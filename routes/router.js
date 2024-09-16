const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')


router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register')
})

//router para los métodos del controller
router.post('/registerTask', authController.registerTask)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/getAllTareas', authController.getAllTareas)
router.get('/', authController.isAuthenticated, authController.getAllTareas);
router.post('/deleteTask/:id', authController.deleteTask);
router.post('/editTask', authController.editTask);
router.get('/search', authController.isAuthenticated, authController.searchTasks);


module.exports = router