export function createSchedule (time, duration, pause, quantity) {
    let schedule = [];
    let start = timeStrToNum(time);
    let end = sumTimeInt(start, duration);
    for (let i = 0; i < quantity; i++) {
        schedule.push({start: timeNumToStr(start), end: timeNumToStr(end)});
        start = sumTimeInt(end, pause);
        end = sumTimeInt(start, duration);
    }
    return schedule;
}

function timeStrToNum (str) {
    let num = str.replace(":", "");
    return Number(num);
}
function timeNumToStr (num) {
    let str = "";
    let hours = Math.floor(num/100);
    let minutes = (num - (Math.floor(num/100)*100))
    if (hours < 10) {
        str += "0";
    }
    str += hours.toString();
    str += ":";
    if (minutes < 10) {
        str += "0";
    }
    str += minutes.toString();
    return str;
}
function sumTimeInt (a, b) {
    let sum = a + b;
    if (sum % 100 > 59) {
        // sum += 100;
        // sum -= 60;
        sum += 40;
    }
    if (sum > 2359) {
        sum -= 2400;
    }
    return sum;
}