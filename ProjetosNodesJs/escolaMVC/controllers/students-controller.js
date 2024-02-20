const Student = require('../models/student-model')

exports.redirect_students = (req, res) => {
    return res.redirect('/students')
}

exports.get_list_students = (req, res) => {
    Student.find({}, (err, element) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Erro ao consultar estudantes")
        }
        res.render('views/pages/students', { items: element })
    })
}

exports.get_add_student = (req, res) => {
    res.render('views/pages/formStudents')
}

exports.post_add_student = (req, res) => {
    let generic_student = new Student();
    generic_student.name = req.body.name
    generic_student.class = req.body.class
    generic_student.grades.g1 = req.body.g1
    generic_student.grades.g2 = req.body.g2
    generic_student.grades.g3 = req.body.g3

    average = ((generic_student.grades.g1 + generic_student.grades.g2 + generic_student.grades.g3) / 3)
    if (average >= 6) generic_student.status = "APPROVED"
    else generic_student.status = "DISAPPROVED"

    generic_student.save((err) => {
        if (err) return res.status(500).send('Erro ao cadastrar o aluno');
        return res.redirect('/students');
    })
}

exports.get_delete_student = (req, res) => {
    id = req.params.id
    Student.deleteOne({ _id: id }, (err, result) => {
        if (err) return res.status(500).send("Erro ao consultar students")
    })
    res.redirect('/students')
}

exports.get_edit_student = (req, res) => {
    Student.findById(req.params.id, (err, element) => {
        if (err)
            return res.status(500).send("Erro ao consultar students")
        res.render('views/pages/formEditStudents', { item: element })
    })
}

exports.post_edit_student = (req, res) => {
    let id = req.body.id
    Student.findById(id, (err, generic_student) => {
        if (err) return res.status(500).send("Erro ao consultar students")
        generic_student.name = req.body.name
        generic_student.class = req.body.class
        generic_student.grades.g1 = req.body.g1
        generic_student.grades.g2 = req.body.g2
        generic_student.grades.g3 = req.body.g3

        average = ((generic_student.grades.g1 + generic_student.grades.g2 + generic_student.grades.g3) / 3)
        if (average >= 6) generic_student.status = "APPROVED"
        else generic_student.status = "DISAPPROVED"

        generic_student.save((err) => {
            if (err) return res.status(500).send('Erro ao cadastrar o aluno');
            return res.redirect('/students');
        })

    })
}

