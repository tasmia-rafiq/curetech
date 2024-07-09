const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require('./Schemas/UserDetails');
require('./Schemas/UserPersonalInfo');
const jwt = require("jsonwebtoken");
app.use(express.json());

require('dotenv').config();

const User = mongoose.model("UserInfo");
const UserPersonalInfo = mongoose.model("UserPersonalInfo");

const mongoURL = process.env.MONGO_URL;

const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(mongoURL).then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.log("No database connected", e);
});

app.get("/", (req, res) => {
    res.send({ status: "Started" })
});

//registration api
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.send({ data: "User already exists!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            name: name,
            email: email,
            password: encryptedPassword,
            loginAttempts: 0,
        });
        res.send({ status: "ok", data: "User Created!!" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
});

//login api
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
        return res.send({ data: "User doesn't exist!" });
    }

    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

        oldUser.loginAttempts += 1;
        await oldUser.save();
        console.log('Login Attempts', oldUser.loginAttempts);

        if (res.status(201)) {
            return res.send({ status: "ok", data: token });
        } else {
            return res.send({ error: "error" });
        }
    }
});

// get user data
app.post('/userdata', async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;

        User.findOne({ email: userEmail })
            .then(data => {
                return res.send({ status: "ok", data: data });
            });
    } catch (error) {
        return res.send({ error: error });
    }
});

// user Information submission
app.post('/submitpersonalinfo', async (req, res) => {
    const { gender, age, weight, height, activityLevel, token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;

        const userInfo = await User.findOne({ email: userEmail });

        if (userInfo) {
            const userPersonalInfo = new UserPersonalInfo({
                user: userInfo._id,
                gender: gender,
                age: age,
                weight: weight,
                height: height,
                activityLevel: activityLevel,
            });
            await userPersonalInfo.save();

            return res.send({ status: "ok", data: "User Personal information submitted successfully!" });
        } else {
            return res.status(404).send({ error: "User not found!" });
        }
    } catch (error) {
        console.error("Error submitting user personal information:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
});

// get user personal data
app.post('/userpersonaldata', async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;

        const userInfo = await User.findOne({ email: userEmail });

        if (userInfo) {
            const userPersonalInfo = await UserPersonalInfo.findOne({ user: userInfo._id });
            if (userPersonalInfo) {
                return res.send({ status: "ok", data: userPersonalInfo });
            } else {
                return res.status(404).send({ error: "Personal information not found!" });
            }
        } else {
            return res.status(404).send({ error: "User not found!" });
        }
    } catch (error) {
        return res.send({ error: error });
    }
});


// defining port
app.listen(5001, () => {
    console.log("Node js server has been started!");
});