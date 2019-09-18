const bodyParser = require('body-parser'),
  methodOverrite = require('method-override'),
  mongoose = require('mongoose'),
  expressSanitizer = require('express-sanitizer'),
  express = require('express'),
  app = express();

require('dotenv').config();

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/restful_blog_app', {
  useNewUrlParser: true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverrite('_method'));

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

console.log(process.env.PORT);

//Routes
//Redirect to home
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

//Home
app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log('No blog found!');
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

//NEW BLOG
app.get('/blogs/new', (req, res) => {
  res.render('new');
});

//CREATE BLOG
app.post('/blogs', (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render('new');
    } else {
      res.redirect('/blogs');
    }
  });
});

//SHOW BLOG
app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', { blog: foundBlog });
    }
  });
});

//EDIT BLOG
app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', { blog: foundBlog });
    }
  });
});

//UPDATE BLOG
app.put('/blogs/:id', (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect('blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

//DELETE ROUTE
app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running!');
});
