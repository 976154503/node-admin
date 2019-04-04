//数据操作文件模块
var fs = require('fs')
var dbPath = './dataBase.json'

/**
 * 获取所有学生列表
 */
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
            return callback(err)
        }
        return callback(null,JSON.parse(data).student)
    })
}
/**
 * 根据id获取学生列表
 * @param { string }    id       学生id
 * @param { Function }  callback 回调函数
 */
exports.findById = function(id, callback){
    fs.readFile(dbPath, 'utf8', function(err, data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).student;
        var stu = students.find(function(item){
            return item.id === id
        })
        callback(null, stu)
    })
}
/**
 * 新增保存学生
 */
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
            return callback(err)
        }
        var students = JSON.parse(data).student;

        student.id = parseInt(students[students.length - 1].id) + 1

        students.push(student)
        var fileData = JSON.stringify({
            student: students
        })
        fs.writeFile(dbPath, fileData, (err) => {
            if(err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
/**
 * 更新学生列表
 */
exports.updateById = function(student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
            return callback(err)
        }
        var students = JSON.parse(data).student;
        var stu = students.find(function(item) {
            return item.id === student.id
        })

        for(var key in student) {
            stu[key] = student[key]
        }

        var fileData = JSON.stringify({
            student: students
        })

        fs.writeFile(dbPath, fileData, (err) => {
            if(err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
/**
 * 删除学生数据
 */
exports.delete = function() {
    
}