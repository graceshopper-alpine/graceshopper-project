const router = require('express').Router();
const { urlencoded } = require('express');
const { models } = require('../db');
const { Product, User} = models;

// Middleware to authenticate users based on token in request headers
async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const user = await User.findByToken(token);
      req.user = user;
    } catch (error) {
      console.log(error);
    }
  }
  next();
}

// Middleware to restrict access to admin users only
function adminOnly(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
}

router.use(authenticateUser);

//POST route new product
router.post('products/addproduct', adminOnly, async (req, res, next) => {
    try{
        //get fields from request body

        const prodName = req.body.name;
        const prodPrice = req.body.price;
        const prodImage_url = req.body.image_url;
        const prodDescription = req.body.description;
        const prodCategory = req.body.category;
        const prodQuantity = req.body.quantity;


        //check if product already exists
        let product = await Product.findOne({where: {prodName}});

        //if it does not, create product
        if (!product) {
            product = await Product.create({
                name: prodName,
                price: prodPrice,
                image_url: prodImage_url,
                description: prodDescription,
                category: prodCategory,
                quantity: prodQuantity,
            })
        }

    res.status(200).json(product)
    }

    catch (err){
        next(err)
    }
})

router.put('products/:id/updateproducts', adminOnly, async (req, res, next) => {
    try {
        const prodId = req.params.id;

        //info from submitted form
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newImg = req.body.image_url;
        const newDescription = req.body.description;
        const newCategory = req.body.category;
        const newQuant = req.body.quantity;

        //find the product to edit
        const editProd = await Product.findOne({where: {prodId}})

        //if the field is not an empty string and different than existing field, change them
        if (newName !== "" && editProd.name !== newName) {
            editProd.name = newName
        }

        if (newPrice !== "" && editProd.price !== newPrice) {
            editProd.price = newPrice
        } 
        
        if (newImg !== "" && editProd.image_url !== newImg) {
            editProd.image_url = newImg
        } 
        
        if (newDescription !== "" && editProd.description !== newDescription) {
            editProd.description = newDescription
        } 
        
        if (newCategory !== "" && editProd.category !== newCategory) {
            editProd.category = newCategory
        } 
        
        if (newQuant !== "" && editProd.quantity !== newQuant) {
            editProd.quantity = newQuant
        }
    
    res.status(200).json(editProd);

    } catch(err) {
        next(err)
    }
})

router.delete('products/:id/deleteproduct', adminOnly, async (req, res, next) => {
    try{
        //get id of product to delete
        const prodId = req.params.id;

        //find that product
        const delProd = await Product.findOne({where: prodId})

        //if product exists then destroy, else 404
        if(delProd) {
            await Product.destroy();
            res.status(204).end();
        } else {
            res.status(404).send("Item not found.")
        }
    
    } catch(err) {
        next(err)
    }
})