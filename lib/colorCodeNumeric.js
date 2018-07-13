'use strict'

window.addEventListener("load", initFuncs)

function initFuncs() {
//DOM / view - concern
  function makeInput() {
    var nestedArr = []
    var shell = document.createElement("div")
    var middleShell = document.createElement("div")
    var innerShell = document.createElement("div")
    var input = document.createElement("input")
    input.className = "inputNumeric"
    input.setAttribute("type","text")
    input.id = "theInput"
    shell.className = "flexOuterCenter"
    middleShell.className = "controlPanel"
    innerShell.className = "flexOuterCenter"
    shell.appendChild(middleShell)
    middleShell.appendChild(innerShell)
    innerShell.appendChild(input)
    nestedArr = [shell, middleShell, innerShell, input]
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
    columnShell.id = "theOutput"
    centerShell.appendChild(textBox)
    textBox.appendChild(columnShell)
    columnShell.appendChild(firstRow)
    firstRow.appendChild(firstLine)
    nestedArr = [centerShell, textBox, columnShell, firstRow, firstLine]
    return nestedArr
  }

  function makeTenKey() {
    var shell = document.createElement("div")
    var shellLeft = document.createElement("div")
    var shellRight = document.createElement("div")
    var flexLeft = document.createElement("div")
    var flexRight = document.createElement("div")
    var text = ""
    var charKeysL = {}
    var charKeysR = {}
    var indexArrL = ["laquo","divide","times","7","8","9","4","5","6","1","2","3","0","point"]
    var indexArrR = ["minus","plus","equals"]
    var keyToHTML = { laquo: "&#171;", divide: "&#247;", times: "&#215;", point: "&#46;",
                      minus: "&#8722;", plus: "&#43;", equals: "&#61;" }
    for (let i = 0; i < indexArrL.length; i++) {
      charKeysL[indexArrL[i]] = document.createElement("div")
      text = isNaN(indexArrL[i]) ? keyToHTML[indexArrL[i]] : indexArrL[i]
      charKeysL[indexArrL[i]].innerHTML = text
      charKeysL[indexArrL[i]].className = i == 12 ? "keyCharLong" : "keyChar"
      charKeysL[indexArrL[i]].id = "_" + indexArrL[i]
      charKeysL[indexArrL[i]].addEventListener("click", function () {
        input.value += this.innerHTML
        initTenKey(indexArrL[i], true)
      })
      flexLeft.appendChild(charKeysL[indexArrL[i]])
      if (i < 3) {
        charKeysR[indexArrR[i]] = document.createElement("div")
        text = keyToHTML[indexArrR[i]]
        charKeysR[indexArrR[i]].innerHTML = text
        charKeysR[indexArrR[i]].className = i < 1 ? "keyChar" : "keyCharTall"
        charKeysR[indexArrR[i]].id = "_" + indexArrL[i]
        charKeysR[indexArrR[i]].addEventListener("click", function () {
          input.value += this.innerHTML
          initTenKey(indexArrR[i], true)
        })
        flexRight.appendChild(charKeysR[indexArrR[i]])
      }
    }
    shell.className = ""
    shell.id = "tenKey"
    shellLeft.className = "flexInnerCenter"
    shellLeft.id = "tenKeyLeft"
    shellRight.className = ""
    shellRight.id = "tenKeyRight"
    flexLeft.className = "flexOuterSpace"
    flexRight.className = "flexOuterColumn"
    shellRight.id = "tenKeyRight"
    shellRight.appendChild(flexRight)
    shellLeft.appendChild(flexLeft)
    shellLeft.appendChild(shellRight)
    shell.appendChild(shellLeft)
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

  function displayResult() {
    return true
  }

  function displayOperator() {
    
  }

  //data-processing cocnern
  function initTenKey(signal, bool) {
    var valMinusOp
    if (Number(signal) || signal == "point" || signal == "0") {
      console.log("number - " + signal)
      console.log(input.value)
      colorCodeNumeric(input.value)
    } else {
      console.log("operator - " + signal)
      console.log(input.value)
      valMinusOp = input.value.slice(0,input.value.length-1)
      listOperation(valMinusOp,operatorHTML.indexOf("&" + signal + ";"))
      makeNewLine()
      input.value = "";
    }
  }

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
        result = ops.indexOf(readarray[i])
        break
      }
    }
    return result
  }

  function calculateResult() {
    return true
  }

  function undoLastEntry() {
    return true
  }

  function listOperation(numStr,index) {
    var operator = []
    debug.innerHTML += "&nbsp" + numStr + "&nbsp;&nbsp;" + operatorHTML[index]
    trace.backtrace.push(Number(numStr))
    trace.backtrace.push(operatorHTML[index])
    switch (index) {
      case 4 :
        culculateResult()
      break
      case 5 :
        undoLastEntry()
      break
      default :
        displayOperator(index)
    }
  }
  /*
  //_M__A__I__N__
  */
  var debug = document.getElementById("test1")
  //data-processing cocnern
  var operator = false
  var trace = { backtrace: [], plusMinus: [], toCalculate: [], total: 0 }
  trace.rack = function () { return true }


  var parenths = ["(",")"]
  var ops = ["+","-","*","/","="]
  var operatorHTML = ["&plus;","&minus;","&times;","&divide;","&equals;","&laquo;"]
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
