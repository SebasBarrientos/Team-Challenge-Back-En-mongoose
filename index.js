const express = require("express");
const { dbConnection } = require("./config/config");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

dbConnection();

app.use(express.json());

app.use("/tasks", require("./routes/tasks"));
app.use("/users", require("./routes/users"));



app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));

module.exports = app