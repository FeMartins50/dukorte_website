export default {
    parseQuarto: (corteJSON) => {
        return JSON.parse(corteJSON).quarto ? JSON.parse(corteJSON).quarto : "--";
    },
    parseDate: (date) => {
        let str = "";
        str += date.substring(8, 10) + "/" + date.substring(5, 7) + " - ";
        str += date.split("+")[1] + " a " + date.split("+")[2];
        return str;
    },
    parseEspec: (corteJSON) => {
        let obj = JSON.parse(corteJSON);
        let str = "";
        str += obj.tesoura ? "<p>✂️</p>" : "<p>❌</p>";
        str += obj.sobrancelha ? "<p>🤨</p>" : "<p>❌</p>";
        str += obj.pezinho ? "<p>🪒</p>" : "<p>❌</p>";
        return str;
    }
}