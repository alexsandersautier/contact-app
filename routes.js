import { Router } from "express";
import { contactController } from "./controllers/contactController.js";
import { userController } from "./controllers/userController.js";
import { upload } from "./middlewares/upload.js";
import { basicAuth } from "./middlewares/auth.js";

export const router = Router()
const contactContr = contactController()
const userContr = userController()

router.get('/contacts', contactContr.getAll)
router.post('/users', userContr.create)
router.post('/users/login', userContr.login)
router.use(basicAuth)
router.get('/contacts/:id', contactContr.getById)
router.post('/contacts', upload.single('image'), contactContr.create)
router.put('/contacts/:id', upload.single('image'), contactContr.update)
router.delete('/contacts/:id', contactContr.remove)