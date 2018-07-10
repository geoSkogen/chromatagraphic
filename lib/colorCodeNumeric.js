'use strict'

window.addEventListener("load", initFuncs)

function initFuncs() {
//DOM / view - concern
  function makeInput() {
    var nestedArr = []
    var input = document.createElement("input")
    var shell = document.createElement("div")
    input.className = "inputNumeric"
    input.setAttribute("type","text")
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
    //var horizontalRule = document.createElement("div")
    centerShell.className = "flexOuterCenter"
    textBox.className =  "colorCodeNumeric"
    //horizontalRule.className = "customRule"
    columnShell.className = "flexOuterColumn"
    firstRow.className = "flexInnerColumn"
    firstLine.className = "flexOuterEnd"
    centerShell.appendChild(textBox)
    textBox.appendChild(columnShell)
    //textBox.appendChild(horizontalRule)
    columnShell.appendChild(firstRow)
    firstRow.appendChild(firstLine)
    nestedArr = [centerShell, textBox, columnShell, firstRow, firstLine]
    return nestedArr
  }

  function colorDivFactory(val) {
    var numVal = -1
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
    var charStr = ""
    var charNode
    if (isNaN(Number(val))) {
      if (parnenths.indexOf(val) != -1) {
        charStr = parenths[parnenths.indexOf(val)]
        charDiv.style.color = "pink"
      } else {
        charStr = ops[ops.indexOf(val)]
        charDiv.style.color = "cornflowerblue"
      }
    } else {
      charStr = val
      numVal = Number(val)
      charDiv.style.color = colors[numVal]
    }
    charNode =  document.createTextNode(charStr)
    charDiv.className = "char"
    charDiv.appendChild(charNode)
    return charDiv
  }

  function colorCodeNumeric(num) {
    var charArr = num.toString().split("")
    var rows = document.getElementsByClassName("flexInnerColumn")
    var thisRow = rows[rows.length-1]
    var thisLine = thisRow.firstChild
    thisLine.innerHTML = ""
    if (rows.length > 1) {
      rows[rows.length -2].id = ""
    }
    thisLine.id = "scrollToMe"
    for (let i = 0; i < charArr.length; i++) {
        thisLine.appendChild(colorDivFactory(charArr[i]))
    }
  }

  //data-processing cocnern
  function validateInput(strIn) {
    var result = ""
    var dead = [""," ", "  ","\t"]
    if (dead.indexOf(strIn) != -1 || parenths.indexOf(strIn) != -1 ||
        ops.indexOf(strIn) != -1 || Number(strIn)) {
        result = strIn
        return result
    } else {
      return false
    }
  }

  function listOperation(numStr,index) {
    var operator = []
    var operatorHTML = ["&plus;","&minus;","&times;","&divide;","&#61;"]
    debug.innerHTML += "&nbsp" + numStr + "&nbsp;&nbsp;" + operatorHTML[index]
    trace.push(Number(numStr))
    trace.push(operatorHTML[index])
  }

  var debug = document.getElementById("test1")
  var operator = false
  var trace = []
  var parenths = ["(",")"]
  var ops = ["+","-","*","/"]

  //DOM / View - concern
  var app = document.getElementById("app")
  var wrappedInput = makeInput()
  var wrappedOutput = makeTextBox()

  app.appendChild(wrappedInput[0])
  app.appendChild(wrappedOutput[0])
  //Waits for operator input: +,-,*,/,enter
  wrappedInput[1].addEventListener("keydown", function () {
    var operatorCodes = [107,109,106,111,13]
    if (operatorCodes.indexOf(event.keyCode) != -1 ) {
      operator = true
      listOperation(wrappedInput[1].value,operatorCodes.indexOf(event.keyCode))
      console.log(wrappedInput[1].value)
    }
  })
  //binds view to keyboard input
  //starts a new line if the last character was an operator
  wrappedInput[1].addEventListener("keyup", function () {
    var innerRow
    var newLine
    var inputVal = this.value
    var validVal = ""
    if (!operator) {
      validVal = validateInput(inputVal)
      //validVal = true
      if (validVal) {
        colorCodeNumeric(inputVal)
      }
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
