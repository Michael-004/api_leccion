import express from "express";
import trabajadoresRoutes from './routes/trabajadores.routes.js';
import consumoRoutes from './routes/consumo.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
// import { authenticateToken } from "./auth/auth.middleware.js"; // Descomenta si planeas usar autenticación

const app = express();

app.use(express.json());

//rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/trabajadores', trabajadoresRoutes);
app.use('/api/consumos', consumoRoutes);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Página no encontrada'
    });
});

export default app;
