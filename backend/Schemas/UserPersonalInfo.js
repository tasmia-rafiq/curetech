const mongoose = require("mongoose");

const UserPersonalInfoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo" },
    gender: String,
    age: Number,
    weight: Number,
    height: Number,
}, {
    collection: "UserPersonalInfo"
});

mongoose.model("UserPersonalInfo", UserPersonalInfoSchema);