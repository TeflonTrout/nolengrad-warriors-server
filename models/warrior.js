import mongoose from "mongoose";

const traits = new mongoose.Schema({
    trait_type: String,
    value: Number
})

// DEFINING WARRIOR SCHEMA
const warrior = new mongoose.Schema({
	name: {type: String, require:true, uniqueValidator: true},
	description: String,
    external_url: String,
    image: String,
    tokenId: Number,
    attributes: {
        type: [traits],
        validate: {
            validator: function(attributes) {
                return attributes.length == 7
            },
            message: props => `${props.value} does not contain 7 traits.`
        }
    },
})

const Warrior = mongoose.model("Warriors", warrior)

export default Warrior;