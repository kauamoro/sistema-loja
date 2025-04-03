import express from 'express';
import { router as clienteRouter } from './routes/cliente.routes';
import { router as produtoRouter } from './routes/produto.routes';

const app = express();

// Middleware para JSON
app.use(express.json());

// Usar as rotas de cliente
app.use('/clientes', clienteRouter);
app.use('/produtos', produtoRouter);

// Definir a porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
