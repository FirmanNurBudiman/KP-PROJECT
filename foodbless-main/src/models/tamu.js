const dbPool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const moment = require('moment-timezone');

const saltRounds = 10;
const jwtSecret = 'SECRET';

const getAllTamu = () => {
    const SQLQuery = 'SELECT * FROM guest';
    return dbPool.execute(SQLQuery);
};

const getTamuById = async (id) => {
    const SQLQuery = 'SELECT * FROM guest WHERE id = ?';
    const [rows] = await dbPool.execute(SQLQuery, [id]);

    if (rows.length === 0) {
        throw new Error('Data tamu tidak ditemukan');
    }

    return rows[0];
};

const createTamu = async (body) => {
    const {
        id,
        nama,
        telepon,
        keperluan,
        dituju
    } = body;

    const tamuId = nanoid(16);
    const waktu = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

    const SQLQuery = `INSERT INTO guest (id, nama, telepon, keperluan, tujuan, waktu) 
                      VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        tamuId || null,
        nama || null,
        telepon || null,
        keperluan || null,
        dituju || null,
        waktu
    ];

    return dbPool.execute(SQLQuery, values);
};

const deleteTamu = async (id) => {
    // const { id } = id;
    const tamu = await getTamuById(id);

    if (id !== id) {
        throw new Error('Anda tidak memiliki izin untuk menghapus data tamu ini');
    }

    const SQLQuery = `DELETE FROM guest WHERE id = ?`;
    const [result] = await dbPool.execute(SQLQuery, [id]);

    if (result.affectedRows === 0) {
        throw new Error('Data tamu tidak ditemukan');
    }

    return { message: 'Data tamu berhasil dihapus' };
};

const updateTamu = (tamuData) => {
    const SQLQuery = `  UPDATE guest 
                        SET nama='${tamuData.nama}', telepon='${tamuData.telepon}', keperluan='${tamuData.keperluan}', tujuan='${tamuData.dituju}'
                        WHERE id=${tamuData.id}`;

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllTamu,
    createTamu,
    deleteTamu,
    updateTamu,
    getTamuById
};
