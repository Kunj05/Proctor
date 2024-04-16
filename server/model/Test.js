const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email_id: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    test_name: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 20
    },
    question_paper_link: {
        type: String,
        required: true,
        unique: true
    },
    test_code: {
        type: Number,
        unique: true,
        default: "none"
    },
    start_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    duration: {
        type: Number,
        required: true,
        default: 0
    },
    total_expected_candidates: {
        type: Number,
        required: true
    },
    total_threshold_warnings: {
        type: Number,
        required: true,
        default: 3
    }
}, { timestamps: true });
