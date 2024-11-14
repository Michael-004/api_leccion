import { conmysql } from '../db.js'

// Obtener todos los trabajadores
export const getTrabajadores = (req, res) => {
    const sql = 'SELECT * FROM tb_trabajador';
    conmysql.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener trabajadores', details: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener un trabajador por su cédula
export const getTrabajadorById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM tb_trabajador WHERE tra_cedula = ?';
    conmysql.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el trabajador', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Trabajador no encontrado' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear un nuevo trabajador
export const postTrabajador = (req, res) => {
    const { tra_cedula, tra_nombres, tra_apellidos, tra_estado } = req.body;
    const sql = 'INSERT INTO tb_trabajador (tra_cedula, tra_nombres, tra_apellidos, tra_estado) VALUES (?, ?, ?, ?)';
    const values = [tra_cedula, tra_nombres, tra_apellidos, tra_estado];
    conmysql.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear el trabajador', details: err.message });
        }
        res.status(201).json({ message: 'Trabajador creado con éxito', trabajadorId: results.insertId });
    });
};

// Actualizar un trabajador por su cédula
export const putTrabajador = (req, res) => {
    const { id } = req.params;
    const { tra_nombres, tra_apellidos, tra_estado } = req.body;
    const sql = 'UPDATE tb_trabajador SET tra_nombres = ?, tra_apellidos = ?, tra_estado = ? WHERE tra_cedula = ?';
    const values = [tra_nombres, tra_apellidos, tra_estado, id];
    conmysql.query(sql, values, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el trabajador', details: err.message });
        }
        res.status(200).json({ message: 'Trabajador actualizado con éxito' });
    });
};

//eliminar un trabajador por cedula 
export const deleteTrabajador = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tb_trabajador WHERE tra_cedula = ?';
    conmysql.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el trabajador', details: err.message });
        }
        res.status(200).json({ message: 'Trabajador eliminado con éxito' });
    });
};
