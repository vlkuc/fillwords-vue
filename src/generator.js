import { wordsBase } from "./wordsBase";
import { patterns } from "./patterns";


function getFlipPattern(width){
    let pattern = [];
    let rawPattern = patterns[width+'x'+width][Math.floor(Math.random()*patterns[width+'x'+width].length)];
    // let rawPattern = patterns[width+'x'+width][1];
    // для тестирования шаблонов
    let patCase = Math.floor(Math.random()*4);
    rawPattern.forEach(word => {
        pattern[pattern.length] = [];
        let patternWord =  pattern[pattern.length - 1];
        word.forEach(symbol => {
            switch(patCase){
                case 0:
                    patternWord[patternWord.length] = [symbol[0], symbol[1]];
                    break;
                case 1:
                    patternWord[patternWord.length] = [width - 1 - symbol[0], width - 1 - symbol[1]];
                    break;
                case 2:
                    patternWord[patternWord.length] = [width - 1 - symbol[1], symbol[0]];
                    break;
                case 3:
                    patternWord[patternWord.length] = [symbol[1], width - 1 - symbol[0]];
                    break;
                default:
                    break;
            }
        });
    });
    
    return pattern;
}

function getFlipNoSquarePattern(shortside, tallside, fallOnSide = false){
    let pattern = [];
    let rawPattern = patterns[shortside+'x'+tallside][Math.floor(Math.random()*patterns[shortside+'x'+tallside].length)];
    let patCase = Math.floor(Math.random()*4);
    rawPattern.forEach(word => {
        pattern[pattern.length] = [];
        let patternWord =  pattern[pattern.length - 1];
        word.forEach(symbol => {
            switch(patCase){
                case 0:
                    patternWord[patternWord.length] = [symbol[0], symbol[1]];
                    break;
                case 1:
                    patternWord[patternWord.length] = [shortside - 1 - symbol[0], tallside - 1 - symbol[1]];
                    break;
                case 2:
                    patternWord[patternWord.length] = [shortside - 1 - symbol[0], symbol[1]];
                    break;
                case 3:
                    patternWord[patternWord.length] = [symbol[0], tallside - 1 - symbol[1]];
                    break;
                default:
                    break;
            }
        });
    });

    if(fallOnSide){
        pattern.forEach(word => {
            word.forEach(symbol => {
                let temp = symbol[0];
                symbol[0] = symbol[1];
                symbol[1] = shortside - 1 - temp;
            });
        });
    }
    
    return pattern;
}


function getSixPattern(){
    let pattern = getFlipPattern(3);
    let rawPattern = getFlipPattern(3);

    for(let i = 1; i < 4; i++){
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => {
                switch(i){
                    case 1:
                        patternWord[patternWord.length] = [symbol[0], symbol[1]+3];
                        break;
                    case 2:
                        patternWord[patternWord.length] = [symbol[0]+3, symbol[1]];
                        break;
                    case 3:
                        patternWord[patternWord.length] = [symbol[0]+3, symbol[1]+3];
                        break;
                    default:
                        break;
                }
            });
        });
        rawPattern = getFlipPattern(3);
    }

    return pattern;
}

function getSevenPattern(){
    // Выбираем шаблон 4 на 4 в качестве верхнего левого угла.
    let pattern = getFlipPattern(4);
    // Пришиваем шаблон 3 на 3 в качетсве правого нижнего угла.
    let rawPattern = getFlipPattern(3);
    rawPattern.forEach(word => {
        pattern[pattern.length] = [];
        let patternWord =  pattern[pattern.length - 1];
        word.forEach(symbol => {
            patternWord[patternWord.length] = [symbol[0]+4, symbol[1]+4];
        });
    });
    // Пришиваем шаблон 3 на 4 в качестве левого нижнего угла.
    rawPattern = getFlipNoSquarePattern(3, 4);
    rawPattern.forEach(word => {
        pattern[pattern.length] = [];
        let patternWord =  pattern[pattern.length - 1];
        word.forEach(symbol => patternWord[patternWord.length] = [symbol[0]+4, symbol[1]]);
    });
    // Пришиваем шаблон 4 на 3 в качестве правого верхнего угла.
    rawPattern = getFlipNoSquarePattern(3, 4, true);
    rawPattern.forEach(word => {
        pattern[pattern.length] = [];
        let patternWord =  pattern[pattern.length - 1];
        word.forEach(symbol => patternWord[patternWord.length] = [symbol[0], symbol[1]+4]);
    });

    return pattern;
}

