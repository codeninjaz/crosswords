import * as fs from 'fs';
import * as path from 'path';

const wordFilePath = path.join(__dirname, './words.txt');
const letters = process.argv[2];
let pattern = process.argv[3];
const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'å',
    'ä',
    'ö'
];

const points = [
    {letter: 'a', point: 1},
    {letter: 'b', point: 3},
    {letter: 'c', point: 8},
    {letter: 'd', point: 1},
    {letter: 'e', point: 1},
    {letter: 'f', point: 3},
    {letter: 'g', point: 2},
    {letter: 'h', point: 3},
    {letter: 'i', point: 1},
    {letter: 'j', point: 7},
    {letter: 'k', point: 3},
    {letter: 'l', point: 2},
    {letter: 'm', point: 3},
    {letter: 'n', point: 1},
    {letter: 'o', point: 2},
    {letter: 'p', point: 4},
    {letter: 'q', point: 0},
    {letter: 'r', point: 1},
    {letter: 's', point: 1},
    {letter: 't', point: 1},
    {letter: 'u', point: 4},
    {letter: 'v', point: 3},
    {letter: 'w', point: 0},
    {letter: 'x', point: 8},
    {letter: 'y', point: 7},
    {letter: 'z', point: 8},
    {letter: 'å', point: 4},
    {letter: 'ä', point: 4},
    {letter: 'ö', point: 4}
];

const wordfeudLetterMultipliers = [
    '3------2------3',
    '-2---3---3---2-',
    '------2-2------',
    '---3-------3---',
    '------2-2------',
    '-3---3---3---3-',
    '--2-2-----2-2--',
    '2-------------2',
    '--2-2-----2-2--',
    '-3---3---3---3-',
    '------2-2------',
    '---3-------3---',
    '------2-2------',
    '-2---3---3---2-',
    '3------2------3'
];

const wordfeudWordMultipliers = [
    '----3-----3----',
    '---------------',
    '--2---------2--',
    '-------2-------',
    '3---2-----2---3',
    '---------------',
    '---------------',
    '---2-------2---',
    '---------------',
    '---------------',
    '3---2-----2---3',
    '-------2-------',
    '--2---------2--',
    '---------------',
    '----3-----3----'
];

