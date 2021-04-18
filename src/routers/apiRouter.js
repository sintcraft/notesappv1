const express = require('express')
const router = express.Router()
const dataBase = require('../tools/mysql')

router.get('/', function (req, res) {
    res.json({
        "title": "Notes api",
        "description": "Api for a notes app",
        "date": "2021-04-15",
        "author": "sintcraft",
        "version": "1.0",
    })
})

router.get('/:id', async function (req, res) {
    if(!parseInt(req.params.id) >0){
        res.redirect('/404')
        return
    }
    dataBase.getQuerie('SELECT * FROM notes WHERE id=?', [parseInt(req.params.id)]).then(row => {
        if (!row[0]) {
            res.json({
                error: "undefined"
            })
            return
        }
        row = row[0]
        res.json({
            id: row.id,
            status: row.status,
            date: row.date,
            title: row.title,
            description: row.description
        })
    })
})



module.exports = router