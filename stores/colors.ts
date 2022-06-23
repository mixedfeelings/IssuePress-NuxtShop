import { defineStore } from "pinia";

export const useColorStore = defineStore("color", {
  state: () => {
    return {
      list: [
          'aqua', 
          'blue',
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
          'purple',
          'riso-federal-blue',
          'scarlet',
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
    globalColor(state ) {
      return state.color;
    },
    globalTextColor(state) {
      switch(state.color) {
        case "black": 
        case "blue":
        case "brown": 
        case "burgundy":
        case "moss":
        case "riso-federal-blue":
        case "purple":
        case "light-gray":
          return "natural";
          break;
        default: 
          return "black";
          break;
      }
    }
  },
});
