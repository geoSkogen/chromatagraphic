'use strict'

function test(thisStr,thisObj) {
  var arr = []
  var keys = Object.keys(thisObj)
  for (let i = 0; i < keys.length; i++) {
    if (thisStr === thisStr + thisObj[keys[i]]) {
      arr.push(keys[i])
    }
  }
  return arr
}

var className = "className"
var myObj = {dash: "-", nothing: ""}

var testResult = test(className,myObj)
console.log(testResult)
