import express from 'express';
import Warrior from '../models/warrior.js';

//GET USER DATA
export const getWarriorById = async (req, res) => {
    try {
        const data = await Warrior.findOne({name: `Warrior #${req.params.tokenId}`})
        res.status(200).json({message: data})
    } catch(e) {
        res.status(404).json({ message: error.message})  
    }
}

// CREATE NEW WARRIOR
export const createWarriorById = async (req, res) => {
    try {
        const tokenId = req.params.tokenId
        const strength = req.query.strength
        const dexterity = req.query.dexterity
        const charisma = req.query.charisma
        const wisdom = req.query.wisdom
        const house = req.query.house
        const rarity = req.query.rarity
        console.log(req.query)

        const warrior = new Warrior({
            "description": "Fast collection of 256 Viking Warriors preparing for war!", 
            "external_url": `https://battle-for-icy-fjord.netlify.app/ngw/${tokenId}`, 
            "image": `https://gateway.pinata.cloud/ipfs/QmXvu7prPdubtzNLwNzBs8gURxh79GjeX9jQA8PmxjGZtm/${house}${rarity}.png`, 
            "name": `Warrior #${tokenId}`,
            "tokenId": tokenId,
            "attributes": [
                {
                    trait_type: "tokenId",
                    value:  tokenId
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
        res.status(200).json({message: warrior})
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}

// UPDATE WARRIOR DATA
export const updateWarriorById = async (req, res) => {
    try {
        let warrior = await Warrior.findOneAndUpdate(
            {tokenId: req.params.tokenId},
            {name: req.body.newName}
        )
        res.status(200).json({message: warrior})
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}