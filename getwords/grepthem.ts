import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

export class GrepWords {
  sourceFilePath = path.join(__dirname, "../resources/dsso-1.46.txt");
  outputFilePath = path.join(__dirname, "../words.json");

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
            if (i > 1 && list[i] === list[i - 1]) continue;
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

