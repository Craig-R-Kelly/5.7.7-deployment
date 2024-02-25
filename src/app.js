const express = require("express");
const urlsRouter = require('./urls/urls.router');//import my routers
const usesRouter = require('./uses/uses.router');

const app = express();

app.use(express.json());

app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

// catch-all middleware for when no route matches requested path
app.use((req, res, next) => {
  return res.status(404).json({ error: `Not found: ${req.originalUrl}`});
});

// global error handling middleware for errors happening during handling of requests
app.use((req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error; // defaults if none provided
  res.status(status).json({ error: message }); // sends error status and message
})

module.exports = app;