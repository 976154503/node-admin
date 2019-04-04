var fs = require('fs')
var express = require('express')
var Student = require('./student')
var router = express.Router()

router.get('/', (req, res) => {
    // fs.readFile('./dataBase.json', 'utf8', (err, data) => {
    //     if(err){
    //         return '数据有错误'
    //     }
    //     res.render('index.html', {
    //         student: JSON.parse(data).student
    //     })
    // })
    Student.find(function(err, student){
        if(err){
            return '数据有错误'
        }
        res.render('index.html', {
            student: student
        })
    })
})
router.get('/addStudent', (req, res) => {
    res.render('addStudent.html')
})
router.post('/addStudent', (req, res) => {
    Student.save(req.body, function(err){
        if(err){
            return '数据有错误'
        }
        res.redirect('/')
    })
})
router.get('/edit', (req, res) => {
    Student.findById(req.query.id, function(err, student){
        if(err){
            return '数据有错误'
        }
        res.render('edit.html', {
            student: student
        })
    })
})
router.post('/edit', (req, res) => {
    Student.updateById(req.body, function(err){
        if(err){
            return '数据有错误'
        }
        res.redirect('/')
    })
})
router.get('/delete', (req, res) => {
    //res.render('addStudent.html')
})
module.exports = router
