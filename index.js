const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

let todo = []
let workTodo = []

const PORT = process.env.port || 3000
app.get('/',(req,res)=>{
    const date = new Date();
    const options = {
        weekday:'long',
        day:'numeric',
        month:'long'
    }
    const day = date.toLocaleDateString('en-US',options);
     res.render('list',{listTitle:day,newItem:todo});
})
app.get('/work',(req,res) => {
    res.render('list',{listTitle:"work list",newItem:workTodo})
})
app.post('/work',(req,res)=> {
    let item = req.body.task;
    workTodo.push(item);
    res.redirect("/work")
})
app.post('/',(req,res)=>{
    let item = req.body.task;
    if(req.body.list === 'work')
    {
         workTodo.push(item);
         res.redirect('/work');
    }
    else{
        todo.push(item);
        res.redirect('/')
    }
    
})

app.listen(PORT,()=>[
    console.log("running the port ")
]);