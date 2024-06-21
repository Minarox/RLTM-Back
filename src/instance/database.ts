import { Sequelize } from "sequelize";

let singleton: any;

/**
 * @description Create singleton instance of Sequelize (= database)
 * @return {any} - Sequelize
 */
function database(): any {
  if (singleton) {
    return singleton;
  }

  singleton = new Sequelize(
    process.env['MYSQL_DATABASE'],
    process.env['MYSQL_USER'],
    process.env['MYSQL_PASSWORD'],
    {
      host: process.env['MYSQL_HOST'],
      port: Number(process.env['MYSQL_PORT']),
      dialect: mariadb
    }
  );

  try {
    await singleton.authenticate();
    return singleton;
  } catch (error) {
    throw new Error('Unable to connect to the database: ' + error);
  }
}

export default database();
