const dbPool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const moment = require('moment-timezone');

const saltRounds = 10;
const jwtSecret = 'SECRET';

const getAllBooking = () => {
    const SQLQuery = 'SELECT * FROM pemesanan';
    return dbPool.execute(SQLQuery);
};

const getBookingById = async (id) => {
    const SQLQuery = 'SELECT * FROM pemesanan WHERE ID_Pemesanan = ?';
    const [rows] = await dbPool.execute(SQLQuery, [id]);

    if (rows.length === 0) {
        throw new Error('Data Pesanan tidak ditemukan');
    }

    return rows[0];
};

const createBooking = async (body) => {
    const {
        Nama_Lengkap,
        Jenis_Kelamin,
        Email,
        No_Hp,
        ID_Ruangan,
        Durasi
    } = body;

    const createAt = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

    const SQLQuery = `INSERT INTO user (Nama_Lengkap, Jenis_Kelamin, Email, No_Hp) VALUES (?, ?, ?, ?)`;

    const values = [Nama_Lengkap, Jenis_Kelamin, Email, No_Hp];

    try {
        console.log("Executing query:", SQLQuery); // Debug log
        console.log("With values:", values); // Debug log

        const [userResult] = await dbPool.execute(SQLQuery, values);
        const ID_User = userResult.insertId;

        const bookingSQLQuery = `INSERT INTO pemesanan (ID_User, ID_Ruangan, Durasi) 
                                 VALUES (?, ?, ?)`;
        const bookingValues = [ID_User, ID_Ruangan, Durasi];

        console.log("Executing booking query:", bookingSQLQuery); // Debug log
        console.log("With booking values:", bookingValues); // Debug log

        await dbPool.execute(bookingSQLQuery, bookingValues);
    } catch (error) {
        console.error("Error during booking creation:", error); // Log error
        throw error;
    }
};


const deleteBooking = async (id) => {
    const SQLQuery = 'DELETE FROM pemesanan WHERE ID_Pemesanan = ?';
    const [result] = await dbPool.execute(SQLQuery, [id]);

    // Cek apakah ada baris yang dihapus
    if (result.affectedRows === 0) {
        throw new Error('Data pesanan tidak ditemukan');
    }

    return { message: 'Data pesanan berhasil dihapus' };
};


const updateBooking = (BookingData) => {
    const SQLQuery = `  UPDATE user 
                        SET Nama_Lengkap='${BookingData.Nama_Lengkap}',  Email='${BookingData.Email}',  No_Hp='${BookingData.No_Hp}' WHERE ID_User=${BookingData.ID_User}`;

    dbPool.execute(SQLQuery);

    const SQLQuerypemesanan = `  UPDATE pemesanan 
                        SET ID_Ruangan='${BookingData.ID_Ruangan}' WHERE ID_Pemesanan=${BookingData.ID_Pemesanan}`;

    return dbPool.execute(SQLQuerypemesanan);
}


module.exports = {
    getAllBooking,
    createBooking,
    deleteBooking,
    updateBooking,
    getBookingById
};
