'use strict'

function resetProps() {
  var keys = Object.keys(myObj)
  for (let i = 0; i < keys.length; i++) {
    myObj[keys[i]] = (keys[i] === "b")? "B" : i
  }
}
var myObj = {a : "a", b: "b", c: "c"}
resetProps(myObj)

console.log(JSON.stringify(myObj))
