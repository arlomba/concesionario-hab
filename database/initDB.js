require("dotenv").config();
const mysql = require("mysql2/promise");
const getPool = require("./getPool");

const initDB = async () => {
  try {
    const pool = getPool();

    await pool.query(`DROP TABLE IF EXISTS coches;`);

    console.log("Creando tabla coches...");

    await pool.query(`
      CREATE TABLE coches (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        marca VARCHAR(100) NOT NULL,
        modelo VARCHAR(100) NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        color VARCHAR(50) NOT NULL,
        cv INT NOT NULL
      );
    `);

    console.log("¡Tabla creada!");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

initDB();
