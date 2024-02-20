//página com  o caminho das rotas
const express = require('express')
const studentController = require('../controllers/student-controller')
const router = express.Router()

router.get('/', studentController.redirect_students )
router.get('/students', studentController.get_list_students )
router.post('/students/delete/:id', studentController.get_delete_student)
router.get('/students/add', studentController.get_add_student)
router.post('/students/add', studentController.post_add_student)
router.post('/students/edit/:id', studentController.get_edit_student)
router.post('/students/edit', studentController.post_edit_student)

module.exports = router
