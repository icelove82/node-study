const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const _ = require('lodash');
const { render } = require('ejs');

// express app
const app = express();

// MongoDB uri
const dbUri =
  'mongodb+srv://user:user123@cluster0.mwiqu.mongodb.net/study?retryWrites=true&w=majority';

mongoose
  .connect(dbUri)
  .then((res) => console.log('Connected to db'))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// listen for request
app.listen(3000);

// use middleware
app.use(express.static('public')); // static file access
app.use(express.urlencoded({ extended: true })); // post req parameter
app.use(morgan('dev')); // log by 3-party middleware

// log by middleware
// app.use((req, res, next) => {
//   console.log('--- New Request ---');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

// Routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about', { title: 'About' });
});

// 404 page by middleware
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});
