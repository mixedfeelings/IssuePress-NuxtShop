import { defineStore } from "pinia";

export const useColorStore = defineStore("color", {
  state: () => {
    return {
      list: [
          'aqua', 
          'blue',
          'bright-red',
          'burgundy',
          'copper',
          'coral',
          'cornflower',
          'flat-gold',
          'fluorescent-orange',
          'fluorescent-pink',
          'fluorescent-red',
          'fluorescent-yellow',
          'green',
          'kelly-green',
          'light-gray',
          'metallic-gold',
          'mint',
          'moss',
          'orange',
          'orchid',
          'red',
          'risofederal-blue',
          'sunflower',
          'yellow',
      ],
      color: null, //default value
    }
  },
  actions: {
    setGlobalColor() {
        const randomColor = Math.floor(Math.random() * this.list.length);
        this.color = this.list[randomColor];
    }
  },
  getters: {
    globalColor(state) {
      return state.color;
    }
  },
});