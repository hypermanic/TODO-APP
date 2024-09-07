const PORT = process.env.PORT ?? 8000
// const PORT=8000
const express=require("express")
const {v4:uuidv4}=require("uuid")
const cors = require('cors')
const app=express()
const pool=require('./db')

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
     res.send('Hello ')
})

app.get('/todos/:userEmail',async (req,res)=>{
    console.log(req)
    const {userEmail}=req.params
    console.log(userEmail)
    // res.send('Hello ')
    try {
        const todos= await pool.query('SELECT * FROM todos WHERE user_email=$1',[userEmail])      
        res.json(todos.rows)
} catch (error) {
        console.log(error)
    }
})

app.post('/todos', async (req, res) => {
    const {user_email, title, progress, date} = req.body;
    console.log(user_email, title, progress, date);
    const id = uuidv4();
    try {
        // Remove the extra closing parenthesis
        const newTodo = await pool.query(
            `INSERT INTO todos (id, user_email, title, progress, data) VALUES ($1, $2, $3, $4, $5)`, 
            [id, user_email, title, progress, date]
        );
        res.json(newTodo);
    } catch (error) {
        console.error(error);
    }
});

//syntax error get back and see this first
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})