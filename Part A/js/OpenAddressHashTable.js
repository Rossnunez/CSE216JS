class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }

    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        let index = this.hashCode(key);
        for (let i = 0; i < this.hashTable.length; i++) {
            if (index == this.hashTable.length) {
                index = 0;
            }
            if (this.hashTable[index] != null) {
                if (this.hashTable[index].key == key) {
                    return this.hashTable[index].value;
                }
            }
            index++;
        }
        return null;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {
        let index = this.hashCode(key);
        let replaced = 0; //if the value was put into the hashtable
        if ((this.hashTable.length) == 0) { //if hashtable is empty
            let newKey = new KeyValuePair(key, item);
            this.hashTable[index] = newKey;
        } else {
            for (let i = 0; i < this.length; i++) {
                if (index == this.length) {
                    index = 0;
                }

                if (this.hashTable[index] == null) {
                    let newKey = new KeyValuePair(key, item);
                    this.hashTable[index] = newKey;
                    this.size++;
                    replaced = 1;
                    break;
                }

                if ((this.hashTable[index]).key == key) {
                    this.hashTable[index].value = item;
                    replaced = 1;
                    break;
                }
                index++;
            }
            if (!replaced) { //table is full and no duplicates so we expand the hashtable
                let newSize = this.hashTable.length * 2;
                let newHT = new Array(newSize); //creating new array with double the size
                for (let i = 0; i < this.hashTable.length; i++) { //rehash
                    let gKey = this.hashTable[i];
                    let newIndex = this.hashCode(gKey.key);
                    while (newHT[newIndex] != null) {
                        newIndex++;
                        if (newIndex == newHT.length) {
                            newIndex = 0;
                        }
                    }
                    newHT[newIndex] = gKey;
                }
                //add the given key/item pair to the new hashtable
                let index = this.hashCode(key);
                while (newHT[index] != null) {
                    index++;
                    if (index == newHT.length) {
                        index = 0;
                    }
                }
                let newKey = new KeyValuePair(key, item);
                newHT[index] = newKey;
                this.size++;
                this.hashTable = newHT;
                this.length = newSize;
            }
        }
    }

    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};