const Product = require('../models/product')
const ErrorHandler= require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')


 //Create new Product => /api/v1/admin/product/new

exports.newProduct = catchAsyncErrors (async (req,res, next) => {
  
  
  const product = await Product.create(req.body);
 
  res.status(201).json({
    success: true,
    product
  })
})


// Get all products => /api/v1/products
exports.getproducts =catchAsyncErrors (async (req, res, next) => {

   

  const resPerPage = 8; //Showing 8 result per page 
  const productsCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
                                      
       .search()
       .filter()
       let products = await apiFeatures.query;
       let filteredProductCount = products.length;

       apiFeatures.pagination(resPerPage)

   products = await apiFeatures.query;


  res.status(200).json({

    success: true,
    filteredProductCount,
   
    productsCount,
    resPerPage,
    
    products
  })
})

// Get single product detail => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
  {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product
  })
})

// Update Product => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product)
  {
    return next(new ErrorHandler('Product not found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    product
  })
})

//Delte Product => /api/v1/admin/product/:id 

exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
  {
    return next(new ErrorHandler('Product not found', 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'product is deleted'
  })

})