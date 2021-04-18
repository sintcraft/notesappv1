const express = require('express')
const viewsRouter = express.Router()
const dataBase = require('../tools/mysql')

viewsRouter.get("/", async function (req, res) {
    let a = await dataBase.getQuerie('SELECT * FROM notes', [])
    let data = []
    for (let row of a) {
        let rawDate = new Date().toISOString(row.date).replace('T', '-').split('-')
        let convertDate = `${rawDate[2]}/${rawDate[1]}/${rawDate[0]}`
        if (row.status == 1) {
            data.push({
                id: row.id,
                date: convertDate,
                title: row.title,
                description: row.description
            })
        }
    }
    res.render("index", {
        data
    })
})








module.exports = viewsRouter