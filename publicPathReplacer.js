const fs = require('fs')
const path = require('path')

const indexHtmlPrerenderedPath = path.resolve('./public/prerendered/index.html')
const indexHtmlPath = path.resolve('./public/index.html')
const publicPath = 'ajari-koding'

const main = async () => {
  try {
    const htmlContent = await fs.readFileSync(indexHtmlPrerenderedPath, {
      encoding: 'utf-8'
    })
    const fixedContent = htmlContent
      .replace('/favicon.png', `/${publicPath}/favicon.png`)
      .replace('/build/bundle.css', `/${publicPath}/build/bundle.css`)
      .replace('/build/bundle.js', `/${publicPath}/build/bundle.js`)

    fs.writeFile(indexHtmlPath, fixedContent,
      function (err) {
        if (err) {
          return console.log('❌ Error write file index.html', err)
        }
        console.log('✅ Success write file index.html')
      }
    )

    fs.unlink(indexHtmlPrerenderedPath, (err) => {
      if (err) throw err;
      console.log(`✅ File ${indexHtmlPrerenderedPath} was deleted`);
    });
  } catch (error) {
    console.error('❌ Error read file html', error)
  }
}

main()