function getEightPattern(){
    let pattern = [];
    // Выбираем одну из схем
    if(Math.floor(Math.random()*4) > 1){
        // Схема 2х2 из шаблонов 4х4
        pattern = getFlipPattern(4);
        let rawPattern = getFlipPattern(4);

        for(let i = 1; i < 4; i++){
            rawPattern.forEach(word => {
                pattern[pattern.length] = [];
                let patternWord =  pattern[pattern.length - 1];
                word.forEach(symbol => {
                    switch(i){
                        case 1:
                            patternWord[patternWord.length] = [symbol[0], symbol[1]+4];
                            break;
                        case 2:
                            patternWord[patternWord.length] = [symbol[0]+4, symbol[1]];
                            break;
                        case 3:
                            patternWord[patternWord.length] = [symbol[0]+4, symbol[1]+4];
                            break;
                        default:
                            break;
                    }
                });
            });
            rawPattern = getFlipPattern(4);
        }

    } else {
        // Схема из шаблонов 5х5, 5х3, 3х5, 3х3
        // Выбираем шаблон 5 на 5 в качестве верхнего левого угла.
        pattern = getFlipPattern(5);
        // Пришиваем шаблон 3 на 3 в качетсве правого нижнего угла.
        let rawPattern = getFlipPattern(3);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => {
                patternWord[patternWord.length] = [symbol[0]+5, symbol[1]+5];
            });
        });
        // Пришиваем шаблон 3 на 5 в качестве левого нижнего угла.
        rawPattern = getFlipNoSquarePattern(3, 5);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => patternWord[patternWord.length] = [symbol[0]+5, symbol[1]]);
        });
        // Пришиваем шаблон 5 на 3 в качестве правого верхнего угла.
        rawPattern = getFlipNoSquarePattern(3, 5, true);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => patternWord[patternWord.length] = [symbol[0], symbol[1]+5]);
        });
    }


    return pattern;
}

function getNinePattern(){
    let pattern = [];
    // Выбираем одну из схем
    if(Math.floor(Math.random()*4) > 1){
        // Схема из шаблонов 6x6, 3x3, 6x3, 3x6
        // Выбираем шаблон 6 на 6 в качестве верхнего левого угла.
        pattern = getSixPattern(6);
        // Пришиваем шаблон 3 на 3 в качетсве правого нижнего угла.
        let rawPattern = getFlipPattern(3);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => {
                patternWord[patternWord.length] = [symbol[0]+6, symbol[1]+6];
            });
        });
        // Пришиваем шаблон 3 на 6 в качестве левого нижнего угла.
        rawPattern = getFlipNoSquarePattern(3, 6);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => patternWord[patternWord.length] = [symbol[0]+6, symbol[1]]);
        });
        // Пришиваем шаблон 6 на 3 в качестве правого верхнего угла.
        rawPattern = getFlipNoSquarePattern(3, 6, true);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => patternWord[patternWord.length] = [symbol[0], symbol[1]+6]);
        });

    } else {
        // Схема из шаблонов 5х5, 5х4, 4х5, 4х4
        // Выбираем шаблон 5 на 5 в качестве верхнего левого угла.
        pattern = getFlipPattern(5);
        // Пришиваем шаблон 4 на 4 в качетсве правого нижнего угла.
        let rawPattern = getFlipPattern(4);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => {
                patternWord[patternWord.length] = [symbol[0]+5, symbol[1]+5];
            });
        });
        // Пришиваем шаблон 4 на 5 в качестве левого нижнего угла.
        rawPattern = getFlipNoSquarePattern(4, 5);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => patternWord[patternWord.length] = [symbol[0]+5, symbol[1]]);
        });
        // Пришиваем шаблон 5 на 4 в качестве правого верхнего угла.
        rawPattern = getFlipNoSquarePattern(4, 5, true);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => patternWord[patternWord.length] = [symbol[0], symbol[1]+5]);
        });
    }


    return pattern;
}

