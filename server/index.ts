import next from 'next';
import apiApp from './api/src/app'
import Database from './api/src/common/database'
import dbModel from './api/src/service/dbService'


const port = parseInt(process.env.PORT || '5000', 10)
const appNext = next({ dev: process.env.NODE_ENV === 'development' })
const handle = appNext.getRequestHandler()
const renderPage = (req, res, pagePath, queryParams?) => appNext
  .render(req, res, pagePath, queryParams)
  .catch(err => appNext.renderError(err, req, res, pagePath, queryParams))

appNext.prepare().then(() => {

  // Create express server
  const server = apiApp
  server.get('/maintain/animal/:mode', (req, res) => {
    renderPage(req, res, '/maintain/animal',Object.assign(req.params, {
      mode: req.params.mode,
      asPath: `/maintain/animal/${req.params.mode}`
    }));
  })
  server.all('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
    Database.init()
    if (process.env.NODE_ENV === 'development') {
      Object.values(dbModel).forEach(async (model) => {
        try {
          const result = await model.sync({ alter: true })
          console.log(result)
          console.log(`Sync Table : ${model.tableName} complete!!`)
        } catch (error) {
          console.log(error, '**********************')
        }

      })
    }
    console.log('sync complete !!!!')
  })
})