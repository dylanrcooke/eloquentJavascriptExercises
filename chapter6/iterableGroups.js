// Iterable groups
// Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.
// 
// If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.
// 
// It is okay if your iterator behaves strangely when the group is modified during iteration.
const { Group } = require("./groups");

Group.prototype.from = function(values) {
    const output = new Group();
    values.map(val => output.add(val));
    return new GroupIterator(output);
}

class GroupIterator {
    constructor(group) {
        this.idx = 0;
        this.group = group;
    }

    next() {
        if(this.idx === this.group.values.length) return { done: true };
        const value = this.group.values[this.idx];
        this.idx++;
        return { value, done: false };
    }
}

Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c