const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
const engine = require("ejs-mate");

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assets")));
var products;

//api
api();
async function api() {
  const res = await axios.get("https://fakestoreapi.com/products");
  products = res.data;
}

//listening to server
app.listen(3000, () => {
  console.log("Listening to Port 3000");
});

//ist route
app.get("/products", async (req, res, next) => {
  res.render("products/index", { products });
  console.log(products);
});

//second route
app.get("/products/:id", async (req, res, api) => {
  const Productss = await products.find((x) => x.id == req.params.id);
  const Products = products[Productss];
  res.render("products/show", { Productss });
  console.log(Productss);
});
