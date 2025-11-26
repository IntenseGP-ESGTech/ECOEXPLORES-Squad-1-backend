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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Trilha: {
          type: "object",
          required: [
            "codigoTrilha",
            "nomeTrilha",
            "descricaoTrilha",
            "publicoAlvo",
            "status",
            "nomeCriador",
          ],
          properties: {
            codigoTrilha: {
              type: "string",
              example: "TRL-E01",
            },
            nomeTrilha: {
              type: "string",
              example: "Aventura Sustentável I",
            },
            descricaoTrilha: {
              type: "string",
              example:
                "Percurso introdutório sobre sustentabilidade para alunos do fundamental II.",
            },
            publicoAlvo: {
              type: "string",
              example: "Fundamental II",
            },
            status: {
              type: "string",
              enum: ["rascunho", "publicada"],
              example: "rascunho",
            },
            nomeCriador: {
              type: "string",
              example: "professor-123",
            },
            conteudo: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  titulo: { type: "string", example: "Módulo 1" },
                  descricao: {
                    type: "string",
                    example: "Introdução aos ODS",
                  },
                  atividades: {
                    type: "string",
                    example: "Pesquisa guiada com cartazes",
                  },
                  recursos: {
                    type: "string",
                    example: "Links para vídeos e planilhas",
                  },
                  recompensas: {
                    type: "string",
                    example: "Moedas verdes e crachás",
                  },
                },
              },
            },
          },
        },
      },
    },
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
