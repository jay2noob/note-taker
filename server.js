const express = require("express");
const fs = require("fs");
const path = require("path");

const data = require('./db/db.json')

var app = express();
var PORT = process.env.PORT || 3000;



//Made CSS render in Localhost the way it was intended

app.use(express.static('public'))



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function(_, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });


app.get("/api/notes", function(_, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
  });

  app.get("/*", function(_, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });


  app.post("/api/notes", function(req, res) {
      let newNote = {'title': req.body.title, 'text': req.body.text} 
      data.push(newNote);

      updateNotes()

      res.json(newNote);
  });


const updateNotes = () => {
      data.forEach(addIds(1))

      fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 4))

      function addIds(id) {
          return function incr(e) {
              if ('title' in e) {
               e.id = id++
          }

          Object.keys(e).forEach(function(n){

          Array.isArray(e[n]) && e[n].forEach(incr)
        })
    }
  }
}



// Delete



app.delete('/api/notes/:id', (req, res) => {
    let noteId = req.params.id;

    let note = data.filter(note => {
      return note.id == noteId;
    })[0];

    const index = data.indexOf(note);

    data.splice(index, 1);



    fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 4))

    res.json(data)

  });



app.listen(PORT, function() {

    console.log("App listening on PORT " + PORT);

  });

