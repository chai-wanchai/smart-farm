import app from './app'
import apiApp from './api/src/app'
import Database from './api/src/common/database'
import dbModel from './api/src/service/dbService'
const handle = app.getRequestHandler()
const port = parseInt(process.env.PORT || '5000', 10)
const renderPage = (req, res, pagePath, queryParams?) => app
  .render(req, res, pagePath, queryParams)
  .catch(err => app.renderError(err, req, res, pagePath, queryParams))

app.prepare().then(() => {

  // Create express server
  const server = apiApp
  server.all('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
    Database.init()
    Object.values(dbModel).forEach(async (model) => {
      try {
        const result = await model.sync({ alter: true })
        console.log(result)
        console.log(`Sync Table : ${model.tableName} complete!!`)
      } catch (error) {
        console.log(error, '**********************')
      }

    })
    console.log('sync complete !!!!')
  })
})