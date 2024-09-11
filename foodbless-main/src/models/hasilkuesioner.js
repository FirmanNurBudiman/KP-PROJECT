const dbPool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const moment = require('moment-timezone');

const saltRounds = 10;
const jwtSecret = 'SECRET';

const getAllhasilkuesioner = () => {
    const SQLQuery = 'SELECT * FROM hasilkuesioner';
    return dbPool.execute(SQLQuery);
};

const gethasilkuesionerById = async (id) => {
    const SQLQuery = 'SELECT * FROM hasilkuesioner WHERE ID_user = ?';
    const [rows] = await dbPool.execute(SQLQuery, [id]);

    if (rows.length === 0) {
        throw new Error('Data kuesioner tidak ditemukan');
    }

    return rows[0];
};

const createhasilkuesioner = async (body) => {
    const {
        Nama,
        Status,
        Tanggal
        } = body;

    const createAt = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

    const SQLQuery = `INSERT INTO hasilkuesioner (Nama, Status, Tanggal) VALUES (?, ?, ?)`;

    const values = [Nama, Status, Tanggal];

    try {
        console.log("Executing query:", SQLQuery); // Debug log
        console.log("With values:", values); // Debug log

        const [userResult] = await dbPool.execute(SQLQuery, values);
        const ID_User = userResult.insertId;

        const hasilkuesionerSQLQuery = `INSERT INTO hasilkuesioner (Nama, Status, Tanggal) 
                                 VALUES (?, ?, ?)`;
        const hasilkuesionerValues = [Nama, Status, Tanggal];

        console.log("Executing hasilkuesioner query:", hasilkuesionerSQLQuery); // Debug log
        console.log("With hasilkuesioner values:", hasilkuesionerValues); // Debug log

        await dbPool.execute(hasilkuesionerSQLQuery, hasilkuesionerValues);
    } catch (error) {
        console.error("Error during hasilkuesioner creation:", error); // Log error
        throw error;
    }
};


const deletehasilkuesioner = async (id) => {
    // Query untuk menghapus data berdasarkan ID_User
    const SQLQuery = `DELETE FROM hasilkuesioner WHERE ID_User = ?`;
    const [result] = await dbPool.execute(SQLQuery, [id]);

    // Cek apakah ada baris yang dihapus
    if (result.affectedRows === 0) {
        throw new Error('Data kuesioner tidak ditemukan');
    }

    return { message: 'Data hasilkuesioner berhasil dihapus' };
};


const updatehasilkuesioner = (hasilkuesionerData) => {
    const SQLQuery = `  UPDATE hasilkuesioner 
                        SET Nama='${hasilkuesionerData.Nama}',  Status='${hasilkuesionerData.Status}', Tanggal='${hasilkuesionerData.Tanggal}' WHERE ID=${hasilkuesionerData.ID}`;

    dbPool.execute(SQLQuery);

    const SQLQueryhasilkuesioner = `  UPDATE hasilkuesioner 
                        SET Status='${hasilkuesionerData.Status}' WHERE ID=${hasilkuesionerData.ID}`;

    return dbPool.execute(SQLQueryhasilkuesioner);
}



module.exports = {
    getAllhasilkuesioner,
    createhasilkuesioner,
    deletehasilkuesioner,
    updatehasilkuesioner,        
    gethasilkuesionerById
};
