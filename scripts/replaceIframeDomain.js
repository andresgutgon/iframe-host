const fs = require('fs')
const rimraf = require('rimraf')

// Production URL:
// 'https://community-maps-builder.vercel.app/'

/**
 * In Netlify we want to point to Vercel domain
 */
function changeDomain () {
  ['index.html', 'a-child-page/index.html'].forEach((page) => {
    fs.readFile(`./${page}`, 'utf8', function (err, data) {
      if (err) return console.log(err)

      const result = data.replace(
        /http\:\/\/localhost\:3000/g,
        'https://community-maps-builder-git-fix-ios-not-loading-maps-perretes.vercel.app'
      )

      fs.writeFile(`./dist/${page}`, result, 'utf8', function (err) {
        if (err) return console.log(err)
      })
    })
  })
}

async function buildPages () {
  // Create dist
  await fs.promises.mkdir('./dist', { recursive: true }, (err) => {
    if (err) throw err;
  })
  // Clean ./dist
  rimraf('./dist/*', async function () {
    // Copy favicon
    fs.copyFileSync('favicon.ico', 'dist/favicon.ico', fs.constants.COPYFILE_EXCL)

    await fs.promises.mkdir('./dist/a-child-page', { recursive: true }, (err) => {
      if (err) throw err;
    })
    // use Vercel domain in production
    changeDomain()
  })
}

buildPages()
