import { userModel } from "../models/user.js"
import bcrypt from 'bcrypt'

const model = userModel()

export function userController() {

    async function create(req, res) {
        try {
            const { username, password } = req.body

            if (!username || !password)
                return res.status(400).json({ error: 'Missing fields' })

            const exists = await model.get(username)

            if (exists.length > 0) return res.status(400).json({ message: "Already exists username" })

            const hash = await bcrypt.hash(password, 12)

            const id = await model.create(username, hash)
            res.status(201).json({'id': id})
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal error' })
        }
    }

    async function login(req, res) {
         try {
            const { username, password } = req.body

            if (!username || !password)
                return res.status(400).json({ error: 'Missing fields' })

            const exists = await model.get(username)

            const isValid = await bcrypt.compare(password, exists[0].password)

            isValid ? res.status(204).end() : res.status(401).end()

        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal error' })
        }

    }

    return {
        create,
        login
    }
}