const wordfeudMultipliers = [
    //Row 0
    {x: 0, y: 0, wm: 1, lm: 3},
    {x: 4, y: 0, wm: 3, lm: 1},
    {x: 7, y: 0, wm: 1, lm: 2},
    {x: 10, y: 0, wm: 3, lm: 1},
    {x: 14, y: 0, wm: 1, lm: 3},
    //Row 1
    {x: 1, y: 1, wm: 1, lm: 2},
    {x: 5, y: 1, wm: 1, lm: 3},
    {x: 9, y: 1, wm: 1, lm: 3},
    {x: 13, y: 1, wm: 1, lm: 2},
    //Row 2
    {x: 2, y: 2, wm: 2, lm: 1},
    {x: 6, y: 2, wm: 1, lm: 2},
    {x: 8, y: 2, wm: 1, lm: 2},
    {x: 12, y: 2, wm: 2, lm: 1},
    //Row 3
    {x: 3, y: 3, wm: 1, lm: 3},
    {x: 7, y: 3, wm: 2, lm: 3},
    {x: 11, y: 3, wm: 1, lm: 3},
    //Row 4
    {x: 0, y: 4, wm: 3, lm: 1},
    {x: 4, y: 4, wm: 2, lm: 1},
    {x: 10, y: 4, wm: 2, lm: 1},
    {x: 14, y: 4, wm: 3, lm: 1},
    //Row 5
    {x: 1, y: 5, wm: 1, lm: 3},
    {x: 5, y: 5, wm: 1, lm: 3},
    {x: 9, y: 5, wm: 1, lm: 3},
    {x: 13, y: 5, wm: 1, lm: 3},
    //Row 6
    {x: 2, y: 6, wm: 1, lm: 2},
    {x: 4, y: 6, wm: 1, lm: 2},
    {x: 10, y: 6, wm: 1, lm: 2},
    {x: 12, y: 6, wm: 1, lm: 2},
    //Row 7
    {x: 3, y: 7, wm: 2, lm: 1},
    {x: 11, y: 7, wm: 2, lm: 1},
    //Row 8
    {x: 2, y: 8, wm: 1, lm: 2},
    {x: 4, y: 8, wm: 1, lm: 2},
    {x: 10, y: 8, wm: 1, lm: 2},
    {x: 12, y: 8, wm: 1, lm: 2},
    //Row 9
    {x: 1, y: 9, wm: 1, lm: 3},
    {x: 5, y: 9, wm: 1, lm: 3},
    {x: 9, y: 9, wm: 1, lm: 3},
    {x: 13, y: 9, wm: 1, lm: 3},
    //Row 10
    {x: 0, y: 10, wm: 3, lm: 1},
    {x: 4, y: 10, wm: 2, lm: 1},
    {x: 10, y: 10, wm: 2, lm: 1},
    {x: 14, y: 10, wm: 3, lm: 1},
    //Row 11
    {x: 3, y: 11, wm: 1, lm: 3},
    {x: 7, y: 11, wm: 2, lm: 3},
    {x: 11, y: 11, wm: 1, lm: 3},
    //Row 12
    {x: 2, y: 12, wm: 2, lm: 1},
    {x: 6, y: 12, wm: 1, lm: 2},
    {x: 8, y: 12, wm: 1, lm: 2},
    {x: 12, y: 12, wm: 2, lm: 1},
    //Row 13
    {x: 1, y: 13, wm: 1, lm: 2},
    {x: 5, y: 13, wm: 1, lm: 3},
    {x: 9, y: 13, wm: 1, lm: 3},
    {x: 13, y: 13, wm: 1, lm: 2},
    //Row 14
    {x: 0, y: 14, wm: 1, lm: 3},
    {x: 4, y: 14, wm: 3, lm: 1},
    {x: 7, y: 14, wm: 1, lm: 2},
    {x: 10, y: 14, wm: 3, lm: 1},
    {x: 14, y: 14, wm: 1, lm: 3}
];

interface IFrequencyMap {
    alpha: string;
    count: number;
}

function letterFrequency(l: string): IFrequencyMap[] {
    let lfreq = alphabet.map(alpha => {
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
    const fa = letterFrequency(a);
    const fb = letterFrequency(b);
    if (fa.length !== fb.length) return false;
    for (let i = 0; i < fa.length; i++) {
        if (fa[i].count < fb[i].count) {
            return false;
        }
    }
    return true;
}

function getScore(word: string) {
    let score = 0;
    points.forEach(lScore => {
        for (let p = 0; p < word.length; p++) {
            if (lScore.letter === word.charAt(p)) {
                score += lScore.point;
            }
        }
    });
    return score;
}

letterFrequency(letters);

fs.readFile(wordFilePath, 'utf8', (err, allWords) => {
    if (err) throw err;
    if (!pattern) {
        pattern = '10.10';
    }
    const dotMatch = pattern.replace(/\./gi, `[${letters}]`);
    const numberMatch = dotMatch.replace(/(\d{1,3})/gi, `[${letters}]{0,$1}`);
    const extraLetters = pattern.replace(/[^abcdefghijklmnopqrstuvwxyzåäö]/gi, '');
    const regex = RegExp(`^${numberMatch}$`, 'gim');
    console.log(regex.source);

    //   var regex = /^[xyasprd]a[xyasprd][xyasprd][xyasprd]$/gim;
    let match = regex.exec(allWords);
    while (match != null) {
        // matched text: match[0]
        // match start: match.index
        // capturing group n: match[n]
        match = regex.exec(allWords);
        if (match) {
            const isWordOk = compareFrequency(letters + extraLetters, match[0]);
            if (isWordOk) {
                const score = getScore(match[0]);
                console.log(`${match[0]}: ${score}p`);
            }
        }
    }
});
