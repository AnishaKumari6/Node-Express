const express=require('express');
const app=express();

const data=[{
  id: 1,
  title: "Learn JavaScript1",
  completed: false
},
{
  id: 2,
  title: "Learn Node.js2",
  completed: false
},
{
  id: 3,
  title: "Learn Express.js3",
  completed: false
}
]
app.get('/todos',(req,res)=>{
    res.json(data);
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}
)
app.get('/todos/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const todo=data.find(item=>item.id===id);
    if(todo){
        res.json(todo);
    }
    else{
        res.status(404).json({message:'Todo not found'});
    }
})
app.post('/todos',(req,res)=>{
    const newTodo={
        id:data.length+1,
        title:req.body.title,
        completed:false
    }
    data.push(newTodo);
    res.status(201).json(newTodo);
}
)
app.put('/todos/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const todo=data.find(item=>item.id===id);
    if(todo){
        todo.title=req.body.title;
        todo.completed=req.body.completed;
        res.json(todo);
    }
    else{
        res.status(404).json({message:'Todo not found'});
    }
})
app.delete('/todos/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const index=data.findIndex(item=>item.id===id);
    if(index!==-1){
        data.splice(index,1);
        res.json({message:'Todo deleted successfully'});
    }
    else{
        res.status(404).json({message:'Todo not found'});
    }   
})
