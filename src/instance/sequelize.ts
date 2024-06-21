import { Sequelize } from "sequelize";

let instance: any;

/**
 * @description Create singleton instance of sequelize
 * @return {any} - Sequelize
 */
function sequelize(): any {
  if (instance) {
    return instance;
  }

  instance = new Sequelize(
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
    await instance.authenticate();
    return instance;
  } catch (error) {
    throw new Error('Unable to connect to the database: ' + error);
  }
}

export default sequelize();
