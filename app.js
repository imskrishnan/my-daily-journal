//jshint esversion:6
const _ = require('lodash');

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const posts = [];
const homeStartingContent = "Welcome to my Daily Journal! This is website is simply everything me!"
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render("home", {
    data: posts,
    title: "Home",
    homePara: homeStartingContent});
});

app.get('/post/:section', (req, res) => {
  const postItem = req.params.section;
  console.log(postItem);
  posts.forEach((e) => {
    if (_.toLower(_.lowerCase(postItem)) === _.lowerCase(e.title)) {
      console.log("postItem : " + _.toLower(_.lowerCase(postItem)));
      console.log("postTitle : " + _.lowerCase(e.title));
      res.render('post', {
        composeTitle: e.title,
        composeBody: e.content
      });
    }
  })
});

app.get('/about', (req, res) => {
  res.render('about', {about_content: aboutContent});
});

app.get('/contact', (req, res) => {
  res.render('contact', {contact_content: contactContent});
});

app.get('/compose', (req,res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => { 
  const post = {
    title: req.body.title,
    content: req.body.composeBody
  }
  posts.push(post);
  res.redirect('/');
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
