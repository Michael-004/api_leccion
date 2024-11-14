import { Router } from 'express';
import { getTrabajadores, getTrabajadorById, postTrabajador, putTrabajador, deleteTrabajador } from '../controladores/trabajdoresCtrl.js';

const router = Router();

// Definir rutas CRUD para trabajadores
router.get('/trabajadores', getTrabajadores); // Obtener todos los trabajadores
router.get('/trabajadores/:id', getTrabajadorById); // Obtener un trabajador por ID
router.post('/trabajadores', postTrabajador); // Crear un nuevo trabajador
router.put('/trabajadores/:id', putTrabajador); // Actualizar un trabajador por ID
router.delete('/trabajadores/:id', deleteTrabajador); // Eliminar un trabajador por ID

export default router;
