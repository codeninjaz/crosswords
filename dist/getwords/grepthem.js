"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const readline = require("readline");
class GrepWords {
    constructor() {
        this.sourceFilePath = path.join(__dirname, "../resources/dsso-1.46.txt");
        this.outputFilePath = path.join(__dirname, "../words.json");
    }
    writeWordsToFile() {
        const rl = readline.createInterface({
            input: fs.createReadStream(this.sourceFilePath)
        });
        const logger = fs.createWriteStream(this.outputFilePath, {
            flags: "w"
        });
        rl.on("line", line => {
            let result = "";
            const myregexp = /<(?:substantiv|verb|adjektiv|adverb)>([\w|:åäö]*)/im;
            const match = myregexp.exec(line);
            if (match != null) {
                result = match[1];
                const list = result.split(":");
                if (list.length > 0) {
                    for (let i = 1; i < list.length; i++) {
                        if (i > 1 && list[i] === list[i - 1])
                            continue;
                        const element = list[i];
                        if (element.length > 0 && element !== "!") {
                            logger.write(element + "\n");
                        }
                    }
                }
            }
        });
    }
}
exports.GrepWords = GrepWords;
//# sourceMappingURL=grepthem.js.map