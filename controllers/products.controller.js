const { response, request } = require("express");
const { readFile, writeFile } = require("fs/promises");

async function fetchData() {
  const data = await readFile("./database/db.json", { encoding: "utf-8" });
  return JSON.parse(data);
}

async function searchProduct(id) {
  const { products } = await fetchData();
  const product = products.find((e) => e.id === id);
  return product;
}

async function setNewProduct(title, description, price) {
  const data = await fetchData();
  const id = data.products.at(-1).id + 1;
  const newProduct = { id, title, description, price };
  data.products.push(newProduct);
  await writeFile("./database/db.json", JSON.stringify(data));
}

const GETProducts = async (req = request, res = response) => {
  const { products } = await fetchData();
  res.status(200).json(products);
};

const GETProductByID = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await searchProduct(parseInt(id));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      error: "El producto no existe",
    });
  }
};

const POSTProducts = async (req = request, res = response) => {
  const { title, description = "No description", price = 1 } = req.body;
  await setNewProduct(title, description, price);

  res.status(200).json({
    type: "POST request from products controller",
    title,
    description,
    price,
  });
};

const PATCHProducts = (req = request, res = response) => {
  res.status(200).json({
    type: "Patch request from products controller",
  });
};

const DELETEProducts = (req = request, res = response) => {
  res.status(200).json({
    type: "Delete request from products controller",
  });
};

module.exports = {
  GETProducts,
  GETProductByID,
  POSTProducts,
  PATCHProducts,
  DELETEProducts,
};
