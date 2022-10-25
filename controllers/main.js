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

export const createWarriorById = async (req, res) => {
    try {
        const warrior = new Warrior({
            "description": "Fast collection of 222 Viking Warriors preparing for war!", 
            "external_url": `https://battle-for-icy-fjord.netlify.app/ngw/${req.params.tokenId}`, 
            "image": "https://gateway.pinata.cloud/ipfs/QmNQ4q9AK2ynqqiRjpmWoaVFSnb9hBXN5PbLfKzmtjAJ12/elf.png", 
            "name": `Warrior #${req.params.tokenId}`,
            "attributes": [
                {
                    trait_type: "tokenId",
                    value:  req.params.tokenId
                },
                {
                    trait_type: "Strength",
                    value:  req.params.strength
                },
                {
                    trait_type: "Dexterity",
                    value:  req.params.dexterity
                },
                {
                    trait_type: "Charisma",
                    value:  req.params.charisma
                },
                {
                    trait_type: "Wisdom",
                    value:  req.params.wisdom
                },
                {
                    trait_type: "House",
                    value:  req.params.house
                },
                {
                    trait_type: "Rarity",
                    value:  req.params.rarity
                }
            ]})
            await warrior.save()
            res.status(200).json({message: warrior})
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}