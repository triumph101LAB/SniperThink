const express = require("express")
const cors = require("cors")
const PORT = process.env.PORT || 4000
const app = express()

app.use(cors({
    https://sniper-think-project.vercel.app/
}))
app.use(express.json())
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
app.get('/', (req,res) =>{
    res.json({status:"API is running"})
})
app.post('/api/interested', (req,res)=>{

    const {name, email, step} = req.body
    if(!name || !email || !step){
        return res.status(400).json({success:false, message:"All fields must not be empty"})
    }

   if (!emailRegex.test(email)) {
         return res.status(400).json({ success: false, message: "Invalid email format." });
    }
    console.log(`New interest : ${name}, ${email}, ${step}`)
   // res.send('We have gotten your details and we would get back to you')
    res.status(200).json({success:true, message:`Name: ${name}, Email: ${email}, Step: ${step}`})
})


app.listen(PORT, () =>{
    console.log(`This server is running on PORT ${PORT}`)
})
