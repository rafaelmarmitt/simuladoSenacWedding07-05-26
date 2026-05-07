require('dotenv').config()
const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

db.getConnection((err, conn) => {
    if (err) {
        console.error('Eror ao conectar-se ao MySQL: ', err.message)
    } else {
        console.log('Conectado ao MySQL com sucesso!')
    }
}
)