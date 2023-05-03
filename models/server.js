const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.productsPath = "/api/products";
    this.port = process.env.PORT || 3000;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.productsPath, require("../routes/products.routes"));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("Running on port ", this.port);
    });
  }
}

module.exports = Server;
