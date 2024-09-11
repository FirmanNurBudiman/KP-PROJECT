const dbPool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const moment = require('moment-timezone');

const saltRounds = 10;
const jwtSecret = 'SECRET';

const getAllComplaints = () => {
    const SQLQuery = 'SELECT * FROM keluhan';
    return dbPool.execute(SQLQuery);
};

const getComplaintsById = async (id) => {
    const SQLQuery = 'SELECT * FROM keluhan WHERE id = ?';
    const [rows] = await dbPool.execute(SQLQuery, [id]);

    if (rows.length === 0) {
        throw new Error('Data keluhan tidak ditemukan');
    }

    return rows[0];
};

const createComplaints = async (body) => {
    const {
        name,
        tenant,
        phone,
        isikeluhan
    } = body;

    const createAt = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

    const SQLQuery = `INSERT INTO keluhan (name, tenant, phone, isikeluhan, createAt) 
                      VALUES (?, ?, ?, ?, ?)`;
    
    const values = [name, tenant, phone, isikeluhan, createAt];

    try{
        console.log("Executing query:", SQLQuery);
        console.log("Values:", values);
        return dbPool.execute(SQLQuery, values)
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
};

const deleteComplaints = async (id) => {
    // const { id } = id;
    const complaints = await getComplaintsById(id);

    if (id !== id) {
        throw new Error('Anda tidak memiliki izin untuk menghapus data keluhan ini');
    }

    const SQLQuery = `DELETE FROM keluhan WHERE id = ?`;
    const [result] = await dbPool.execute(SQLQuery, [id]);

    if (result.affectedRows === 0) {
        throw new Error('Data keluhan tidak ditemukan');
    }

    return { message: 'Data keluhan berhasil dihapus' };
};

const updateComplaints = (keluhanData) => {
    const SQLQuery = `  UPDATE keluhan 
                        SET name='${keluhanData.name}', tenant='${keluhanData.tenant}', phone='${keluhanData.phone}', isikeluhan='${keluhanData.isikeluhan}'
                        WHERE id=${keluhanData.id}`;

    return dbPool.execute(SQLQuery);
}

// const updateComplain = (tamuData) => {
//     const SQLQuery = `  UPDATE keluhan 
//                         SET name='${tamuData.name}', tenant='${tamuData.tenant}', phone='${tamuData.phone}', isikeluhan='${tamuData.isikeluhan}'
//                         WHERE id=${tamuData.id}`;

//     return dbPool.execute(SQLQuery);
// }

module.exports = {
    getAllComplaints,
    createComplaints,
    deleteComplaints,
    updateComplaints,
    getComplaintsById
};