function getTenPattern(){
    let pattern = [];
    // Выбираем одну из схем
    if(Math.floor(Math.random()*4) > 1){
        // Схема из шаблонов 6x6, 4x4, 6x4, 4x6
        // Выбираем шаблон 6 на 6 в качестве верхнего левого угла.
        pattern = getSixPattern(6);
        // Пришиваем шаблон 4 на 4 в качетсве правого нижнего угла.
        let rawPattern = getFlipPattern(4);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => {
                patternWord[patternWord.length] = [symbol[0]+6, symbol[1]+6];
            });
        });
        // Пришиваем шаблон 4 на 6 в качестве левого нижнего угла.
        rawPattern = getFlipNoSquarePattern(4, 6);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => patternWord[patternWord.length] = [symbol[0]+6, symbol[1]]);
        });
        // Пришиваем шаблон 6 на 4 в качестве правого верхнего угла.
        rawPattern = getFlipNoSquarePattern(4, 6, true);
        rawPattern.forEach(word => {
            pattern[pattern.length] = [];
            let patternWord =  pattern[pattern.length - 1];
            word.forEach(symbol => patternWord[patternWord.length] = [symbol[0], symbol[1]+6]);
        });
    } else {
         // Схема 2х2 из шаблонов 5х5
         pattern = getFlipPattern(5);
         let rawPattern = getFlipPattern(5);
 
         for(let i = 1; i < 4; i++){
             rawPattern.forEach(word => {
                 pattern[pattern.length] = [];
                 let patternWord =  pattern[pattern.length - 1];
                 word.forEach(symbol => {
                     switch(i){
                         case 1:
                             patternWord[patternWord.length] = [symbol[0], symbol[1]+5];
                             break;
                         case 2:
                             patternWord[patternWord.length] = [symbol[0]+5, symbol[1]];
                             break;
                         case 3:
                             patternWord[patternWord.length] = [symbol[0]+5, symbol[1]+5];
                             break;
                         default:
                             break;
                     }
                 });
             });
             rawPattern = getFlipPattern(5);
         }
    }


    return pattern;
}

function getPattern(width) {
    switch(width){
        case 3:
            return getFlipPattern(3); 
        case 4: 
            return getFlipPattern(4); 
        case 5:
            return getFlipPattern(5);
        case 6:
            return getSixPattern();
        case 7:
            return getSevenPattern();
        case 8:
            return getEightPattern();
        case 9:
            return getNinePattern();
        case 10:
            return getTenPattern();
    }
}

export const makeMapAndPattern = width => {
    let pattern = getPattern(width);

    // Переворачиваем некоторые слова
    for(let i = 0; i < pattern.length; i++){
        if(Math.random() > 0.5){
            let wordRev = [];
            for(let j = 0; j < pattern[i].length; j++){
                wordRev.unshift(pattern[i][j]);
            }
            pattern[i] = wordRev;
        }
    }

    let map = [];

    for(let i = 0; i < width; i++){
        map[i] = [];
        for(let j = 0; j < width; j++){
            map[i][j] = 1;
        }
    }

    pattern.forEach(word => {
        let wordLenghtInBase = word.length - 3;
        let wordFromBase = wordsBase[wordLenghtInBase][Math.floor(Math.random()*wordsBase[wordLenghtInBase].length)];
        for(let index = 0; index < word.length; index++){
            map[word[index][0]][word[index][1]]= {
                letter: `${wordFromBase[index]}`, 
                color: '#fff', 
                dead: false
            };
        }
    });

    return { 
        'map': map, 
        'pattern': pattern 
    };
}