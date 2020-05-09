import next from 'next';
import apiApp from './api/src/app'
import Database from './api/src/common/database'
import createDbModel from './api/src/model';


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
    renderPage(req, res, '/maintain/animal', Object.assign(req.params, {
      mode: req.params.mode,
      asPath: `/maintain/animal/${req.params.mode}`
    }));
  })
  server.all('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
    const db = Database.init()
    const model = createDbModel(db)
    db.sync({ alter: true }).then(result => {
      console.log(result.models);
      console.log('sync complete !!!!')
    }).catch(err => {
      console.log('error from sync model', err)
    })
  })
})