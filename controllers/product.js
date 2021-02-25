const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const Product = require("../models/product")
const {errorHandler} = require("../helpers/dbErrorHandler")


exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: "Product not found!!"
            })
        }
        req.product = product;
        next();
    })
}

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}

exports.create = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded!!"
            })
        }

        // validation check for all fields
        const { name, description, price, category, quantity, shipping } = fields
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "All product fields are required!!"
            })
        }

        const product = new Product(fields)

        if(files.photo){
            // validation check for image size
            // 1kb = 1000
            // 1mb = 100000
            if(files.photo.size > 100000){
                return res.status(400).json({
                    error: "Image size should not be greater then 1mb... Please try again!!"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    err: errorHandler(err)
                })
            }
            res.json({
                result
            })
        })
    })
}