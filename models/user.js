const mongoose = require("mongoose");
//core node.js module to hash the password
const crypto = require("crypto");
//to generate unique strings
const uuidv1 = require("uuvid/v1");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
    },
    history: {
        type: Array,
        default: [],
    }
}, {timestamps: true})

//virtual fields
userSchema.virtual("password")
.set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password;
})

//methods
userSchema.methods = {
    encryptPassword: function(password){
        if(!password) return "";
        try{
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
        }catch (err){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);