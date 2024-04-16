const Test=require('../model/Test')

const validateCode=async(req,res)=>{
    const code = req.query.code;

    try {
        const user = await Test.findOne({ code });

        if (user) {
            res.status(200).json({ message: 'Code is valid' });
        } else {
            res.status(404).json({ message: 'Invalid code' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports={validateCode}