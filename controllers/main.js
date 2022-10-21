import express from 'express';

const router = express.Router();

//GET USER DATA
export const getRecentTokenId = async (req, res) => {
    console.log(req.query)
    try {
        res.status(200).json({message: "YEPPP"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}