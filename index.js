const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const app = express();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const port = 8080;

app.listen(port, () => {
  console.log("listening to port 8080");
});

let posts = [
  {
    id: uuidv4(),
    username: "Jashanpreet Singh",
    content: "Consitency is key to success",
  },
  {
    id: uuidv4(),
    username: "Ram Sharma",
    content: "I got rejected in interview 😢",
  },
  {
    id: uuidv4(),
    username: "Priya Sharma",
    content: "Just baked a delicious chocolate cake! 🍰 #baking #foodie",
  },
  {
    id: uuidv4(),
    username: "Amit Kumar",
    content: "Exploring the beautiful mountains of Himachal. What a view! ⛰️",
  },
  {
    id: uuidv4(),
    username: "Sunita Devi",
    content:
      "Finished reading a great book today. Any recommendations for the next one?",
  },
  {
    id: uuidv4(),
    username: "Rohan Verma",
    content:
      "Just started learning a new programming language. It's challenging but fun! #100DaysOfCode",
  },
  {
    id: uuidv4(),
    username: "Anjali Mehta",
    content: "Enjoying the beautiful monsoon weather in Punjab today! 🌧️☕",
  },
  {
    id: uuidv4(),
    username: "Vikram Singh",
    content:
      "Just hit a new personal best at the gym! Feeling motivated. 💪 #fitness",
  },
  {
    id: uuidv4(),
    username: "Sneha Reddy",
    content:
      "Who knew gardening could be so relaxing? My little balcony garden is thriving.",
  },
  {
    id: uuidv4(),
    username: "Rohan Kapoor",
    content:
      "Finally watched that new sci-fi movie everyone's talking about. It was incredible! 🚀 #movienight",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  posts.push({ id: uuidv4(), username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id === id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let newContent = req.body.content;
  let post = posts.find((post) => id === post.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id === id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/posts");
});
