export function stringToHash (str) {
    const hashTable = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q","s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    // Take the ascii code
    // Multiply all ascii codes
    // Convert from hashTable 2 by 2
    let hash = "";
    let asciiNum = 0;
    let hashNum = 1;
    for (let i = 0; i < str.length; i++) {
        asciiNum = str.charCodeAt(i);
        hashNum *= asciiNum;
    }
    let bit = 0;
    for (let i = 0; i < Math.log10(hashNum); i += 2) {
        bit = Math.floor(hashNum / (10**i)) % hashTable.length;
        hash += hashTable[ bit ];
    }
    return hash;
}