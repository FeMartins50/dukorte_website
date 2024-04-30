import SQLite from 'better-sqlite3';
const sql = new SQLite("./db.sqlite");

export function registerUUID (uuid, email, timeout) {
    try {
        sql.prepare("INSERT INTO validation (uuid, email, timeout) VALUES (?, ?, ?);").run(uuid, email, timeout);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE INSERTING INTO validation == " + uuid + " == " + email);
        console.error(e);
        return -1;
    }
}
export function getUUIDsByEmail (email) {
    try {
        const uuids = sql.prepare("SELECT * FROM validation WHERE email = ?;").all(email);
        return uuids;
    } catch (e) {
        console.log("== ERROR WHILE SELECTING FROM validation == " + email);
        console.error(e);
        return -1;
    }
}
export function getEmailByUUID (uuid) {
    try {
        const email = sql.prepare("SELECT * FROM validation WHERE uuid = ?;").get(uuid);
        return email;
    } catch (e) {
        console.log("== ERROR WHILE SELECTING FROM validation == " + uuid);
        console.error(e);
        return -1;
    }
}
export function deleteUUIDsByEmail (email) {
    try {
        sql.prepare("DELETE FROM validation WHERE email = ?;").run(email);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE DELETING FROM validation == " + email);
        console.error(e);
        return -1;
    }
}