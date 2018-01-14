import * as fs from "fs";
import * as path from "path";

const wordFilePath = path.join(__dirname, "./words.json");
const letters = process.argv[2];
const pattern = process.argv[3];

function letterFrequency(l:string){
    //get a letter frequency map to compare with words found
    const alphabet = "abcdefghijklmnopqrstuvwxyzåäö";
    for(let i:number=0;i<alphabet.length;i++){
        const re = RegExp(alphabet.charAt[i],"gim").
    }    
}

fs.readFile(wordFilePath, "utf8", (err, allWords) => {
  if (err) throw err;
  const dotMatch = pattern.replace(/\./gi, `[${letters}]`);
  const numberMatch = dotMatch.replace(/(\d{1,3})/gi, `[${letters}]{0,$1}`);
  const regex = RegExp(`^${numberMatch}$`, "gim");
  console.log(regex.source);

  //   var regex = /^[xyasprd]a[xyasprd][xyasprd][xyasprd]$/gim;
  let match = regex.exec(allWords);
  while (match != null) {
    // matched text: match[0]
    // match start: match.index
    // capturing group n: match[n]
    match = regex.exec(allWords);
    if (match) {
      console.log(match[0]);
    }
  }

  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

  //   const result = regex.exec(allWords);
});
