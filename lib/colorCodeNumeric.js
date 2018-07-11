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
      if (parenths.indexOf(val) != -1) {
        charStr = parenths[parenths.indexOf(val)]
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

  function listOperation(numStr,index) {
    var operator = []
    var operatorHTML = ["&plus;","&minus;","&times;","&divide;","&#61;"]
    debug.innerHTML += "&nbsp" + numStr + "&nbsp;&nbsp;" + operatorHTML[index]
    trace.push(Number(numStr))
    trace.push(operatorHTML[index])
  }

  var debug = document.getElementById("test1")
  //data-processing cocnern
  var operator = false
  var trace = []
  var parenths = ["(",")"]
  var ops = ["+","-","*","/"]
  var operatorCodes = [107,109,106,111,13]
  var tenKeyCodes = [96,97,98,99,100,101,102,103,104,105]
  var numKeyCodes = [48,89,50,51,52,53,54,55,56,57]
  var shift = 16


  //DOM / View - concern
  var app = document.getElementById("app")
  var wrappedInput = makeInput()
  var wrappedOutput = makeTextBox()

  app.appendChild(wrappedInput[0])
  app.appendChild(wrappedOutput[0])
  //Waits for operator input: +,-,*,/,enter
  wrappedInput[1].addEventListener("keydown", function () {
    var val = wrappedInput[1].value
    var index = operatorCodes.indexOf(event.keyCode)
    var validVal = ""
    if (operator) {
      return false
    }
    if ( index != -1 ) {
      operator = true
      listOperation(val,index)
      console.log(val)
    } else {
      validVal = cleanInputString(val)
      if (validVal) {
        wrappedInput[1].value = validVal
      }
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
      validVal = cleanInputString(inputVal)
      if (validVal) {
        wrappedInput[1].value = validVal
        colorCodeNumeric(validVal)
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
