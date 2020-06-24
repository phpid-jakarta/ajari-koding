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
		console.log($)

    // fs.writeFile(
    //   path.resolve('./data.json'),
    //   JSON.stringify(fileContent),
    //   function (err) {
    //     if (err) {
    //       return console.log('❌ Error write file data.json', err);
    //     }
    //     console.log('✅ Success write file data.json');
    //   }
    // );

    // fs.writeFile(
    //   path.resolve('./data.js'),
    //   `module.exports = ${JSON.stringify(fileContent)}`,
    //   function (err) {
    //     if (err) {
    //       return console.log('❌ Error write file data.json', err);
    //     }
    //     console.log('✅ Success write file data.json');
    //   }
    // );
  } catch (error) {
    console.error('❌ Error read file README.md', error);
  }
};

main();
