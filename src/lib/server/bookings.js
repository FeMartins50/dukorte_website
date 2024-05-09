import SQLite from 'better-sqlite3';
const sql = new SQLite("./db.sqlite");

/* ATENÇÃO
    Vai ser outro canto que vai lidar com o pagamento.
    Aqui só vai definir o corte como pendente ou disponível pra mostrar no app.
*/
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
export function deleteBooking (date) {
    const isDeletable = sql.prepare("SELECT count(*) FROM bookings WHERE date = ? AND status = 0;").get(date)['count(*)'];
    if (isDeletable) {
        sql.prepare("DELETE FROM bookings WHERE date = ? AND status = 0;").run(date);
        return 1;
    }
    return 0;
}
export function prepareBooking (date, customer, corteJSON) {
    const isAvailable = sql.prepare("SELECT count(*) FROM bookings WHERE date = ? AND status = 0;").get(date)['count(*)'];
    if (isAvailable) {
        sql.prepare("UPDATE bookings SET status = 1, customer = ?, corteJSON = ? WHERE date = ? AND status = 0;").run(customer, corteJSON, date);
        return 1;
    }
    return 0;
}
export function clearBooking (date) {
    const isPending = sql.prepare("SELECT count(*) FROM bookings WHERE date = ? AND status = 1;").get(date)['count(*)'];
    if (isPending) {
        sql.prepare("UPDATE bookings SET status = 0, customer = '-', corteJSON = '{}' WHERE date = ? AND status = 1;").run(date);
        return 1;
    }
    return 0;
}
export function reserveBooking (date) {
    const isPending = sql.prepare("SELECT count(*) FROM bookings WHERE date = ? AND status = 1;").get(date)['count(*)'];
    if (isPending) {
        sql.prepare("UPDATE bookings SET status = 2 WHERE date = ? AND status = 1;").run(date);
        return 1;
    }
    return 0;
}
export function fetchBookingsByDay (day) {
    let bookings = [];
    bookings = sql.prepare("SELECT * FROM bookings WHERE date LIKE ?;").all(day+'%');
    return bookings;
}
export function fetchBookings () {
    let bookings = [];
    bookings = sql.prepare("SELECT * FROM bookings;").all();
    return bookings;
}
export function fetchStatus (date) {
    try {
        const status = sql.prepare("SELECT status FROM bookings WHERE date = ?;").get(date)['status'];
        return status;
    } catch (e) {
        console.log("== ERROR WHILE CREATING BOOKING == " + date);
        console.error(e);
        return -1;
    }
}
export function fetchBookingsByCustomer (customer) {
    const bookings = sql.prepare("SELECT * FROM bookings WHERE customer = ?;").all(customer);
    return bookings;
}