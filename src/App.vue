<template>
  <div class="logo-w">

  </div>

  <div 
    v-if="gameStart"
    class="map"
  >
    <div 
      v-for="(row, index) in map" 
      :key="index"
      class="map-row"
    >
      <div 
        v-for="(item, jindex) in row" 
        :key="jindex"
        @click="switchSelectMode(index, jindex, item.letter)"
        @mouseenter="enterString(index, jindex, item.letter)"
        class="map-item"
        :style='"background:" + item.color'
      >
        {{item.letter}}
      </div>
    </div>
  </div>

  <div class="interface-wrapper">
    <div class="info-message"
      v-if="!gameStart || wordOutPattern || gameWin"
    >
      <p 
        class="word-message"
        v-if="!gameStart"
      >
        Выберите ширину поля:
      </p>
      <p 
        class="word-message"
        v-if="wordOutPattern"
      >
        Круто! Вы нашли слово, не предусмотренное шаблоном.
      </p>
      <p 
        class="word-message"
        v-if="gameWin"
      >
        Вы выиграли!
      </p>
    </div>
    <div class="select-width-wrapper">
      <select
        v-if="gameWin || !gameStart"
        v-model="width"
        class="select-width"
      >
        <option
        v-for="index in 8"
        :key="index"
        :value="index+2"
        >
          {{ (index+2)+'x'+(index+2) }}
        </option>
      </select>
    </div>
    
    <div class="button-wrapper">
      <button
        v-if="!gameWin" 
        class="button"
        @click="gameStart = !gameStart"
      >
        {{!gameStart ? 'Начать игру' : 'Закончить игру' }}
      </button>
      
      <button
        v-if="gameWin" 
        class="button"
        @click="gameRestart()"
      >
        Новая игра
      </button>
    </div>
  </div>
  
  
</template>

<script>

import { makeMapAndPattern } from './generator'
import { wordsBase } from './wordsBase'

