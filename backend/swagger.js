const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API EcoExplores - Backend",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
      contact: {
        name: "EcoExplores",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
        description: "Servidor de desenvolvimento",
      },
    ],
  },
  apis: [
    path.join(__dirname, "src/routes/*.js"),
    path.join(__dirname, "src/controllers/*.js"),
  ],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  const PORT = process.env.PORT || 4000;
  console.log(`✅ Swagger Docs disponível em: http://localhost:${PORT}/api-docs`);
}

module.exports = swaggerDocs;
