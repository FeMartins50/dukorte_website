import SQLite from 'better-sqlite3';
const sql = new SQLite("./db.sqlite");

export function registerCharge (email, value, date, timeout, pixId) {
    try {
        sql.prepare("INSERT INTO payments (email, value, date, pixId, status, timeout) VALUES (?, ?, ?, ?, ?, ?);").run(email, value, date, pixId, 0, timeout);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE REGISTERING CHARGE == " + email + " == " + pixId);
        console.error(e);
        return -1;
    }
}
export function updateChargeStatus (pixId) {
    try {
        sql.prepare("UPDATE payments SET status = 1 WHERE pixId = ?;").run(pixId);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE UPDATING CHARGE == " + pixId);
        console.error(e);
        return -1;
    }
}
export function deleteCharge (pixId) {
    try {
        sql.prepare("DELETE FROM payments WHERE pixId = ?;").run(pixId);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE DELETING CHARGE == " + pixId);
        console.error(e);
        return -1;
    }
}
export function getUserDebt (email, status = 0) {
    // if user has debt, return the debt
    // if user has no debt, return []
    try {
        let debts = sql.prepare("SELECT * FROM payments WHERE email = ? AND status = ?;").all(email, status);
        return debts;
    } catch (e) {
        console.log("== ERROR WHILE FETCHING DEBTS == " + email);
        console.error(e);
        return -1;
    }
}
export function getCharge (pixId) {
    try {
        let debt = sql.prepare("SELECT * FROM payments WHERE pixId = ?;").get(pixId);
        return debt;
    } catch (e) {
        console.log("== ERROR WHILE FETCHING DEBT == " + pixId);
        console.error(e);
        return -1;
    }
}