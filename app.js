const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

//connect to mongoDB
const dbURI =
  'mongodb+srv://node-ninja:secureANDsafe@node-ninja.xag4d4t.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log('connected to DB');
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// middleware & static files (css files, images, etc.)
app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log(req.hostname);
  console.log(req.path);
  console.log(req.method);
  next();
});

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// find()
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
