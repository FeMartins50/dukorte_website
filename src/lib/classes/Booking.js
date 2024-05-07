// (day-time, status, customer, corteJSON)
export default class Booking {
    constructor ( { date, status, customer, corteJSON } ) {
        this.date = date;
        this.status = status;
        this.customer = customer;
        this.corteJSON = corteJSON;
    }
    getCorte () {
        return JSON.parse(this.corteJSON);
    }
    getDateString () {
        let str = "";
        str += this.date.substring(8, 10) + "/" + this.date.substring(5, 7) + " - ";
        str += this.date.split("+")[1] + " a " + this.date.split("+")[2];
        return str;
    }
    getCorteHTML () {
        let obj = JSON.parse(this.corteJSON);
        let str = "";
        str += obj.tesoura ? "<p>✂️</p>" : "<p>❌</p>";
        str += obj.sobrancelha ? "<p>🤨</p>" : "<p>❌</p>";
        str += obj.pezinho ? "<p>🪒</p>" : "<p>❌</p>";
        return str;
    }
    getQuarto () {
        return this.getCorte().quarto ? this.getCorte().quarto : "--";
    }
}