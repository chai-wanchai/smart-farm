import express from 'express';
import compression from "compression";
import bodyParser from "body-parser";
import oauth from './routers/auth.router'
import users from './routers/users.router'
import role from './routers/role.router'
import client from './routers/client.router'
import smartfarm from './routers/smartFarm.router'
const app = express();
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', oauth)
app.use('/api/v1', users)
app.use('/api/v1', role)
app.use('/api/v1', client)
app.use('/api/v1', smartfarm)
app.use('/api/v1/*', (req, res, next) => {
  return res.status(404).json({ status: 404, message: 'Not found : '+req.url })
})


export default app;

