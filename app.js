// Configurando o servidor para ter acesso às variáveis de ambiente do sistema operacional
require("dotenv").config();
console.log(__dirname + "/.env")

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 4000;

//Importar as configurações do banco de dados (mongoose) e inicializar a conexão:
const db = require("./config/db.config");
db();

// Configurar o CORS (Cross-Origin-Resource-Sharing) para permitir que o nosso cliente React acesse este servidor de um domínio diferente
app.use(cors({ origin: "http://localhost:3000" }));

//Configurar o express p/ entender as requisições contendo JSON no corpo:
app.use(express.json());

// Importa e configura nossas rotas
const roomRouter = require("./routes/room.router");
app.use("/", roomRouter);

const reviewRouter = require("./routes/review.router");
app.use("/", reviewRouter)

const userRouter = require("./routes/user.router");
app.use("/", userRouter);

//Iniciar o servidor para escutar requisições HTTP na porta 4000:
app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
