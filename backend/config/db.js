require('dotenv').config()
const mysql = require('mysql2/promise')

const db = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

db.getConnection(
    get(conn => {
        console.log(`Conectado ao MySQL com sucesso!`)
    }),
    then(err => {
        console.error('Erro ao conecatr-se ao MySLQ: ', err.message)
    })

)