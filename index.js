import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import db from './db/database.js';

const app = express();
const port = process.env.PORT || 3000;

// calling news apis and storing in db
app.post('/getNews', async (req, res) => {
  try {
    const newsChannels = ['news', 'nyTimes', 'bloomberg'];

    for(const channel of newsChannels) {
      if (channel === 'news') {

      }
    }
  } catch (error) {

  }
})
  fetch(`${process.env.NEWS_API_URL + process.env.NEWS_API_KEY}`)
    .then(res => res.json())
    .then(data => {
        let results = data.articles;
        // const articles = results.map(article => ({
        //     title: article.title,
        //     url: article.url,
        //     description: article.description,
        

         // Save each article to the database
         results.forEach(article => {
          const articleData = {
            title: article.title,
            url: article.url,
            description: article.description,
          };
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


// fetching only one news channel's news and showing as per searched keyword
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

