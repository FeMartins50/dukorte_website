import SQLite from 'better-sqlite3';
const sql = new SQLite("./db.sqlite");

// Adds clube member
export function addMember (email, qtdcortes, incluidosob) {
    try {
        sql.prepare("INSERT INTO clube (email, qtdcortes, incluidosob) VALUES (?, ?, ?);").run(email, qtdcortes, incluidosob);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE ADDING INTO CLUBE == " + email);
        console.error(e);
        return -1;
    }
}
// Deletes clube member;
export function deleteMember (email) {
    try {
        sql.prepare("DELETE FROM clube WHERE email = ?;").run(email);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE DELETING FROM CLUBE == " + email);
        console.error(e);
        return -1;
    }
}
// Resets qtdcortes and incluidosob
export function resetMember (email, qtdcortes) {
    try {
        sql.prepare("UPDATE clube SET qtdcortes = ? WHERE email = ?;").run(qtdcortes, email);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE RESETING MEMBER FROM CLUBE == " + email);
        return -1;
    }
}
// Decrement qtdcortes; return 0 IF 'qtdcortes' <= 0
export function decrementCorte (email) {
    try {
        const info = sql.prepare("SELECT * FROM clube WHERE email = ?;").get(email);
        if (info.qtdcortes <= 0) return 0;
        sql.prepare("UPDATE clube SET qtdcortes = ? WHERE email = ?;").run(info.qtdcortes - 1, email);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE UPDATING CLUBE == " + email);
        console.error(e);
        return -1;
    }
}
// Get properties by email;
export function getClubeInfo (email) {
    try {
        const info = sql.prepare("SELECT * FROM clube WHERE email = ?;").get(email);
        return info;
    } catch (e) {
        console.log("== ERROR WHILE FETCHING CLUBE == " + email);
        console.error(e);
        return -1;
    }
}
// Get ALL clube users
export function getClubeUsers () {
    const user = sql.prepare("SELECT * FROM clube;").all();
    return user;
}