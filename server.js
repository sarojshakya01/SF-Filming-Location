const express = require("express");
const mongo = require("mongodb");
const cors = require("cors");
const app = express();

const router = express.Router();

// const uri = "mongodb+srv://sarojsh:sarojsh@cluster0-jb3wc.gcp.mongodb.net/";

const uri = "mongodb://127.0.0.1:27017/";

const mongocli = mongo.MongoClient;

app.use(express.static("public"));
app.use("/api", router);
app.use(cors());

mongocli.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) throw err;
    console.log("Database Connected Successfully at " + uri);
  }
);

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
        .toArray(function (err, result) {
          if (err) throw err;
          response.send(result);
          db.close;
        });
    }
  );
});

const port = 3001;

app.listen(port, function () {
  console.log("Server Running at localhost:" + port);
});
