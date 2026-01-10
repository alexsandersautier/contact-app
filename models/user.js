import { pool } from "../db.js"

export function userModel() {

    const connect = async () => {
        return await pool.getConnection()
    }

    const disconnect = async (conn) => {
        await conn.release()
    }

    async function create(username, password) {
        const conn = await connect()
        const user = await conn.query('INSERT into users (username, password) values (?, ?)', [username, password])
        await disconnect(conn)
        return Number(user.insertId)
    }

    async function get(username) {
        const conn = await connect()
        const user = await conn.query('SELECT * FROM users WHERE username = ?', [username])
        await disconnect(conn)
        return user
    }

    return {
        create,
        get
    }
}