//  Retry
//  Say you have a function primitiveMultiply that in 20 percent of cases multiplies two numbers and in the other 80 percent of cases raises an     exception of type MultiplicatorUnitFailure. Write a function that wraps this clunky function and just keeps trying until a call succeeds, after which it returns the result.
// 
// Make sure you handle only the exceptions you are trying to handle.

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
    let output;
    do {
        try {
            output = primitiveMultiply(a, b);
        } catch(e) {
            if (e instanceof MultiplicatorUnitFailure) {
                console.error("Multiplication error: ", e.message);
            } else {
                throw e;
            }
        }
    } while (output === undefined)
    return output;
}

console.log(reliableMultiply(8, 8));
// → 64