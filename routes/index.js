var express = require('express');
var router = express.Router();
var actions = require('./../models');

/* GET home page. */
router.get('/',  async function(req, res, next) {
  var data = await actions.getPosts();
  res.render('index',{data});
});

router.get('/posts/:id', async function(req, res, next) {
    var data = await actions.getPost(req.params.id);
    res.render('post', {data});
  });

router.get('/index', async function(req, res, next) {
  var data = await actions.getPosts();
  console.log(data);
  res.render('index',{data});
});

router.get('/addPost', function(req, res, next) {
  res.render('addBlog');
});

router.get('/allposts',  async function(req, res, next) {
  var data = await actions.getAllPosts();
  res.render('allposts',{data});
});

router.post('/submit', async function(req, res, next) {
  var id = await actions.addToDb(req.body.title,req.body.subtitle,req.body.postBody,req.body.imageLink);
  res.redirect(`/posts/${id}`);
});

module.exports = router;
