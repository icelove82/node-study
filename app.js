const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

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

// static file access by middleware
app.use(express.static('public'));

// log by middleware
// app.use((req, res, next) => {
//   console.log('--- New Request ---');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

// log by 3-party middleware
app.use(morgan('dev'));

// API
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get('/single-blog', (req, res) => {
  Blog.findById('61459aa39fd41a5fa1fb1844')
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// Routes
app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Mario finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];
  //   res.send('<p>home page</p>');
  //   res.sendFile('./views/index.html', { root: __dirname });
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  //   res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
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
  //   res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});
