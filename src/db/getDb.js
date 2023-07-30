const mysql = require('mysql2/promise');

// Obtenemos las variables de entorno necesarias mediante destructuring.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacená un grupo (array) de conexiones.
let pool;

// Función que retornará una de las 10 conexiones libres con la base de datos.
const getDb = async () => {
    try {
        // Si la variable "pool" es undefined...
        if (!pool) {
            // Creamos una conexión con la base de datos.
            const dbConnection = await mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });

            // Con la conexión anterior creamos la base de datos si no existe.
            await dbConnection.query(
                `CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`
            );

            // Creamos un grupo de conexiones.
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        // Retornamos una conexión libre con la base de datos.
        return await pool.getConnection();
    } catch (err) {
        console.error(err);
    }
};

// Exportamos la función.
module.exports = getDb;
