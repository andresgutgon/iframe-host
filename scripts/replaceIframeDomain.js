const fs = require('fs')
const rimraf = require('rimraf')

/**
 * In Netlify we want to point to Vercel domain
 */
function changeDomain () {
  fs.readFile('./index.html', 'utf8', function (err, data) {
    if (err) return console.log(err)

    const result = data.replace(
      /http\:\/\/localhost\:3000/g,
      'https://community-maps-builder.vercel.app/'
    )

    fs.writeFile('./dist/index.html', result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

function replaceIframeDomain () {
  // Create dist
  fs.mkdir('./dist', { recursive: true }, (err) => {
    if (err) throw err;
  })
  // Clean ./dist
  rimraf('./dist/*', function () { console.log('done'); })

  // Copy favicon
   fs.copyFile('./favicon.ico', './dist/favicon.ico', (err) => {
     if (err) throw err;
   })

  // use Vercel domain in production
  changeDomain()
}

replaceIframeDomain()
