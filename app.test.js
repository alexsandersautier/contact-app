import { jest } from '@jest/globals'
import request from 'supertest'
import express from 'express'
import multer from 'multer'

const mockModel = {
  getAll: jest.fn(),
  getById: jest.fn(),
  getByContact: jest.fn(),
  getByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
}

await jest.unstable_mockModule('./models/contact.js', () => ({
  contactModel: () => mockModel
}))

const { contactController } = await import('./controllers/contactController.js')

const upload = multer()

function makeApp() {
  const app = express()
  app.use(express.json())

  const controller = contactController()

  app.get('/contacts', controller.getAll)
  app.get('/contacts/:id', controller.getById)
  app.post('/contacts', upload.single('picture'), controller.create)
  app.put('/contacts/:id', upload.single('picture'), controller.update)
  app.delete('/contacts/:id', controller.remove)

  return app
}

describe('Contact Controller', () => {
  let app

  beforeEach(() => {
    app = makeApp()
    jest.clearAllMocks()
  })

  it('GET /contacts → 200 and returns base64 picture', async () => {
    mockModel.getAll.mockResolvedValue([
      { id: 1, name: 'Alexander', contact: '123456789', email: 'a@a.com', picture: Buffer.from('img') }
    ])

    const res = await request(app).get('/contacts')
    expect(res.statusCode).toBe(200)
    expect(res.body[0].picture).toBe(Buffer.from('img').toString('base64'))
  })

  it('GET /contacts/:id → 404 when not found', async () => {
    mockModel.getById.mockResolvedValue([])

    const res = await request(app).get('/contacts/1')
    expect(res.statusCode).toBe(404)
  })

  it('POST /contacts → rejects short name', async () => {
    const res = await request(app)
      .post('/contacts')
      .field('name', 'Ana')
      .field('contact', '123456789')
      .field('email', 'ana@test.com')
      .attach('picture', Buffer.from('img'), 'img.png')

    expect(res.statusCode).toBe(400)
  })

  it('POST /contacts → rejects invalid contact', async () => {
    const res = await request(app)
      .post('/contacts')
      .field('name', 'Alexander')
      .field('contact', '123')
      .field('email', 'alex@test.com')
      .attach('picture', Buffer.from('img'), 'img.png')

    expect(res.statusCode).toBe(400)
  })

  it('POST /contacts → creates contact', async () => {
    mockModel.getByContact.mockResolvedValue([])
    mockModel.getByEmail.mockResolvedValue([])
    mockModel.create.mockResolvedValue(1)

    const res = await request(app)
      .post('/contacts')
      .field('name', 'Alexander')
      .field('contact', '123456789')
      .field('email', 'alex@test.com')
      .attach('picture', Buffer.from('img'), 'img.png')

    expect(res.statusCode).toBe(201)
    expect(res.body.id).toBe(1)
  })

  it('PUT /contacts/:id → 404 if not exists', async () => {
    mockModel.getById.mockResolvedValue([])

    const res = await request(app).put('/contacts/1').send({ name: 'Novo' })
    expect(res.statusCode).toBe(404)
  })

  it('PUT /contacts/:id → 200 update', async () => {
    mockModel.getById.mockResolvedValue([{ id: 1 }])
    mockModel.update.mockResolvedValue()

    const res = await request(app).put('/contacts/1').send({ name: 'Novo Nome' })
    expect(res.statusCode).toBe(200)
  })

  it('DELETE /contacts/:id → 204', async () => {
    mockModel.remove.mockResolvedValue()

    const res = await request(app).delete('/contacts/1')
    expect(res.statusCode).toBe(204)
  })
})
