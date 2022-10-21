import express from 'express'
import FormData from "form-data";
import fs from "fs"
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from "axios";
import userRoutes from './routes/nft.js';

const app = express();

dotenv.config();

app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
app.use('/users', userRoutes);

app.get('/mint', async (req, res) => {
    try {
        var data = JSON.stringify({
            "pinataOptions": {
              "cidVersion": 1,
              "wrapWithDirectory": true
            },
            "pinataMetadata": {
                "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
                "external_url": "https://openseacreatures.io/3", 
                "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
                "name": "Drew Starbelly",
                "attributes": [
                    {
                        "trait_type": "Base", 
                        "value": "Starfish"
                      }, 
                      {
                        "trait_type": "Eyes", 
                        "value": "Big"
                      }, 
                      {
                        "trait_type": "Mouth", 
                        "value": "Surprised"
                      }, 
                      {
                        "trait_type": "Level", 
                        "value": 5
                      }
                ]
            },
            "pinataContent": {
                "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
                "external_url": "https://openseacreatures.io/3", 
                "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
                "name": "Drew Starbelly",
                "keyvalues": "testing",
                "attributes": [
                    {
                        "trait_type": "Base", 
                        "value": "Starfish"
                    }, 
                    {
                        "trait_type": "Eyes", 
                        "value": "Big"
                    }, 
                    {
                        "trait_type": "Mouth", 
                        "value": "Surprised"
                    }, 
                    {
                        "trait_type": "Level", 
                        "value": 5
                    }
                ]
            }
        });
        var config = {
            method: 'post',
            // url: 'https://api.pinata.cloud/pinning/pinByHash',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            // url: 'https://getpantry.cloud/apiv1/pantry/c971074d-0493-4191-8e70-3191ad394109/basket/ngw_2',
            // url: 'https://api.filebase.io/v1/ipfs/pins',
            // url: 'https://api.nft.storage/upload',
            headers: { 
                pinata_api_key: process.env.PINATA_API_KEY,
                pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                "Content-Type": "application/json",
                // "Authorization": "Bearer QjkwNUU2NUY4MUUyOEZERjA2OEQ6TzRTeVJmVzQxQ2hDQXRMWGhnQ3BhZUxpNG1HZjNQMEFqTlRkZXZ6Rzpub2xlbmdyYWR3YXJyaW9ycy1hZG1pbg=="
                // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MzU5Yzc4Yi1hNzQ4LTQzMTMtOGUyNi1kMmMyNTdhYjhkMGUiLCJlbWFpbCI6Imp0a2F6b0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZTc5ZmZiNjNjYWYyMWEwYTQ4NjAiLCJzY29wZWRLZXlTZWNyZXQiOiIzYjU2YzA4MjNkMGIxOTRmMGJjYTQxMDU2ODdkYWRlZjI2ZWEzMWU1NTMxYmI4YTg1NGQwMTNiNWY0Mzc5NTAxIiwiaWF0IjoxNjY2MjAzMTgwfQ.-gPq-5PLmA0v30-Fhf0ASfelqFdIiIDktYbnR0jM68w",
            },
            data : data
        };
        
        await axios(config)
        res.status(200).json({message: `DATA POSTED}`});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.listen(8080, () => {
    console.log('listening on port 8080');
});
