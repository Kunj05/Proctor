const express = require("express");
const userRoute = require("./routes/user");
const app = express();
const database = require("./config/db");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const testRoute=require("./routes/Test")
const codeRoute=require("./routes/Code.js")

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieparser());

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/test",testRoute);
app.use("/api/v1",codeRoute);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running ..",
    });
});

app.listen(PORT,()=>{
    console.log(`\nApp is listening at http://localhost:${PORT}`);
})
