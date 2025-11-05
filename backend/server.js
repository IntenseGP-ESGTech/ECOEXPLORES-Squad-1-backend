const express = require("express");
const app = express();
const swaggerDocs = require("./swagger");

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

swaggerDocs(app);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
