const Test = require('../model/Test');

exports.createTest = async (req, res) => {
    try {
        const { userId, email_id, test_name, question_paper_link, code, start_date, duration, total_expected_candidates } = req.body;

        if (!userId || !email_id || !test_name || !question_paper_link || !code || !start_date || !duration || !total_expected_candidates) {
            return res.status(403).json({
                success: false,
                message: "All fields required",
            });
        }

        const test = await Test.create({ userId, email: email_id, test_name, test_link_by_user: question_paper_link, test_code: code, start_Date: start_date, durationHours: duration, no_of_candidates_appear: total_expected_candidates });

        if (!test) {
            return res.status(403).json({
                success: false,
                message: "Test not created",
            });
        }

        console.log(test);

        return res.status(200).json({
            success: true,
            message: "Test created",
            data: test,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


exports.editTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, email_id, test_name, question_paper_link, code, start_date, duration, total_expected_candidates } = req.body;

        const updatedTest = await Test.findByIdAndUpdate(id, {
            userId,
            email: email_id,
            test_name,
            test_link_by_user: question_paper_link,
            test_code: code,
            start_Date: start_date,
            durationHours: duration,
            no_of_candidates_appear: total_expected_candidates
        }, { new: true });

        if (!updatedTest) {
            return res.status(404).json({
                success: false,
                message: "Test not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Test updated",
            data: updatedTest,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.deleteTest = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTest = await Test.findByIdAndDelete(id);

        if (!deletedTest) {
            return res.status(404).json({
                success: false,
                message: "Test not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Test deleted",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
