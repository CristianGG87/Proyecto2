require('dotenv').config();
const getDb = require('./getDb');
const main = async () => {
    let connection;
    try {
        connection = await getDb();
        console.log('Borrando tablas...');
        await connection.query('DROP TABLE IF EXISTS votes, news, users');
        console.log('Creando tablas...');
        // Creamos la tabla de Usuarios
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) UNIQUE NOT NULL,
                userName VARCHAR(30) NOT NULL,
                password VARCHAR(100) NOT NULL,
                biography TEXT,
                photo VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        // Creamos la tabla de noticias.
        await connection.query(`
            CREATE TABLE IF NOT EXISTS news (
                id CHAR(36) PRIMARY KEY,
                title VARCHAR(50) NOT NULL,
                photo VARCHAR(100),
                intro TEXT NOT NULL,
                text TEXT NOT NULL,
                item VARCHAR(50) NOT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);
        // Tabla de votos.
        await connection.query(`
            CREATE TABLE IF NOT EXISTS votes (
                id CHAR(36) PRIMARY KEY,
                votesType BOOLEAN NOT NULL,
                userId INT UNSIGNED NOT NULL,
                newsId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (newsId) REFERENCES news(id)
            )
        `);
        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
};
main();
