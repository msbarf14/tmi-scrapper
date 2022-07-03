const PORT = process.env.PORT || 3001

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const url = "https://tmial-amien.sch.id/"
const app = express()

app.get('/', (req, res) => {
    res.json('avenzhore @ar14')
})

app.get('/news', (req, res) => {
    axios.get(url+'category/berita/')
    .then(response => {
        const html = response.data
        const news = []
        const $ = cheerio.load(html)
        $('.post-item', html).each(function() {
            const title = $(this).find('.post-title').text()
            const desc = $(this).find('.from_the_blog_excerpt ').text()
            const link = $(this).find('a').attr('href')
            const img = $(this).find('img').attr('src')
            news.push({
                img,
                title,
                desc,
                link
            })
        })
        res.json(news)
    })
})

app.get('/news/kolom-pengasuh', (req, res) => {
    axios.get(url+'category/kolom-pengasuh/')
    .then(response => {
        const html = response.data
        const news = []
        const $ = cheerio.load(html)
        $('.post-item', html).each(function() {
            const title = $(this).find('.post-title').text()
            const desc = $(this).find('.from_the_blog_excerpt ').text()
            const link = $(this).find('a').attr('href')
            const img = $(this).find('img').attr('src')
            news.push({
                img,
                title,
                desc,
                link
            })
        })
        res.json(news)
    })
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))