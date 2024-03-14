const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    loginAttempts: { type: Number, default: 0 }
}, {
    collection: "UserInfo"
});

mongoose.model("UserInfo", UserDetailsSchema);