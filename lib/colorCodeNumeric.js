'use strict'

window.addEventListener("load", initFuncs)

function initFuncs() {

  function makeInput() {
    var nestedArr = []
    var input = document.createElement("input")
    var shell = document.createElement("div")
    input.className = "inputNumeric"
    input.setAttribute("type","number")
    shell.className = "flexOuterCenter"
    shell.appendChild(input)
    nestedArr = [shell, input]
    return nestedArr
  }

  function makeTextBox() {
    var nestedArr = []
    var centerShell = document.createElement("div")
    var textBox = document.createElement("div")
    var columnShell = document.createElement("div")
    var firstRow = document.createElement("div")
    var firstLine = document.createElement("div")
    var firstKey = document.createElement("div")
    centerShell.className = "flexOuterCenter"
    textBox.className =  "colorCodeNumeric"
    columnShell.className = "flexOuterColumn"
    firstRow.className = "flexInnerColumn"
    firstLine.className = "flexOuterEnd"
    centerShell.appendChild(textBox)
    textBox.appendChild(columnShell)
    columnShell.appendChild(firstRow)
    firstRow.appendChild(firstLine)
    nestedArr = [centerShell, textBox, columnShell, firstRow, firstLine]
    return nestedArr
  }

  function colorDivFactory(val) {
    var numVal = Number(val)
    var colors = [
      "white",
      "grey",
      "blue",
      "green",
      "yellow",
      "red",
      "purple",
      "lightgreen",
      "lightsteelblue",
      "orange"
    ]
    var charDiv = document.createElement("div")
    var numStr = document.createTextNode(val)
    charDiv.style.color = colors[numVal]
    charDiv.className = "char"
    charDiv.appendChild(numStr)
    return charDiv
  }

  function colorCodeNumeric(num) {
    var charArr = num.toString().split("")
    var rows = document.getElementsByClassName("flexInnerColumn")
    var thisRow = rows[rows.length-1]
    var thisLine = thisRow.firstChild
    thisLine.innerHTML = ""
    for (let i = 0; i < charArr.length; i++) {
        thisLine.appendChild(colorDivFactory(charArr[i]))
    }
  }

  var debug = document.getElementById("test1")

  var operator = false
  var app = document.getElementById("app")
  var wrappedInput = makeInput()
  var wrappedOutput = makeTextBox()
  app.appendChild(wrappedInput[0])
  app.appendChild(wrappedOutput[0])

  wrappedInput[1].addEventListener("keydown", function () {
    var operatorCodes = [107,109,106,111,13]
    if (operatorCodes.indexOf(event.keyCode) != -1 ) {
      operator = true
    }
  })

  wrappedInput[1].addEventListener("keyup", function () {
    var innerRow
    var newLine
    var inputVal = this.value
    if (!operator) {
      colorCodeNumeric(inputVal)
    } else {
      var innerRow = document.createElement("div")
      var newLine = document.createElement("div")
      newLine.className = "flexOuterEnd"
      innerRow.className = "flexInnerColumn"
      wrappedOutput[2].appendChild(innerRow)
      innerRow.appendChild(newLine)
      wrappedInput[1].value = ""
      wrappedInput[1].focus()
      operator = false
    }
  })

}
