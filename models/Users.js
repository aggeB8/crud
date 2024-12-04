import mongoose, { Schema } from "mongoose"

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
})

const usersModel = mongoose.model("Users", usersSchema)

export default usersModel
