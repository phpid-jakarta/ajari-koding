const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const main = async () => {
  try {
    const readmeContent = await fs.readFileSync(path.resolve(`./README.md`), {
      encoding: 'utf-8',
		});
		const html = md.render(readmeContent);
		const $ = cheerio.load(html)
		const jsonResult = $('h3').map((i, el) => {
			const data = $(el).next('ul').children().map((_ , li) => {
				return $(li).text();
			}).get();

			const formatteddata = {};
			data.forEach(item => {
				// website doesn't work to split with :
				const itemSplit = item.split(':');
				const t = itemSplit[0].trim().toLowerCase().replace(/\s/g, '_');
				if (t === 'website' || t === 'url') {
					formatteddata[t] = item.replace(/website:/gi, '').replace(/url:/gi, '').trim();
				} else {
					const v = itemSplit[1].trim();
					if (v.includes(',')) {
						formatteddata[t] = v.split(',');
					} else {
						formatteddata[t] = v;
					}
				}
			})

			const title = $(el).text();
			return {
				title,
				...formatteddata
			}
		}).get();

		const fileContent = {
			last_updated: new Date(),
			awesome_list: jsonResult
		};

    fs.writeFile(
      path.resolve('./data.json'),
      JSON.stringify(fileContent),
      function (err) {
        if (err) {
          return console.log('❌ Error write file data.json', err);
        }
        console.log('✅ Success write file data.json');
      }
    );

    fs.writeFile(
      path.resolve('./data.js'),
      `module.exports = ${JSON.stringify(fileContent)}`,
      function (err) {
        if (err) {
          return console.log('❌ Error write file data.json', err);
        }
        console.log('✅ Success write file data.json');
      }
    );
  } catch (error) {
    console.error('❌ Error read file README.md', error);
  }
};

main();
