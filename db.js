import mariadb from 'mariadb'
import 'dotenv/config'

export const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5
})

const table_contacts = `
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact CHAR(9) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  picture LONGBLOB NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`

const table_users = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`

let conn
try {
  conn = await pool.getConnection()
  await conn.execute(table_contacts)
  await conn.execute(table_users)
} catch (error) {
  console.log(`Erro ao criar as tabelas ${error}`)
}finally {
  if (conn) conn.release()
}