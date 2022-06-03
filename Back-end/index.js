const express = require("express");
require("./database/config");
const users = require("./database/users");
const Products = require("./database/products");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-commerce";
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({
        result
    }, jwtKey, (err, token) => {
        if (err) {
            res.send({
                result: "Something Went Wrong"
            });
        }
        res.send({
            result,
            auth: token
        });
    });
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await users.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({
                user
            }, jwtKey, (err, token) => {
                if (err) {
                    res.send({
                        result: "Something Went Wrong"
                    });
                }
                res.send({
                    user,
                    auth: token
                });
            });
        } else {
            res.send({
                result: "No User Found"
            });
        }
    } else {
        res.send({
            result: "No Usersss Found"
        });
    }
});

app.post("/addProduct", async (req, res) => {
    let product = new Products(req.body);
    let result = await product.save();
    res.send(result);
});

app.get("/products", async (req, res) => {
    let product = await Products.find();
    if (product.length > 0) {
        res.send(product);
    } else {
        res.send({
            result: "No Product Found"
        });
    }
});

app.delete("/product/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await Products.deleteOne({
        _id: req.params.id
    });
    res.send(result);
});

app.get("/update/:id", async (req, res) => {
    let result = await Products.findOne({
        _id: req.params.id
    });
    if (result) {
        res.send(result);
    } else {
        res.send({
            result: "No Result Found"
        });
    }
});

app.put("/update/:id", async (req, res) => {
    let result = await Products.updateOne({
        _id: req.params.id
    }, {
        $set: req.body,
    });
    res.send(result);
});

app.get("/search/:key", async (req, res) => {
    let result = await Products.find({
        $or: [{
            name: {
                $regex: req.params.key
            }
        }],
    });
    res.send(result);
});

app.listen(5000);