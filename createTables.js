import SQLite from 'better-sqlite3';
const sql = new SQLite("./db.sqlite");

// Criar uma table de nome 'bookings'
const table1 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='bookings';").get();
if (!table1['count(*)']) {
    sql.prepare("CREATE TABLE bookings (date TEXT UNIQUE, status INT, customer TEXT, corteJSON TEXT);").run();
}
// (day-time, status, customer, corteJSON)
// status = ["Disponível", "Pendente", "Reservado"]; 0 1 e 2
// 2024-03-15+10:20+10:40, Reservado, FERNANDO-CVK, {tesoura <bool>, sobrancelha <bool>, pezinho <bool>, quarto <int>})
// day-month-year-start-end

// Criar uma table de nome 'users'
const table2 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='users';").get();
if (!table2['count(*)']) {
    sql.prepare("CREATE TABLE users (email TEXT PRIMARY KEY, hash TEXT, oauth TEXT, nome TEXT, turma CHAR(3), role TEXT, sessionid TEXT, clube BOOL);").run();
}
// (email, hash, oauth, nome, turma, role, sessionid, clube)
// (fnandomartins50@gmail.com, ao12o3, Google, Fernando, CVK, [role], [sessionid], true)
// role = ["User", "Admin"];

// Criar uma table de nome 'payments'
const table3 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='payments';").get();
if (!table3['count(*)']) {
    sql.prepare("CREATE TABLE payments (pixId TEXT PRIMARY KEY, value INT, date TEXT, email TEXT, status INT, timeout INT);").run();
}
// (pixId, value, date, email, status, timeout)
// status = [0, 1];
// 0 => not paid
// 1 => paid

// Criar uma table de nome 'validation'
const table4 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='validation';").get();
if (!table4['count(*)']) {
    sql.prepare("CREATE TABLE validation (uuid TEXT PRIMARY KEY, email TEXT, timeout INT);").run();
}
// (uuid, email, timeout)
// timeout = ttl