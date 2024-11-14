import { conmysql } from '../db.js'; // Asegúrate de que la conexión a tu base de datos esté bien configurada

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    try {
        const [rows] = await conmysql.query('SELECT * FROM tb_cliente');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error});
    }
};

// Obtener un cliente por ID
export const getclientesxid = async (req, res) => {
    try {
        const id = req.params;
        const [rows] = await conmysql.query('SELECT * FROM tb_cliente WHERE cli_cedula = ?', [id]);
        
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente', error});
    }
};
export const postCliente = async (req, res) => {
    try {
        const {cli_cedula, cli_nombres, cli_apellidos, cli_estado}= req.body;
        const result = await conmysql.query(
            'INSERT INTO tb_cliente (cli_cedula, cli_nombres, cli_apellidos, cli_estado) VALUES (?, ?, ?, ?)',
            [cli_cedula, cli_nombres, cli_apellidos, cli_estado]
        );
        res.status(201).json({ message: 'Cliente creado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente', error });
    }
};

export const putCliente = async (req, res) => {
    try {
        const id= req.params;
        const { cli_nombres, cli_apellidos, cli_estado } = req.body;
        const result = await conmysql.query(
            'UPDATE tb_cliente SET cli_nombres = ?, cli_apellidos = ?, cli_estado = ? WHERE cli_cedula = ?',
            [cli_nombres, cli_apellidos, cli_estado, id]
        );
        
        if (result.affectedRows > 0) {
            res.json({ message: 'Cliente actualizado' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente', error });
    }
};

// Actualizar un campo específico (PATCH)
export const patchCliente = async (req, res) => {
    try {
        const id = req.params;
        const fields = req.body;

        const updates = Object.keys(fields).map(field => `${field} = ?`).join(', ');
        const values = Object.values(fields);
        values.push(id);

        const result = await conmysql.query(
            `UPDATE tb_cliente SET ${updates} WHERE cli_cedula = ?`,
            values
        );

        if (result.affectedRows > 0) {
            res.json({ message: 'Cliente actualizado parcialmente' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar parcialmente el cliente', error });
    }
};

// Eliminar un cliente
export const deleteCliente= async (req, res) => {
    try {
        const id = req.params;
        const result = await conmysql.query('DELETE FROM tb_cliente WHERE cli_cedula = ?', [id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Cliente eliminado' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error });
    }
};
