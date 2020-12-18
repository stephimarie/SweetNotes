const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const uniqid = require("uniqid");
const fs = require("fs");


const app = express();
const PORT = process.env.Port || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", function (req, res) {
    
    var newNote= req.body;

    var newId = uniqid();

    newNote.id=newId;

    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let dbFile = JSON.parse(data);
        dbFile.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(dbFile), "utf8", err => {
            if (err) throw err;
            console.log("The data was saved to file!");
        });
    });

    res.redirect("/notes");

});
