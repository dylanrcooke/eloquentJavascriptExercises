// Dominant writing direction
// Write a function that computes the dominant writing direction in a string of text. Remember that each script object has a direction property that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).

// The dominant direction is the direction of a majority of the characters that have a script associated with them. The characterScript and countBy functions defined earlier in the chapter are probably useful here.

const { characterScript, countBy } = require("./05_higher_order");

function dominantDirection(text) {
    let directions = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({direction}) => direction != "none");
    
    return directions.reduce((output, val) => {
        return output.name === undefined || output.count < val.count ? val : output;
    }, {}).name;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl