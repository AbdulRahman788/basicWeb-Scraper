const PORT = 8080
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

// URL of the website to scrape
const url= 'https://www.aljazeera.com/'

axios(url)
    .then(response => {
        const html= response.data
        const chr= cheerio.load(html)
        const arr=[]

        // .fte-article_title class is being specified
        chr('.fte-article__title', html).each(function(){
            // find all the titles from span tags
            const title= chr(this).find('span').text()
            // find all link, to be accurate using .find
            const url=chr(this).find("a").attr('href')
            // Find all the article titles on the page
            const articleTitles = chr('h3').text()


            arr.push({
                title,
                url,
                articleTitles
            })
        })
        console.log(arr)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
