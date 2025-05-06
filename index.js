import express from "express";

const app = express();

// Rutas
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/a", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});