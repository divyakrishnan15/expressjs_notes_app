const express = require('express')
const app = express()
const notesRoutes = require("./routes/notesRoutes");
// const apiRoutes = require("./routes/apiRoutes");
// const api = require('./routes/')
// const path = require('path')
// const dbData = require('./db/db.json')
// const fs = require('fs')
// const uuid = require('./helpers/uuid');

require('dotenv').config()
const PORT = process.env.PORT || 2001

require("./routes/apiRoutes")(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/',notesRoutes)
// app.use('/api',apiRoutes)

app.listen(PORT,()=>{
    console.log(`Server is listening in PORT http://localhost/${PORT} = `)
})




















// http://localhost:3001/   === home page
// http://localhost:3001/notes.html  === notes page

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/public/index.html'))
// })