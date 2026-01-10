import { pool } from "../db.js"

export function contactModel() {

    const connect = async () => {
        return await pool.getConnection()
    }

    const disconnect = async (conn) => {
        await conn.release()
    }

    async function getAll() {
        const conn = await connect()
        const contacts = await conn.query('SELECT * FROM contacts')
        await disconnect(conn)
        return contacts
    }

    async function getById(id) {
        const conn = await connect()
        const contacts = await conn.query('SELECT * FROM contacts WHERE id = ?', [id])
        await disconnect(conn)
        return contacts
    }

    async function getByContact(contact) {
        const conn = await connect()
        const contacts = await conn.query('SELECT * FROM contacts WHERE contact = ?', [contact])
        await disconnect(conn)
        return contacts
    }

    async function getByEmail(email) {
        const conn = await connect()
        const contacts = await conn.query('SELECT * FROM contacts WHERE email = ?', [email])
        await disconnect(conn)
        return contacts
    }

    async function create(obj) {
        const { contact, name, email, picture } = obj
        const conn = await connect()
        const newContact = await conn.query(
            'INSERT INTO contacts (contact, name, email, picture) VALUES(?, ?, ?, ?)',
            [contact, name, email, picture]
        )
        await disconnect(conn)
        return Number(newContact.insertId)
    }

    async function update(id, data) {
        const conn = await connect()

        const fields = Object.keys(data)
        const values = Object.values(data)

        if (fields.length === 0) {
            await disconnect(conn)
            return
        }

        const sets = fields.map(field => `${field} = ?`).join(', ')
        const sql = `UPDATE contacts SET ${sets} WHERE id = ?`

        await conn.query(sql, [...values, id])

        await disconnect(conn)
    }


    async function remove(id) {
        const conn = await connect()
        await conn.query('DELETE FROM contacts WHERE id = ?', [id])
        await disconnect(conn)
    }

    return {
        getAll,
        getById,
        getByContact,
        getByEmail,
        create,
        update,
        remove
    }
}