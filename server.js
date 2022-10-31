import express from 'express'
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import warriorRoutes from './routes/warriors.js';
import Warrior from './models/warrior.js';
import { ethers } from 'ethers';
import { contractABI } from './abi.js';

const app = express();

async function main() {
    const address = "0x76d97F5f78996ce0278CD54c6708de96bBb09100"
    const provider = new ethers.providers.InfuraProvider("goerli", "1b912dc0b0414c47bc30e741585d2d45");
    const contract = new ethers.Contract(address, contractABI, provider)
    contract.on("NewWarriorMinted", (warriorId) => {
        const getWarriorData = async (warriorId) => {
            let array = [];
            const warriorMetadata = await contract.getWarriorStats(warriorId);
            warriorMetadata?.metadata?.map(attribute => {
                console.log(attribute.toString())
                array.push(Number(attribute.toString()))
            })
            const supply = await contract.getNumberOfWarriors();
            const strength = array[0]
            const dexterity = array[1]
            const charisma = array[2]
            const wisdom = array[3]
            const house = array[4]
            const rarity = array[5]

            const warrior = new Warrior({
                "description": "Fast collection of 256 Viking Warriors preparing for war!", 
                "external_url": `https://battle-for-icy-fjord.netlify.app/ngw/${supply}`, 
                "image": `https://gateway.pinata.cloud/ipfs/QmXvu7prPdubtzNLwNzBs8gURxh79GjeX9jQA8PmxjGZtm/${house}${rarity}.png`, 
                "name": `Warrior #${supply}`,
                "tokenId": supply,
                "attributes": [
                    {
                        trait_type: "tokenId",
                        value:  supply
                    },
                    {
                        trait_type: "Strength",
                        value: strength
                    },
                    {
                        trait_type: "Dexterity",
                        value: dexterity
                    },
                    {
                        trait_type: "Charisma",
                        value: charisma
                    },
                    {
                        trait_type: "Wisdom",
                        value: wisdom
                    },
                    {
                        trait_type: "House",
                        value: house
                    },
                    {
                        trait_type: "Rarity",
                        value: rarity
                    }
            ]})

            await warrior.save()
        }
        getWarriorData(warriorId)
    })
    console.log("MAIN() IS RUNNING")
}

dotenv.config();
// enabling CORS and JSON Parsing for all requests
app.use(bodyParser.json());
app.use(cors());

// USER DEFINED ROUTES
app.use('/', warriorRoutes);

// BASE ROUTE TO RETURN ALL WARRIOR DATA
app.get("/getAll", async (req, res) => {
    try {
        const data = await Warrior.find();
        res.status(200).json({message: data})
    } catch (e) {
        res.status(404).json({ message: e.message})  
    }
})

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
    main()
});
