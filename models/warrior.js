import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const warrior = new mongoose.Schema({
	name: {type: String, require:true, uniqueValidator: true},
	description: String,
    external_url: String,
    image: String,
    attributes: [
        {
            trait_type: "String",
            value: Number
        }
    ]
})

const Warrior = mongoose.model("Warriors", warrior)

export default Warrior;