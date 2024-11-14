import { conmysql } from '../db.js';

// Obtener todos los consumos
export const getConsumo = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM tb_consumo');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los consumos' });
    }
};

// Crear un nuevo consumo
export const createConsumo = async (req, res) => {
    const { med_id, mes, anio, consumo, longitudToma, latitudToma } = req.body;
    try {
        const [result] = await conmysql.query('INSERT INTO tb_consumo (med_id, mes, anio, consumo, longitudToma, latitudToma) VALUES (?, ?, ?, ?, ?, ?)', [med_id, mes, anio, consumo, longitudToma, latitudToma]);
        res.status(201).json({ id: result.insertId, med_id, mes, anio, consumo, longitudToma, latitudToma });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el consumo' });
    }
};

// Actualizar un consumo
export const updateConsumo = async (req, res) => {
    const { id } = req.params;
    const { med_id, mes, anio, consumo, longitudToma, latitudToma } = req.body;
    try {
        const [result] = await conmysql.query('UPDATE tb_consumo SET med_id = ?, mes = ?, anio = ?, consumo = ?, longitudToma = ?, latitudToma = ? WHERE con_id = ?', [med_id, mes, anio, consumo, longitudToma, latitudToma, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Consumo no encontrado' });
        }
        res.json({ message: 'Consumo actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el consumo' });
    }
};

// Eliminar un consumo
export const deleteConsumo = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await conmysql.query('DELETE FROM tb_consumo WHERE con_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Consumo no encontrado' });
        }
        res.json({ message: 'Consumo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el consumo' });
    }
};
