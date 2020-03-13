const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    username:{type: String, required:true, unique: true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required: true},
    registrationDate:{type: Date},
    select:{type:Boolean, default:false},
    users:[{type: Types.ObjectId}]
})

module.exports = model('User', schema)