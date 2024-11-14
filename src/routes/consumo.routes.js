import express from 'express';
import { getConsumo, createConsumo, updateConsumo, deleteConsumo } from '../controladores/consumoCtrl.js'; // Asegúrate de tener estos métodos en tu controlador

const router = express.Router();

// Definir rutas de consumo
router.get('/', getConsumo); // Ruta para obtener todos los consumos
router.post('/', createConsumo); // Ruta para crear un nuevo consumo
router.put('/:id', updateConsumo); // Ruta para actualizar un consumo específico
router.delete('/:id', deleteConsumo); // Ruta para eliminar un consumo específico

export default router;
