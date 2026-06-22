const express = require("express");
const app = express();
const mongoose = require("mongoose");

const item = require("./models/item");

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const itemRoutes = require('./routes/itemsRoutes')


mongoose
  .connect("mongodb://localhost:27017/mvc")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("err in db connection");
  });


app.get("/", async (req, res, next) => {
  try {
    const items = await item.find({});
    res.render("index", { items });
  } catch (error) {
    next(error);
  }
});

app.post("/items", async (req, res, next) => {
  try {
    console.log(req.body, 32);
    const newItem = new item(req.body);
    await newItem.save();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});
app.get("/items/update/:id", async (req, res, next) => {
  try {
    const dbitem = await item.findById(req.params.id).lean();
    console.log(dbitem);
    res.render("edit", { item: dbitem });
  } catch (error) {
    next(error);
  }
});

app.post('/items/update/:id', async(req, res, next) => {
    try {
        await item.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/");
    } catch (error) {
        next(error)
    }
});

app.post('/items/delete/:id', async(req, res, next) => {
    try {
        await item.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (error) {
        next(error)
    }
})

app.use(itemRoutes);


app.use((err, req, res, next) => {
  res.status(500).json({
    status: false,
    message: err.message ?? "internal server error",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
