const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const _ = require('lodash');

// express app
const app = express();

// MongoDB uri
const dbUri =
  'mongodb+srv://user:user123@cluster0.mwiqu.mongodb.net/study?retryWrites=true&w=majority';

mongoose
  .connect(dbUri)
  .then((res) => {
    // listen for request
    app.listen(3000);
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set('view engine', 'ejs');

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

// Routes hub
app.use('/blogs', blogRoutes);

// 404 page by middleware
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});
