import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
const sslEnabled = process.env.NODE_ENV === 'development' ? false : true
var pg = require('pg');
pg.defaults.ssl = sslEnabled;
export interface DBInterface {
  connection: Sequelize;
}
/// see at https://vivacitylabs.com/setup-typescript-sequelize/
export class Database {
  private connectionConfig: any = null
  public connection: Sequelize = new Sequelize(`${process.env.DATABASE_URL}`, { ssl: sslEnabled, logging: false })
  constructor(connectionString?: string, database?: string, username?: string, password?: string, host?: string, dialect?: string) {
    let stringConntection = process.env.DATABASE_URL as string;
    if (connectionString) {
      stringConntection = connectionString;
    } else {
      stringConntection = `${dialect || 'postgres'}://${username}:${password}@${host}`;
    }
    this.connectionConfig = stringConntection;
  }
  public init() {
    this.connection = new Sequelize(this.connectionConfig, { ssl: false, logging: false })
    this.connection.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err: any) => {
        console.error('Unable to connect to the database:\n', err);
      });
    return this.connection
  }
}
const db = new Database(process.env.DATABASE_URL)
export default db