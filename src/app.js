const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const controllers = require("./controllers/index");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main"
  })
);

app.get("/", (req, response) => {
  // someFunction();
  controllers.getAllData((err, res) => {
    if (err) {
      console.log("err");
      console.log(err);
    } else {
      response.render("home", {
        techs: res.rows
      });
    }
  });
});

app.get("/technology/:name", ({ params: { name } }, response) => {
  controllers.getTech(name, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.render("technology", {
        tech: res
      });
    }
  });
});

app.get("/add-tech", (req, res) => {
  res.render("add-tech", {});
});

app.post("/add-tech", (req, res) => {

  controllers.postTech(
    req.body.name,
    req.body.description,
    req.body.language,
    req.body.author,
    req.body.rating,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    }
  );
});

app.use((err, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, "..", "public", "500.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "..", "public", "404.html"));
});


module.exports = app;
