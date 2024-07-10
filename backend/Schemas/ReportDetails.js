const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportDetailsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserInfo",
        required: true
    },
    prediction: {
        type: Number,
        required: true
    },
    data: {
        type: Schema.Types.Mixed,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "ReportDetails"
});

mongoose.model("ReportDetails", ReportDetailsSchema);
