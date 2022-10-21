import express from 'express'
import {getRecentTokenId} from '../controllers/main.js'

const router = express.Router();

// //RETRIEVES ALL POSTS
router.get('/', getRecentTokenId)

//CREATES NEW POST
// router.post('/', createUser);

// //DELETES A POST BY ID
// router.delete('/:id', deleteUser);

export default router