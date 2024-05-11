import SQLite from 'better-sqlite3';
import crypto from 'crypto';
const sql = new SQLite("./db.sqlite");

// This function is outside the Git scope, 'cause it's supposed to be secret. :p
// Build gone wrong, moved to $lib/main.js
import { stringToHash } from "$lib/main.js";

// Register in database
export function registerUser (email, password, oauth, nome, turma) {
    try {
        let hash = stringToHash(password);
        sql.prepare("INSERT INTO users (email, hash, oauth, nome, turma, role) VALUES (?, ?, ?, ?, ?, ?);").run(email, hash, oauth, nome, turma, "User");
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE REGISTERING USER == " + nome + turma);
        console.error(e);
        return -1;
    }
}
// Updates 'oauth' to save validation.
export function validateEmail (email, oauth = "DU KORTE") {
    try {
        sql.prepare("UPDATE users SET oauth = ? WHERE email = ?;").run(oauth, email);
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE VALIDATING EMAIL == " + email);
        console.error(e);
        return -1;
    }
}
// Delete from database IF 'oauth' == "Pending";
export function deletePendingEmail (email) {
    try {
        let isDeletable = sql.prepare("SELECT * FROM users WHERE email = ? AND oauth = ?;").run(email, "Pending"); 
        if (isDeletable) {
            sql.prepare("DELETE FROM users WHERE email = ? AND oauth = ?;").run(email, "Pending");
        }
        return 1;
    } catch (e) {
        console.log("== ERROR WHILE DELETING EMAIL == " + email);
        console.error(e);
        return -1;
    }
}
// Really need to comment?
export function isNameAndSquadAvailable (nome, turma) {
    let nameExists = sql.prepare("SELECT count(*) FROM users WHERE nome = ? AND turma = ?;").get(nome, turma);
    return nameExists['count(*)'] ? -1 : 1;
}
// Please...
export function isEmailAvailable (email) {
    let emailExists = sql.prepare("SELECT count(*) FROM users WHERE email = ?;").get(email);
    return emailExists['count(*)'] ? -1 : 1;
}
// Login user...
export function loginUser (email, password) {
    try {
        let hash = stringToHash(password);
        const user = sql.prepare("SELECT * FROM users WHERE email = ? AND hash = ?;").get(email, hash);
        if (!user || user.oauth == "Pending") {
            return { success: false };
        }
        return { success: true };
    } catch (e) {
        console.log("== ERROR IN LOGIN USER ==");
        console.error(e);
        return { success: false };
    }
}
// Create sesssionid (uuid) and store it in database; return it for cookies;
export function createSession (email) {
    const uuid = crypto.randomUUID().toString();
    sql.prepare("UPDATE users SET sessionid = ? WHERE email = ?").run(uuid, email);
    return uuid;
}
// Get user by sessionid;
export function getUserBySession (sessionid) {
    const user = sql.prepare("SELECT email, nome, turma, role FROM users WHERE sessionid = ?").get(sessionid);
    return user;
}
// Get ALL users;
export function getUsers () {
    const user = sql.prepare("SELECT nome, turma, role, email FROM users").all();
    return user;
}