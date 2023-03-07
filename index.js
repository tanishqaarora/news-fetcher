require('dotenv').config();

import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 3000;
import mongoose from 'mongoose';
// import Article from './models/article';


const uri = "mongodb+srv://admin:123@cluster0.0divcvo.mongodb.net/NewsData?retryWrites=true&w=majority";

const db = mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(() => console.log("database connected successfully"))
.catch(err => console.log("Error is: ", err))


const apiKey = process.env.API_KEY;
const url = `${process.env.NEWS_API_URL}${apiKey}`;

const articleSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
});

const Article = mongoose.model('Article', articleSchema);

app.get('/getNews', (req, res) => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
        let results = data.articles;
        const articles = results.map(article => ({
            title: article.title,
            url: article.url,
            description: article.description,
          }));

         // Save each article to the database
         articles.forEach(articleData => {
          const article = new Article(articleData);
          article.save()
            .then(() => console.log('Article saved to database'))
            .catch(error => console.error('Error saving article to database:', error));
          });

          res.json(articles);
            
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      res.sendStatus(500);
    });
});

app.get('/getNewsWithFilter', (req, res) => {
  const queryString = req.url.split('?')[1];
    if (queryString === undefined) {
        res.send({
            error: 'No filter found'
        })
    }
    const filter = queryString.split('=')[1];
    if (filter === undefined) {
        res.send({
            error: 'No filter found.'
        })
    }
    console.log(filter);
    const regex = new RegExp('.*' + filter + '.*', 'i');

    const filteredNews = Article.find({ title: { $regex: regex } }
    //   if(error) {
        
    //     res.status(500).send("Error");
    //   }
    //   else {
    //     res.json(filteredNews);
    //   }
    );
    res.send(filteredNews)
    console.log(filteredNews);
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

// db.collection('myCollection').find({ field: { $regex: regex } });