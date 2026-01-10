import { pool } from '../db.js'
import bcrypt from 'bcrypt'

export async function basicAuth(req, res, next) {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Basic '))
    return res.status(401).set('WWW-Authenticate', 'Basic').end()

  const base64 = header.split(' ')[1]
  const decoded = Buffer.from(base64, 'base64').toString('utf-8')
  const [username, password] = decoded.split(':')

  if (!username || !password)
    return res.status(401).end()

  const conn = await pool.getConnection()
  const rows = await conn.query('SELECT * FROM users WHERE username = ?', [username])
  conn.release()

  if (rows.length === 0)
    return res.status(401).end()

  const user = rows[0]
  const valid = await bcrypt.compare(password, user.password)

  if (!valid)
    return res.status(401).end()

  req.user = { id: user.id, username: user.username }
  next()
}
