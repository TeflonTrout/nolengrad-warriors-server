import express from 'express'
import {getWarriorById, createWarriorById, updateWarriorById} from '../controllers/main.js'

const router = express.Router();

//RETRIEVES ALL POSTS
router.get('/warriors/:tokenId', getWarriorById)
//CREATES A NEW WARRIOR METADATA
router.post('/warriors/:tokenId', createWarriorById)
//UPDATE WARRIOR METADATA BY ID
router.put('/warriors/:tokenId', updateWarriorById)

export default router