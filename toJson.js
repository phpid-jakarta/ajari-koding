const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

const writeFile = (pathFile, contentString) => {
  fs.writeFile(
    path.resolve(pathFile), contentString,
    function (err) {
      if (err) {
        return console.log(`❌ Error write file ${pathFile}`, err)
      }
      console.log(`✅ Success write file ${pathFile}`)
    }
  )
}

const main = async () => {
  try {
    const readmeContent = await fs.readFileSync(path.resolve('./README.md'), {
      encoding: 'utf-8'
    })
    const html = md.render(readmeContent)
    const $ = cheerio.load(html)
    const jsonResult = $('h3')
      .map((i, el) => {
        const data = $(el)
          .next('ul')
          .children()
          .map((_, li) => {
            return $(li).text()
          })
          .get()

        const formatteddata = {}
        data.forEach((item) => {
          // website doesn't work to split with :
          const itemSplit = item.split(':')
          const t = itemSplit[0].trim().toLowerCase().replace(/\s/g, '_')
          if (t === 'website' || t === 'url') {
            formatteddata.url = item
              .replace(/website:/gi, '')
              .replace(/website :/gi, '')
              .replace(/url:/gi, '')
              .replace(/url :/gi, '')
              .trim()
          } else if (t === 'business_model') {
            const v = itemSplit[1].trim()
            formatteddata[t] = v.toUpperCase()
          } else if (t === 'rating') {
            const v = itemSplit[1].trim()
            formatteddata[t] = parseInt(v, 10)
          } else if (
            t === 'topic_tags' ||
            t === 'topic' ||
            t === 'tags' ||
            t === 'topik'
          ) {
            const v = itemSplit[1].trim()
            formatteddata.topic_tags = v
              .split(',')
              // all tags should be in lowercase
              .map((i) => i.trim().toLowerCase().replace(/\./g, ''))
              .sort()
          } else {
            const v = itemSplit[1].trim()
            formatteddata[t] = v
          }
        })

        const title = $(el).text()
        return {
          id: `${title
            .toLowerCase()
            .replace(/\./g, '')
            .replace(/[^\w ]/, '')
            .replace(/\s/g, '')}`,
          // title is in uppercase
          title: title.toUpperCase(),
          ...formatteddata
        }
      })
      .get()

    const sortByAplhabet = (arr) => {
      return [...arr].sort((a, b) => {
        // Sort by title alphabet
        if (a.id < b.id) {
          return -1
        }
        if (a.id > b.id) {
          return 1
        }
        return 0
      })
    }

    const sortByRating = (arr) => {
      return [...arr].sort((a, b) => {
        // Sort by rating
        return b.rating - a.rating
      })
    }

    const arrayWithRating = jsonResult.filter(i => i.rating > 0)
    const arrayWithoutRating = jsonResult.filter(i => i.rating < 1)
    const allList = [
      ...sortByRating(arrayWithRating),
      ...sortByAplhabet(arrayWithoutRating)
    ]

    const fileContent = {
      last_updated: new Date(),
      awesome_list: allList
    }

    const d = {}
    allList.forEach((i) => {
      d[i.id] = 0
    })
    writeFile('./db.json', JSON.stringify({ likes: d, dislikes: d }))
    writeFile('./data.json', JSON.stringify(fileContent))
    writeFile('./data.js', `module.exports = ${JSON.stringify(fileContent)}`)
    writeFile('./data-es.js', `export default ${JSON.stringify(fileContent)}`)
  } catch (error) {
    console.error('❌ Error read file README.md', error)
  }
}

main()
