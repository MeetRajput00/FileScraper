const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const port = process.env.PORT || 4000;
const cors = require('cors');


const app = express();
app.use(cors());
async function scrapeGoogleDrive(searchParam) {
    const searchQuery = `"${searchParam}" site:drive.google.com`;
  const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const results = [];
    $('a').each((index, element) => {
        const href = $(element).attr('href');
        const title = $(element).find('h3').text();
        if (href && title && href.startsWith('/url?q=https://drive.google.com/')) {
            const url = href;
            const startString = '/url?q=';
            const endString = '&sa=U';

            const startIndex = url.indexOf(startString) + startString.length;
            const endIndex = url.indexOf(endString);
            const extractedString = url.substring(startIndex, endIndex);

          results.push({ extractedString, title });
        }
      });
    return results;
  } catch (error) {
    throw new Error('Failed to scrape Google search results');
  }
}
async function scrapeGoogle(searchParam, filetype) {
  const searchQuery = `"${searchParam}" filetype:${filetype}`;
const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
console.log(searchQuery, url);
try {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const results = [];
  $('a').each((index, element) => {
    const href = $(element).attr('href');
    const title = $(element).find('h3').text();
    console.log(href, title);
    if (href && title && href.startsWith('/url?q=') && href.includes(".pdf")) {
      const url = href;
      const startString = '/url?q=';
      const endString = '.pdf';
  
      const startIndex = url.indexOf(startString) + startString.length;
      const endIndex = url.indexOf(endString) + endString.length; // Updated line
      const extractedString = url.substring(startIndex, endIndex);
  
      results.push({ extractedString, title });
  }
  
  });
  return results;
} catch (error) {
  throw new Error('Failed to scrape Google search results');
}
}

app.listen(port, ()=>{
    console.log(`Server Established and  running on Port ⚡${port}`)
})
app.get('/googleDrive', function(req, res) {
    const searchQuery = req.query.q; // Get the search query from the URL query parameters
  
    scrapeGoogleDrive(searchQuery)
      .then(results => {
        console.log('Search Results:', results);
        res.send(results); // Send the results in the response
      })
      .catch(error => {
        console.error('Scraping Error:', error);
        res.status(500).send('Error occurred during scraping.'); // Send an error response
      });
  });
app.get('/pdf', function(req, res) {
  const searchQuery = req.query.q; // Get the search query from the URL query parameters
  scrapeGoogle(searchQuery,"pdf")
    .then(results => {
      console.log('Search Results:', results);
      res.send(results); // Send the results in the response
    })
    .catch(error => {
      console.error('Scraping Error:', error);
      res.status(500).send('Error occurred during scraping.'); // Send an error response
    });
});
  


