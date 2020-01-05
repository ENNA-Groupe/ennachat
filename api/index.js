var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");


var user = { id: 1, nom: "tagba", prenom: "jo", telephone: "91091752", password: "azertyui" };
var app = express();
var pseudo;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat_db"
});

function dateFormat(x) {
    let year = x.getFullYear();
    let month = x.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let day = x.getDate();
    if (day < 10) day = "0" + day;
    return year + "-" + month + "-" + day;
}

function hourFormat(date) {
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    return hour + ":" + min + ":" + sec;
}
//dateFormat(date);
//hourFormat(date);


con.connect(function (err) {
    if (err) throw (err);
    // INSERTION

    function add(a) {
        var sql = "INSERT INTO users (nom, prenoms, telephone, password) VALUES (?)";
        var res = [[a.nom, a.prenom, a.telephone, a.password]];
        con.query(sql, res, function (err) {
            if (err) throw (err);
        })
    }

    // EDIT

    function editUser(user) {
        var sql = "UPDATE users SET nom = ?, prenoms = ?, telephone = ?, password = ? WHERE id = ?";
        var res = [[user.nom], [user.prenom], [user.telephone], [user.password], [user.id]];
        con.query(sql, res, function (err) {
            if (err) throw (err);
        })
    }

    // DELETE

    function del(table,obj) {
        var sql = "UPDATE ? SET deleted_at = ? WHERE id = ?";
        var date = new Date();
        var now = dateFormat(date) + " " + hourFormat(date);
        var res = [[table],[now], [obj.id]];
        con.query(sql, res, function (err) {
            if (err) throw (err);
        })
    }

    // RESTAURER

    function restore(){
        var 
    }

    // RECUPERER TOUT

    function getAll(table) {
        var sql = "SELECT * FROM ?"
        var res = [table];
        con.query(sql, res, function (err) {
            if (err) throw (err);
        })

    }

    // RECUPERER UN

    function getOne(table, id) {
        var sql = "SELECT * FROM ? WERE id = ?"
        var res = [table, id];
        con.query(sql, res, function (err) {
            if (err) throw (err);
        })
        
    }

    // EXECUTION

    edit({ id: 1, nom: "tagba", prenom: "joseph", telephone: "91091752", password: "azertyui" });


})

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.redirect('/login');
});
app.route("/login")
    .get(function (req, res) {
        res.render("login.ejs");
    })
    .post(function (req, res) {
        pseudo = req.body.pseudo;
        var password = req.body.password;
        console.log("pseudo: " + pseudo);
        console.log("password: " + password);
        if (pseudo != "jo") res.send("incorrect");
        else res.redirect('/home');
    });

app.route("/home")
    .get(function (req, res) {
        res.render("home.ejs", { name: pseudo });
    })
    .post(function (req, res) {

    })
app.route("/users").get(function (req, res) {
    res.render("user.ejs")
}).post(function (req, res) {

})
app.listen(8080);