import { Sequelize } from "sequelize";

let singleton: any;

/**
 * @description Create singleton instance of Sequelize (= database)
 * @return {Promise<any>} - Sequelize
 */
async function database(): Promise<any> {
  if (singleton) {
    return singleton;
  }

  singleton = new Sequelize(
    process.env['MYSQL_DATABASE'] || "rltm",
    process.env['MYSQL_USER'] || "rltm",
    process.env['MYSQL_PASSWORD'] || "rltm",
    {
      host: process.env['MYSQL_HOST'] || "mariadb",
      port: Number(process.env['MYSQL_PORT']) || 3306,
      dialect: "mariadb"
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
