const express = require('express');
const cors = require('cors');

const port=process.env.PORT || 3000

const app=express();
app.use(cors());
app.use(express.static("pages"))

app.get("/",function(req,resp){
	resp.send("hello")
})
app.listen(port, () => {
	console.log('listening'+port.toString())
})