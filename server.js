const express = require('express')
const app = express()
const htmlRoutes = require("./routes/htmlRoutes.js");
const apiRoutes = require('./routes/apiRoutes.js')

require('dotenv').config()
const PORT = process.env.PORT || 3001




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use('/api', apiRoutes)

app.use('/', htmlRoutes);




app.listen(PORT,()=>{
    console.log(`Server is listening in PORT http://localhost:${PORT} = `)
})


















