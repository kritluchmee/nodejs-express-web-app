//import 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const port = 3000;
const Blog = require("./models/blog")

//connect to the mongodb database
const dbURI = "mongodb+srv://krit:krit@cluster0.q1pec.mongodb.net/acs-web-app?retryWrites=true&w=majority";
mongoose.connect(dbURI , {useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => console.listen(port))
    .catch((err) => console.log(err));

// static files 

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));


//mongoose and mongo sandbox routes

app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "new blog", 
        snippet: "About my new blog",
        body: "More about my Blog"
    });
    blog.save()
      .then((result) => {
          res.send(result)
      })
      .catch((err) => {
          console.log(err);
      });
})

//set views 

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/admin", (req, res) => {
    res.render("admin");
});

app.use("/", routes);


//Listen to port 

app.listen(port, () => console.info("listening on port", port));