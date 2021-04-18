const { BaseClient } = require("discord.js");
const express = require("express");
const backendRouter = express.Router();
const dataBase = require("../tools/mysql");
backendRouter.post("/new-note", function (req, res) {
  let title = req.body.title;
  let date = req.body.date;
  let description = req.body.description;
  if (!title || !date || !description) {
    res.redirect("/");
    return;
  }
  dataBase
    .runQuerie(
      "INSERT INTO notes(status, date, title, description) VALUES (?, ?, ?,?)",
      [1, date, title, description]
    )
    .then((xd) => {
      res.redirect("/");
    });
});
backendRouter.post("/delete-note/:where/:id", function (req, res) {
  var passwordAdmin = process.env.passwordAdmin || "admin";
  if (req.body.password != passwordAdmin) {
    res.redirect("/");
    return;
  }
  dataBase
    .runQuerie("DELETE FROM notes WHERE id=?", [req.params.id])
    .then((xd) => {
      if(req.params.where=="archived"){
        res.redirect('/archived')
      }else{
        res.redirect('/')
      }
    });
});
backendRouter.post("/edit-note/:id", function (req, res) {
  if (!req.body.title || !req.body.date || !req.body.description) {
    res.redirect("/");
    return;
  }
  dataBase
    .runQuerie("UPDATE notes SET title=? , date=? , description=? WHERE id=?", [
      req.body.title,
      req.body.date,
      req.body.description,
      req.params.id,
    ])
    .then((xd) => {
      res.redirect("/");
    });
});
backendRouter.post("/ready/:id", function (req, res) {
  dataBase
    .runQuerie("UPDATE notes SET status=? WHERE id=?", [2, req.params.id])
    .then(
      res.json({
        error: null,
        action: true,
      })
    );
});
backendRouter.post('/relist/:id', function(req, res) {
  dataBase
  .runQuerie("UPDATE notes SET status=? WHERE id=?", [1, req.params.id])
  .then(
    res.json({
      error: null,
      action: true,
    })
  );
})

module.exports = backendRouter;
