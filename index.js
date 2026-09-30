const fs=require('fs/promises');

const express=require('express');
const { rejects } = require('assert');
const { get } = require('http');
const { readFile } = require('fs');
const app=express();
async function getProducts() {
    try {
        const data = await fs.readFile('./c.json');
        return JSON.parse(data);
    } catch (err) {
        throw new Error('Error reading products');
    }
}
async function readfilewithdelay(){
    await new Promise((resolve,rejects) => setTimeout(resolve, 1500));
    let product =await getProducts();
    return product;
}
app.get('/products',async (req,res)=>{
    try {
        let key=req.url
        let value=caches[key]
        if(value){
            return res.json(value);
            
        }
        const products = await readfilewithdelay();
        caches[key]=products; 
        return res.json(products);
    } catch (err) {
        console.log(err);
    }
});

app.get('/products/:id',async (req,res)=>{
    const id=req.params.id;
    try {
        const products = await readfilewithdelay();
        const product = products.find(p=>p.id==id);
        if(!product){
            res.status(404).send('product not found')
            return
        }
        res.send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// app.get('/products/:id',(req,res)=>{
//     const id=req.params.id;
//     fs.readFile('./c.json',(err,data)=>{
//          if(err){
//             res.status(500).send('Error');
//             return
//         }
//         const products=JSON.parse(data);
//         const product=products.find(p=>p.id==id);
//         if(!product){
//             res.status(404).send('product not found')
//             return
//         }
//         res.send(product);
//     })
//     })

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})