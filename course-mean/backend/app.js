const express = require('express');
const bodyparser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

mongoose.connect()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title : req.body.title,
      content : req.body.content
    });
    console.log(post);
    res.status(201)
    .json({
        message : "Post received successully!"
    });
});

app.get("/api/posts", (req, res, next) => {
    const posts = [
        {
            id : "f2a4567lk",
            title : "First server side post",
            content : "This is pretty cool!"
        },
        {
            id : "f3a457gjfs",
            title : "Second server side post",
            content : "This is even cooler"
        }

    ];
    res
    .status(200)
    .json({
        message : "Post fetched successfully.",
        posts : posts
    });
});


module.exports = app;
