# EcoExplorers - Backend

Este é o **backend** do projeto **EcoExplorers**, uma plataforma gamificada para educação ambiental.  
O backend será responsável por fornecer a lógica do sistema, APIs e integração com o frontend provido pelo repositório original.

---

## 📌 Funcionalidades

- Registro e login de usuários com roles diferentes:
  - **Aluno**
  - **Professor**
  - **Responsável**
  - **Escola**
- Geração de **JWT** para autenticação.
- Estrutura preparada para testes unitários usando **Jest** e **Supertest**.
- API pronta para integração com o frontend React.
- Login social via **Google** utilizando Google Identity Services.

---

## ⚡ Tecnologias Utilizadas

- Node.js  
- Express  
- bcryptjs  
- jsonwebtoken  
- dotenv  
- supertest (para testes unitários)  
- jest (para testes unitários)  

---

## 🔗 Integração com Frontend

O backend deve ser executado na porta definida no `.env` (ou pipeline), e o frontend React se comunica com ele via **requisições HTTP** para:

- `POST /api/auth/register` → registro de usuários  
- `POST /api/auth/login` → login de usuários  
- `POST /api/auth/google` → login social via token retornado pelo Google  

> O frontend original do projeto foi fornecido para integração com backend desenvolvido. Todos os créditos ao time responsável pelo frontend.

---

## 📦 Como Rodar Localmente

1. Clone este repositório:  
```bash
git clone https://github.com/IntenseGP-ESGTech/ECOEXPLORES-Squad-1-backend
cd backend
```
2. Instale as dependências:
```
npm install
```
3. Copie `backend/.env.example` para `backend/.env` e ajuste as variáveis:
```
JWT_SECRET=uma_chave_secreta_para_teste
PORT=4000
CORS_ORIGIN=http://localhost:5173
GOOGLE_CLIENT_ID=seu_client_id_do_google_cloud
```
> Para gerar a JWT_SECRET pode utilizar o Node.js ```node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"```

4. Rode o backend:
```
npm run dev
```

5. Copie `frontend/.env.example` para `frontend/.env` e ajuste as variáveis:
```
VITE_API_URL=http://localhost:4000/api
VITE_GOOGLE_CLIENT_ID=seu_client_id_do_google_cloud
```

> Use o mesmo `client_id` gerado no Google Cloud Console tanto no backend quanto no frontend.
5. Para rodas os testes unitários:
```
npm test
```

| Nome                | GitHub                                                             | Período     | Tipo de Projetos |
|---------------------|--------------------------------------------------------------------|-------------|------------------|
| Victor Simas        | [@victorsimasdev](https://github.com/victorsimasdev)               | 3º período  | Grupo            |
| Julio Bezerra       | [@Juliobzr](https://github.com/Juliobzr)                           | 3º período  | Grupo            |
| Paulo Henrique Alves de Barros Pereira       | [@phabp](https://github.com/phabp)                 | 3º período  | Grupo            |
| Luiz henrique da silva neves    | [@luiz380](https://github.com/)             | 3º período  | Grupo            |
| Leonardo Felipe Demétrio Lins Nascimento       | [@](https://github.com/)                 | 3º período  | Grupo            |
| Francisco Italo Machado Dantas    | [@](https://github.com/)             | 3º período  | Grupo            |

## Créditos
O frontend foi provido pelo [repositório original](https://github.com/IntenseGP-ESGTech/ECOEXPLORES---Squad-1) de outro projeto sobre o EcoExplorers, e o backend está sendo desenvolvido para integrar e complementar a plataforma.
