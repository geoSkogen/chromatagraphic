'use strict'

window.addEventListener("load", initFuncs)

function initFuncs() {
//DOM / view - concern
  function makeInput() {
    var nestedArr = []
    var input = document.createElement("input")
    var shell = document.createElement("div")
    var innerShell = document.createElement("div")
    var nextShell = document.createElement("div")
    input.className = "inputNumeric"
    input.setAttribute("type","text")
    input.id = "theInput"
    shell.className = "flexOuterCenter"
    nextShell.className = "flexOuterCenter"
    innerShell.className = "controlPanel"
    shell.appendChild(innerShell)
    innerShell.appendChild(nextShell)
    nextShell.appendChild(input)
    nestedArr = [shell, innerShell, nextShell, input]
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
    columnShell.id = "theOutput"
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

  function makeTenKey() {
    var shell = document.createElement("div")
    var shellLeft = document.createElement("div")
    var text = ""
    var charKeys = {}
    var indexArr = ["showInput","backslash","asterisk","7","8","9","4","5","6","1","2","3","0","point"]
    var keyToHTML = { showInput: "&#91;&#93;", backslash: "&#247;", asterisk: "&#215;", point: "&#46;",
                      dash: "&#8722;", plus: "&#43;", equals: "&#61;" }
    for (let i = 0; i < indexArr.length; i++) {
      charKeys[indexArr[i]] = document.createElement("div")
      if (isNaN(indexArr[i])) {
        text = keyToHTML[indexArr[i]]
      } else {
        text = indexArr[i]
      }
      charKeys[indexArr[i]].innerHTML = text
      charKeys[indexArr[i]].className = "keyChar"
      charKeys[indexArr[i]].addEventListener("click", function () {
        input.value += this.textValue
      })
      shellLeft.appendChild(charKeys[indexArr[i]])
    }
    shell.appendChild(shellLeft)
    shellLeft.className = "flexOuterspace"
    shellLeft.id = "tenKeyLeft"
    shell.className = "flexOuterCenter"
    shell.id = "tenKey"
    return shell
  }

  function makeNewLine() {
    var innerRow = document.createElement("div")
    var newLine = document.createElement("div")
    newLine.className = "flexOuterEnd"
    innerRow.className = "flexInnerColumn"
    innerRow.appendChild(newLine)
    output.appendChild(innerRow)
    input.value = ""
    input.focus()
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
    if (isNaN(val)) {
      if (parenths.indexOf(val) != -1 || val == ".") {
        charStr = val != "." ? parenths[parenths.indexOf(val)] : val
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
      if (!isNaN(badarray[i]) || badarray[i] == ".") {
        goodinput += badarray[i]
      }
    }
    return goodinput
  }

  function parseInputString(mobileinput) {
    var readarray = mobileinput.split("")
    var len = readarray.length
    var result = false
    for (let i = 0; i < len; i++) {
      if (ops.indexOf(readarray[i]) != -1) {
        /*
        console.log("trial " + i)
        console.log(readarray[i] + " IS part of the set: ")
        console.log(ops)
        */
        result = ops.indexOf(readarray[i])
        break
      }
      /*
      console.log("trial " + i)
      console.log(readarray[i] + " is not part of the set: ")
      console.log(ops)
      */
    }
    return result
  }

  function listOperation(numStr,index) {
    var operator = []
    debug.innerHTML += "&nbsp" + numStr + "&nbsp;&nbsp;" + operatorHTML[index]
    trace.push(Number(numStr))
    trace.push(operatorHTML[index])
  }
  /*
  //_M__A__I__N__
  */
  var debug = document.getElementById("test1")
  //data-processing cocnern
  var operator = false
  var trace = []
  var parenths = ["(",")"]
  var ops = ["+","-","*","/","="]
  var operatorHTML = ["&plus;","&minus;","&times;","&divide;","&#61;"]
  var operatorCodes = [107,109,106,111,13]
  var tenKeyCodes = [96,97,98,99,100,101,102,103,104,105]
  var numKeyCodes = [48,89,50,51,52,53,54,55,56,57]
  var shift = 16

  //DOM / View - concern
  var app = document.getElementById("app")
  var wrappedInput = makeInput()
  var wrappedOutput = makeTextBox()
  var tenKey = makeTenKey()
  var input
  var output

  app.appendChild(wrappedInput[0])
  app.appendChild(wrappedOutput[0])
  app.appendChild(tenKey)
  input = document.getElementById("theInput")
  output = document.getElementById("theOutput")
  input.focus()
  //Waits for operator input: +,-,*,/,enter
  input.addEventListener("keydown", function () {
    var val = this.value
    var index = operatorCodes.indexOf(event.keyCode)
    var validVal = ""
    var testOperator
    if (operator) {
      return false
    }
    if (index != -1 ) {
      operator = true
      listOperation(val,index)
      //console.log(val)
    }
  })
  //binds view to keyboard input
  //starts a new line if the last character was an operator
  //will process all sting-input (not keyCoded, e.g. mobile input) operators
  //except "+" for whatever reason
  input.addEventListener("keyup", function () {
    var inputVal = this.value
    var validVal = ""
    var testOperator
    if (!operator) {
      testOperator = parseInputString(inputVal)
      //console.log(testOperator)
      validVal = cleanInputString(inputVal)
      input.value = validVal
      if (testOperator) {
        listOperation(validVal,testOperator)
        //console.log(validVal)
        operator = false
        makeNewLine()
      } else {
        colorCodeNumeric(validVal)
      }
    } else {
      operator = false
      makeNewLine()
    }
  })
}
