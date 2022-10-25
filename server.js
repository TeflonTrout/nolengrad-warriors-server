import express from 'express'
import FormData from "form-data";
import fs from "fs"
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from "axios";
import warriorRoutes from './routes/warriors.js';
import Warrior from './models/warrior.js';

const app = express();

dotenv.config();

app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());

// USER DEFINED ROUTES
app.use('/', warriorRoutes);

// BASE ROUTE TO RETURN ALL WARRIOR DATA
app.get("/getAll", async (req,res) => {
    try {
        const data = await Warrior.find();
        res.status(200).json({message: data})
    } catch (e) {
        res.status(404).json({ message: e.message})  
    }
})

// app.get('/ngw/:tokenId', async (req,res) => {
//     try {
//         if(Object.keys(req.query).length != 6) {
//             res.status(404).json({message: "Invalid tokenId or invalid tokenURI"})
//         } else {   
//             const metadata = {
//                 "description": "Fast collection of 222 Viking Warriors preparing for war!", 
//                 "external_url": `https://battle-for-icy-fjord.netlify.app/ngw/${req.params.tokenId}`, 
//                 "image": "https://gateway.pinata.cloud/ipfs/QmNQ4q9AK2ynqqiRjpmWoaVFSnb9hBXN5PbLfKzmtjAJ12/elf.png", 
//                 "name": `Warrior #${req.params.tokenId}`,
//                 "attributes": [
//                     {
//                         trait_type: "tokenId",
//                         value:  req.params.tokenId
//                     },
//                     {
//                         trait_type: "Strength",
//                         value:  req.params.strength
//                     },
//                     {
//                         trait_type: "Dexterity",
//                         value:  req.params.dexterity
//                     },
//                     {
//                         trait_type: "Charisma",
//                         value:  req.params.charisma
//                     },
//                     {
//                         trait_type: "Wisdom",
//                         value:  req.params.wisdom
//                     },
//                     {
//                         trait_type: "House",
//                         value:  req.params.house
//                     },
//                     {
//                         trait_type: "Rarity",
//                         value:  req.params.rarity
//                     }
//                 ]}
//                 res.status(200).json(metadata)
//         }
//     } catch (e) {
//         res.status(404).json({ message: error.message})
//     }
// })

const url = process.env.MONGO_DB_URL;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

// CONNECT TO MONGODB
mongoose.connect(url,connectionParams)
.then( () => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})

// RUN SERVER
app.listen(process.env.PORT || 5000, () => {
    console.log(`APP RUNNING`);
});
