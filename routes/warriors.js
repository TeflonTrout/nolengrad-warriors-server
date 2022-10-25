import express from 'express'
import {getWarriorById, createWarriorById} from '../controllers/main.js'

const router = express.Router();

//RETRIEVES ALL POSTS
router.get('/warriors/:tokenId', getWarriorById)
//CREATES A NEW WARRIOR METADATA
router.post('/warriors/:tokenId', createWarriorById)


export default router