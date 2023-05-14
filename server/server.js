const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const pool = require("./db");
const http = require("http");
const {Server} = require("socket.io")
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET","POST","DELETE", "PATCH"],
    }
}) 

app.use(express.json());

const PORT = 5000 || process.env.PORT

// Socket IO For updating real time token change
io.on('connection', socket => {
    socket.on('tokenChange', (currentToken)=>{
        console.log(currentToken);
        socket.broadcast.emit("broadcastToken", currentToken)
    })
})



// Routes
// add patient
app.post("/patients", async (req,res) => {
    try {
        const {pname, phone, token} = req.body;
        const newPatient = await pool.query("INSERT INTO patientDetails (name,phone,token) values($1,$2,$3) returning *", [pname,phone,token])
        console.log(req.body)
        res.json(newPatient.rows[0]);
    } catch (error) {
        console.log(error)
    }
})

// get all patients
app.get('/patients', async (req,res)=>{
    try {
        const allPatients = await pool.query("select * from patientDetails")
        res.json(allPatients.rows);
    } catch (error) {
        console.log(error)
    }
})


// get a patient
app.get('/patients/:token', async (req,res)=>{
    try {
        const { token } = req.params;
        const patient = await pool.query("select * from patientDetails where token = $1",[token]);
        res.json("table cleared");
    } catch (error) {
        console.log(error)
    }
})

// clear table
app.delete('/patients',  async (req,res)=>{
    try {
        const patient = await pool.query("delete from patientDetails where 1=1");
        res.json(patient);
    } catch (error) {
        console.log(error)
    }
})

// get current token
app.get('/currentToken', async (req,res)=>{
    try {
        const token = await pool.query("select token from token");
        res.json(token.rows[0]);
    } catch (error) {
        console.log(error)
    }
})

// set current token
app.patch('/currentToken/:token',async (req,res)=>{
    try {
        const { token } = req.params;
        const currToken = await pool.query("update token set token= $1 where type = 'currentToken'", [token]);
        res.json(currToken.rows[0]);
    } catch (error) {
        console.log(error)
    }
})


server.listen(PORT, ()=> console.log("Server running on port : ", PORT));