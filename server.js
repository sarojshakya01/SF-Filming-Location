const express = require("express");
const mongo = require("mongodb");
var path = require("path");

const app = express();

const router = express.Router();

const uri = "mongodb://127.0.0.1:27017/";

const mongocli = mongo.MongoClient;

app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "src")));
app.use("/api", router);

app.get("/", function (request, response) {
  response.sendfile("./public/index.html");
});

app.get("/movies", function (request, response) {
  const title = request.query.title;
  let query = {};
  if (title !== undefined && title.length > 0) {
    query = { title: title };
  }
  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      var dbobj = db.db("SFData");
      dbobj
        .collection("sfmoviesdetail")
        .find(query)
        .project({ _id: 0 })
        // .limit(1)
        .toArray(function (err, result) {
          if (err) throw err;
          response.send(result);
          db.close;
        });
    }
  );
});

app.get("/movies", function (request, response) {
  const title = request.query.title;
  let query = {};
  if (title !== undefined && title.length > 0) {
    query = { title: title };
  }
  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      var dbobj = db.db("SFData");
      dbobj
        .collection("sfmoviesdetail")
        .find(query)
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          response.send(result);
          db.close;
        });
    }
  );
});

module.exports = app;
