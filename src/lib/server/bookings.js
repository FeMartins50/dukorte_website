import SQLite from 'better-sqlite3';
const sql = new SQLite("./db.sqlite");

// Inserts booking into database
export function createBooking (date) {
    try {
        sql.prepare("INSERT INTO bookings (date, status, customer, corteJSON) VALUES (?, ?, ?, ?);").run(date, 0, "-", "{}");
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE CREATING BOOKING == " + date);
        console.error(e);
        return -1;
    }
}
// Deletes booking ONLY IF status == 0;
export function deleteBooking (date) {
    const isDeletable = sql.prepare("SELECT count(*) FROM bookings WHERE date = ? AND status = 0;").get(date)['count(*)'];
    if (isDeletable) {
        sql.prepare("DELETE FROM bookings WHERE date = ? AND status = 0;").run(date);
        return 1;
    }
    return 0;
}
// Updates booking as "Pending" (status = 1) IF status == 0;
export function prepareBooking (date, customer, corteJSON) {
    const isAvailable = sql.prepare("SELECT count(*) FROM bookings WHERE date = ? AND status = 0;").get(date)['count(*)'];
    if (isAvailable) {
        sql.prepare("UPDATE bookings SET status = 1, customer = ?, corteJSON = ? WHERE date = ? AND status = 0;").run(customer, corteJSON, date);
        return 1;
    }
    return 0;
}
// Updates booking as "Disponível" (status == 0) IF status == 1;
export function clearBooking (date) {
    const isPending = sql.prepare("SELECT count(*) FROM bookings WHERE date = ? AND status = 1;").get(date)['count(*)'];
    if (isPending) {
        sql.prepare("UPDATE bookings SET status = 0, customer = '-', corteJSON = '{}' WHERE date = ? AND status = 1;").run(date);
        return 1;
    }
    return 0;
}
// Updates booking as "Reservado" (status == 2) IF status == 1;
export function reserveBooking (date) {
    const isPending = sql.prepare("SELECT count(*) FROM bookings WHERE date = ? AND status = 1;").get(date)['count(*)'];
    if (isPending) {
        sql.prepare("UPDATE bookings SET status = 2 WHERE date = ? AND status = 1;").run(date);
        return 1;
    }
    return 0;
}
// Get all bookings where 'date' starts with the specified day;
export function getBookingsByDay (day) {
    let bookings = [];
    bookings = sql.prepare("SELECT * FROM bookings WHERE date LIKE ?;").all(day+'%');
    return bookings;
}
// Get ALL bookings;
export function getBookings () {
    let bookings = [];
    bookings = sql.prepare("SELECT * FROM bookings;").all();
    return bookings;
}
// Get status of that booking, by date;
export function getStatus (date) {
    try {
        const status = sql.prepare("SELECT status FROM bookings WHERE date = ?;").get(date)['status'];
        return status;
    } catch (e) {
        console.log("== ERROR WHILE CREATING BOOKING == " + date);
        console.error(e);
        return -1;
    }
}
// Get all bookings by customer
export function getBookingsByCustomer (customer) {
    const bookings = sql.prepare("SELECT * FROM bookings WHERE customer = ?;").all(customer);
    return bookings;
}