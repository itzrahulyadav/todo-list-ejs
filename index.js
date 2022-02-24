const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/todoListDB');

const itemSchema = {
    name:String
}
const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
    name:"Welcome to the todolist"
});

const item2 = new Item({
    name:"Hit the enter button to add todo"
})

const item3 = new Item({
    name:"Hello there ,Nice to meet you"
})

const defaultItems = [item1,item2,item3];

// Item.insertMany(defaultItems,(err)=>{
//     if(err)console.log(err);
//     else console.log("success");
// })


let workTodo = []


const PORT = process.env.port || 3000
app.get('/',(req,res)=>{
    Item.find({},(err,foundItems)=>{
        if(foundItems.length == 0)
        {
            Item.insertMany(defaultItems,(err)=>{
                if(err)console.log(err)
                else console.log("Items successfully added to the database")
            });
            res.redirect("/");
        }
        else
        {
            res.render('list', { listTitle: "Today", newItem: foundItems });
        }
    })
    
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
    let itemName = req.body.task;

     const item = new Item({
         name:itemName
     })

     item.save();
     res.redirect("/");

    //previously used code without mongodb
    // if(req.body.list === 'work')
    // {
    //      workTodo.push(item);
    //      res.redirect('/work');
    // }
    // else{
    //     todo.push(item);
    //     res.redirect('/')
    // }
    
})

app.listen(PORT,()=>[
    console.log("running the port ")
]);