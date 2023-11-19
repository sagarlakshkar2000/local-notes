
const express = require('express') //express import 
const connectToMongo = require('./db'); // Database file 
var cors = require('cors')

// const usersSchema = require('./models/User_Module'); //import userschema 
// const morgan = require('morgan'); //import morgan package
const authRoute = require('./routes/auth') //import auth routes
const notesRoute = require('./routes/Notes') //import auth routes

const server = express()
const port = 4000 


server.use(cors())
connectToMongo(); 
server.use(express.json());


// Available Routes
server.use('/api/auth', authRoute.router)
server.use('/api/notes', notesRoute.router)



server.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`)
})


