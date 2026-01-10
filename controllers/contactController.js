import { contactModel } from "../models/contact.js"

const model = contactModel()

export function contactController() {

    async function getAll(req, res) {
        try {
            const registers = await model.getAll()
            const contacts = registers.map((reg) => {
                const picture = reg.picture.toString('base64')
                delete reg.picture
                return {
                    ...reg,
                    picture: picture
                }
            })
    
            res.status(200).json(contacts)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal error' })
        }
    }
    
    async function getById(req, res) {
    
        try {
            const id = req.params.id
            const register = await model.getById(id)
            if (register.length > 0) {
                const picture = register[0].picture.toString('base64')
                delete register[0].picture
                const contact = {
                    ...register[0],
                    picture: picture
                }
                res.status(200).json(contact)
            } else {
                res.status(404).json({ message: 'Contact not found' })
            }
    
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal error' })
        }
    }
    
    async function create(req, res) {
    
        try {
            const { contact, name, email } = req.body
    
            const contactByContact = await model.getByContact(contact)
    
            if (contactByContact.length > 0) {
                res.status(400).json({ message: 'Already exists an register with this contact' })
                return
            }
    
            const contactByEmail = await model.getByEmail(email)
    
            if (contactByEmail.length > 0) {
                res.status(400).json({ message: 'Already exists an register with this email' })
                return
            }
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email' })
            }
    
            const file = req.file
    
            if (!file) return res.status(400).json({ error: 'No file' })
    
            const picture = file.buffer
    
            const newContact = {
                contact, name, email, picture
            }
    
            const id = await model.create(newContact)
    
            res.status(201).json({
                message: 'Contact cretead',
                id: id
            })
    
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal error' })
        }
    }
    
    async function update(req, res) {
        try {
            const id = req.params.id
            const existing = await model.getById(id)
    
            if (existing.length === 0)
                return res.status(404).json({ message: 'Contact not found' })
    
            let payload = { ...req.body }
    
            if (req.file) {
                payload.picture = req.file.buffer
            }
    
            if (Object.keys(payload).length === 0)
                return res.status(400).json({ error: 'Nothing to update' })
    
            await model.update(id, payload)
    
            res.status(200).json({ message: 'Contact updated' })
    
    
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal error' })
        }
    }
    
    async function remove(req, res) {
        try {
            const id = req.params.id
            await model.remove(id)
            res.status(204).end()
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal error' })
        }
    }

    return {
        getAll,
        getById,
        create,
        update,
        remove
    }
}