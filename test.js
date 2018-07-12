'use strict'
function cleanInputString(badinput) {
  var goodinput = ""
  var badarray = badinput.split("")
  var len = badarray.length

  for (let i = 0; i < len; i++) {
    if (!isNaN(badarray[i])) {
      goodinput += badarray[i]
    }
  }
  return goodinput
}

var input = document.getElementById("testInput")
var val = Number(input.value) * 1000
var output = document.getElementById("test1")
output.innerHTML = val
