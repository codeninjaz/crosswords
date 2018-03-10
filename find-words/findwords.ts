import * as fs from 'fs';
import * as path from 'path';
import {Settings} from './settings';
import {ReadLine, createInterface} from 'readline';

const wordFilePath = path.join(__dirname, './words.txt');
const letters = process.argv[2];
let pattern = process.argv[3];

interface IFrequencyMap {
    alpha: string;
    count: number;
}

function letterFrequency(l: string): IFrequencyMap[] {
    let lfreq = Settings.alphabet.map(alpha => {
        let count = 0;
        for (let i = 0; i < l.length; i++) {
            if (l.charAt(i) === alpha) {
                count++;
            }
        }
        return {alpha, count};
    });
    return lfreq;
}

function compareFrequency(a: string, b: string): boolean {
    const aReplaced: string = a.replace(/\*/, Settings.alphabet.join(''));
    const bReplaced: string = b.replace(/\*/, Settings.alphabet.join(''));

    const fa = letterFrequency(aReplaced);
    const fb = letterFrequency(bReplaced);

    if (fa.length !== fb.length) return false;
    for (let i = 0; i < fa.length; i++) {
        if (fa[i].count < fb[i].count) {
            return false;
        }
    }
    // console.log(`aReplaced: ${aReplaced}, bReplaced: ${bReplaced}`);
    return true;
}

function getScore(word: string) {
    let score = 0;
    Settings.points.forEach(lScore => {
        for (let p = 0; p < word.length; p++) {
            if (lScore.letter === word.charAt(p)) {
                score += lScore.point;
            }
        }
    });
    return score;
}

function findWords(): void {
    //letters: polLr?a  ?=wildcard uppercase=fixed letter
    //do we have an 'l' on psoition 4? -> no = next word. Yes -> next question
    //do we have a 'p'? yes -> do we have an 'o'? etc.

    const regex = RegExp('[A-ZÅÄÖ]', 'g');
    let match = regex.exec(pattern);
    let fixedPos: {}[] = [];

    while (match !== null) {
        fixedPos.push(match);
        match = regex.exec(pattern);
    }

    let list: string[] = [];
    const rl = createInterface({
        input: fs.createReadStream(wordFilePath)
    });

    rl.on('line', function(word) {
        let validCases: number = 0;
        fixedPos.forEach((fixedMatch: RegExpMatchArray) => {
            if (word.charAt(fixedMatch.index) === fixedMatch[0].toLowerCase()) validCases += 1;
        });
        if (validCases === fixedPos.length) list.push(word);
    });

    rl.on('close', () => {
        console.log(`Found ${list.length} words`);
        //console.log(list);
        const reg = RegExp(`^${pattern.replace(/\*/, '.*')}$`, 'im');
        list.forEach(w => {
            const m = reg.exec(w);
            const f = compareFrequency(letters, w.toLowerCase());
            console.log(letters, w.toLowerCase());
            if (f) {
                console.log(w);
            }
        });
    });
}

findWords();

// letterFrequency(letters);

// fs.readFile(wordFilePath, 'utf8', (err, allWords) => {
//     if (err) throw err;
//     if (!pattern) {
//         pattern = '10.10';
//     }
//     const asterixLetters = '[' + letters.replace(/\*/gi, Settings.alphabet.join('')) + ']';
//     const dotMatch = pattern.replace(/\./gi, asterixLetters);
//     const numberMatch = dotMatch.replace(/(\d{1,3})/gi, `${asterixLetters}{0,$1}`);
//     const extraLetters = pattern.replace(/[^abcdefghijklmnopqrstuvwxyzåäö]/gi, '');
//     const regex = RegExp(`^${numberMatch}$`, 'gim');
//     console.log(regex.source);

//     let match = regex.exec(allWords);
//     while (match != null) {
//         match = regex.exec(allWords);
//         if (match) {
//             const isWordOk = compareFrequency(letters + extraLetters, match[0]);
//             if (isWordOk) {
//                 const score = getScore(match[0]);
//                 console.log(`${match[0]}: ${score}p`);
//             }
//         }
//     }
// });