export default {
  name: 'App',
  data() {
    return {
      gameStart: false,
      gameWin: false,
      selectStart: false,
      wordOutPattern: false,
      wordsSolved: 0,
      width: 3,
      colorOfSelect: '#FFF',
      map: [],
      vocabulary: [],
      selectedCells: [],
      selectedSymbols: '',
    }
  },

  methods : {
    switchSelectMode(i, j, symbol){
      if(!this.selectStart){
        if (!this.map[i][j].dead){
          this.startSelect(i, j, symbol);
        }
      } else {
         this.stopSelect();
      }
    },

    startSelect(i, j, symbol){
      // Обнуляем выделенные клетки и символы.
      this.selectedCells = [];
      this.selectedSymbols = [];
      
      // Заносим туда клетку, с которой начинается выделение.
      this.selectedCells.push([i,j]);
      this.selectedSymbols = this.selectedSymbols + symbol;
      
      // Назначаем цвет выделения и красим клетку.
      this.colorOfSelect = this.createColor();
      this.map[i][j].color = this.colorOfSelect;
      
      // Включаем режим выделения.
      this.selectStart = true;
      
      // Сбрасываем флаг, отвечающий за нахождения слова, не принадлежащее шаблону, но находящееся в базе. 
      this.wordOutPattern = false;
    },

    stopSelect(){
        // Относится ли введенное слово к решению?
        let flag = this.checkVocabulary();

        // Проверяем, есть ли введенное слово в базе, и является ли оно частью решения (шаблона). 
        this.wordOutPattern = 
        wordsBase[this.selectedSymbols.length - 3]
        ? wordsBase[this.selectedSymbols.length - 3].includes(this.selectedSymbols) && !flag
        : false;
        
        // Чистим карту, если флаг ложный, "убиваем" выделенные клетки, если флаг истинный.
        this.clearMap(flag);

        // Повышаем количество решенных слов и проверяем, не победил ли игрок.
        if(flag){
          this.wordsSolved++;
          if(this.wordsSolved === this.vocabulary.length){
            this.gameWin = true;
          }
        }
        
        // Сбрасываем выделенные клетки, символы и режим выделения
        this.selectedCells = [];
        this.selectedSymbols = '';
        this.selectStart = false;
    },

    clearMap(flag){
      this.selectedCells.forEach(item => {
        if (flag) {
          this.map[item[0]][item[1]].dead = true;
        } else {
          this.map[item[0]][item[1]].color = '#fff';
        }
      });
    },

    enterString(i, j, symbol){
      if (
      // Проверяем включено ли выделение.
      this.selectStart
      // Проверяем, не выделял ли игрок эту клетку ранее.
      && !this.selectedCells.find(el => el[0] == i && el[1] == j) 
      // Проверяем, что клетка не "выбыла" из игры.
      && !this.map[i][j].dead){
        // Проверка на то, что игрок "переходит" только на смежные клетки.
        if((Math.abs(this.selectedCells[this.selectedCells.length - 1][0] - i) === 1 &&
          Math.abs(this.selectedCells[this.selectedCells.length - 1][1] - j) === 0) ||
          (Math.abs(this.selectedCells[this.selectedCells.length - 1][0] - i) === 0 &&
          Math.abs(this.selectedCells[this.selectedCells.length - 1][1] - j) === 1)){
            this.selectedCells.push([i,j]);
            this.selectedSymbols = this.selectedSymbols + symbol;
            this.map[i][j].color = this.colorOfSelect;
        } else {
          // Если игрок сходил не на смежную клетку, выключаем выделение переключением режима
          this.switchSelectMode(
            this.selectedCells[this.selectedCells.length-1][0],
            this.selectedCells[this.selectedCells.length-1][1], ''
          );
        }
      }
    },

    // Функция для создания случайного цвета в #HEX формате.
    createColor(){
      let red = Math.floor(Math.random()*100);
      red = red + 150;

      let green = Math.floor(Math.random()*100);
      green = green + 150;

      let blue = Math.floor(Math.random()*100);
      blue = blue + 150;

      let color = '#' + red.toString(16) + green.toString(16) + blue.toString(16);
      
      return color;
    },
    
    // Функция проверяет, являются ли выделенные клетки словом, входящим в решение. 
    checkVocabulary(){
      let flag = false;
      for(let i = 0; i < this.vocabulary.length; i++){
        if (this.vocabulary[i].length === this.selectedCells.length){
          let allElementsEqual = true;

          for(let j = 0; j < this.vocabulary[i].length; j++){
            if (this.vocabulary[i][j][0] !== this.selectedCells[j][0] 
            || this.vocabulary[i][j][1] !== this.selectedCells[j][1])
              allElementsEqual = false;
          }

          if (allElementsEqual){
            flag = true;
            break;
          }
        }
      }
      return flag;
    },

    gameRestart(){
      const {map, pattern} = makeMapAndPattern(this.width);
      this.map = map;
      this.vocabulary = pattern; 

      this.gameWin = false;
      this.wordsSolved = 0;
    }
  },
  watch : {
    gameStart() {
      this.gameStart ? this.gameRestart() : '';
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

.map{
  background: black;
  border: 2px solid black;
  width: fit-content;

  margin: 40px auto 0;
}

.map-row{
  display: flex;
  flex-direction: row;
}

.map-item{
  border: 2px solid black;
  font-size: 24px;
  font-family: sans-serif;

  width: 40px;
  height: 40px;
  text-align: center;

  box-sizing: border-box;
  padding: 5px;

  background: rgb(250, 237, 219);

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently
                                  not supported by any browser */
}

.interface-wrapper{
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-family: sans-serif;
}

.info-message{
  padding: 10px 20px;
  background: rgba(199, 238, 192, 0.534);
  border: 3px solid rgb(6, 52, 138);

  max-width: 300px;
  text-align: center;
}

.button-wrapper{
  margin-top: 10px;
  width: fit-content;
}

.button{
  border: 3px solid rgb(6, 52, 138);
  background: rgba(199, 238, 192, 0.534);

  padding: 8px 10px;

  font-size: 20px;
  line-height: 20px;
}

.select-width-wrapper{
  margin-top: 10px;
  width: fit-content;
}
.select-width{
  background: #fff;
  box-sizing: border-box;
  border: 3px solid rgb(6, 52, 138);

  padding: 8px 10px 8px 23px;

  font-size: 20px;
  line-height: 20px;
  font-family: sans-serif;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

.select-width::-ms-expand { 
  display: none; 
} 
.select-width:hover { 
  border-color: rgb(185, 185, 185); 
} 
.select-width:focus {
  outline: none; 
} 

</style>
