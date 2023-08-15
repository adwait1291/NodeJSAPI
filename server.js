const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/ProductModel')
const app = express()

app.use(express.json())

//routes
app.get('/', (req, res) => {res.send("Hello Duniya")})

app.get('/blog', (req, res) => {res.send("Hello Duniya, My name is Adwait")})

//get all products
app.get('/products', async (req, res) => {
    try{
        const products = await Product.find({ });
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

//get a single produc
app.get('/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }
    catch(error){

        res.status(500).json({message: error.message});
    }
})

//add a product
app.post('/product', async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});

    }
})

//update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //we cannot find any product in database
        if (!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//delete a product
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //we cannot find any product in database
        if (!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }

})


mongoose.connect('mongodb+srv://adwait1291:ABCD123456@nodejs-api.r1hxfzi.mongodb.net/NodeJS-API?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, ()=>{console.log("Node API is running at port 3000")})
    console.log("Connected to MongoDB")
    }).catch(error=>{console.log(error)})
