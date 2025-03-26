import express, { Request, Response, NextFunction } from 'express';
import { router as clienteRoutes } from './routes/cliente.routes'; // Supondo que a rota esteja em 'routes/cliente.routes'

const app = express();

app.use(express.json());

// Registrando as rotas
app.use('/clientes', clienteRoutes);

// Middleware de erro
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
