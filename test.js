'use strict'
/*
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
*/
var myinput = document.getElementsByTagName("input")[0]
var myoutput = document.getElementById("testMe")
//myinput.focus()
window.addEventListener("keydown", function () {
  myoutput.innerHTML += "keydown"
})
