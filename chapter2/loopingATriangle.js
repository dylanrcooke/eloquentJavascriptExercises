/*
Looping a triangle
Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######
*/

const baseTriangleWidth = 7;
[...Array(baseTriangleWidth).keys()].map(idx => {
    const output = [...Array(idx + 1)].reduce(acc => acc + '#', '');
    console.log(output);
});