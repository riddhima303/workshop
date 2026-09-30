const fs=require('fs');
const express=require('express');
const app=express();
app.get('/products',(req,res)=>{
    fs.readFile('./c.json',(err,data)=>{
        if(err){
            res.status(500).send('Error');
            return
        }
        const products=JSON.parse(data);
        res.send(products);
    })
})
app.get('/products/:id',(req,res)=>{
    const id=req.params.id;
    fs.readFile('./c.json',(err,data)=>{
         if(err){
            res.status(500).send('Error');
            return
        }
        const products=JSON.parse(data);
        const product=products.find(p=>p.id==id);
        if(!product){
            res.status(404).send('product not found')
            return
        }
        res.send(product);
    })
    })



app.listen(3000,()=>{
    console.log('server is running on port 3000');
})