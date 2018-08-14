'use strict'

window.addEventListener("load", initFuncs)

function initFuncs() {
/*
//
// this is the DOM/view concern
//
*/
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
    middleShell.className = "inputPanel"
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
    firstLine.id = "scrollToMe"
    columnShell.id = "theOutput"
    textBox.id = "textBox"
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
    var oldLine
    if (document.getElementById("scrollToMe")) {
      oldLine = document.getElementById("scrollToMe")
      oldLine.id = ""
    }
    newLine.id = "scrollToMe"
    newLine.className = "flexOuterEnd"
    innerRow.className = "flexInnerColumn"
    innerRow.appendChild(newLine)
    output.appendChild(innerRow)
    input.value = ""
  }

  function makeModal(boxId,textShellId) {
    var shell = document.createElement("div")
    var box = document.createElement("div")
    var innerShell = document.createElement("div")
    var closeBox = document.createElement("div")
    var textShell = document.createElement("div")
    shell.className = "flexOuterCenter"
    box.id = boxId
    innerShell.className = "relShell"
    closeBox.className = "closeModal"
    closeBox.innerHTML = "&times;"
    textShell.className = "flexOuterCenter"
    textShell.id = textShellId
    innerShell.appendChild(closeBox)
    box.appendChild(innerShell)
    box.appendChild(textShell)
    shell.appendChild(box)
    closeBox.addEventListener("click", function () {
      box.style.display = "none";
    })
    return shell
  }

  function makeConsole () {
    var form = document.createElement("form")
    var radioLabel = document.createElement("div")
    var radioLabelText = document.createTextNode("mode")
    var clearButton = document.createElement("div")
    var clearButtonText = document.createTextNode("clear")
    var formShells = [{},{},{},{}]
    var radioArr = [{},{}]
    var boolArr = [false, true]
    var displayArr = ["none","block"]
    var labelArr = [{},{}]
    var attrArr = [["type","radio"],["name","mode"]]
    var idArr = ["OrderOfOperations","LineByLineSubTotal"]
    for (let i = 0; i < formShells.length; i++) {
      formShells[i] = document.createElement("div")
      formShells[i].className = "flexOuterCenter"
      formShells[i].id = "formShell" + i.toString()
      form.appendChild(formShells[i])
    }
    radioLabel.appendChild(radioLabelText)
    radioLabel.className = "radioLabel"
    formShells[0].appendChild(radioLabel)
    for (let i = 0; i < radioArr.length; i++) {
      radioArr[i] = document.createElement("input")
      labelArr[i] = document.createElement("div")
      labelArr[i].className = "radioButtonLabel"
      labelArr[i].innerHTML = idArr[i]
      radioArr[i].setAttribute(attrArr[0][0],attrArr[0][1])
      radioArr[i].setAttribute(attrArr[1][0],attrArr[1][1])
      radioArr[i].value = idArr[i]
      radioArr[i].id = idArr[i]
      radioArr[i].onchange = function () {
        controller.lineCalc = boolArr[i]
        subTotal.style.display = displayArr[i]
      }
      formShells[1].appendChild(radioArr[i])
      formShells[2].appendChild(labelArr[i])
    }
    clearButton.className = "clearButton"
    clearButton.appendChild(clearButtonText)
    clearButton.addEventListener("click", clearOperation)
    formShells[3].appendChild(clearButton)
    return form
  }

  function displayControlPanel() {
    controlPanel.style.display = "block"
  }

  function displayResults(num, idStr, elm) {
    var charArr = num.toString().split("")
    var thisLine = document.getElementById(idStr)
    elm.style.display = "block"
    thisLine.innerHTML = ""
    for (let i = 0; i < charArr.length; i++) {
        thisLine.appendChild(colorDivFactory(charArr[i]))
    }
    return true
  }

  function displayOperator(indexNo) {
    var char = operatorHTML[indexNo]
    var charDiv = document.createElement("div")
    var lines = document.getElementsByClassName("flexInnerColumn")
    var newLine = lines[lines.length-1]
    wrappedOutput[1].style.paddingBottom = "1.36em"
    charDiv.className = "opChar"
    charDiv.innerHTML = char
    newLine.appendChild(charDiv)
    return true
  }

  function colorDivFactory(val) {
    var numVal = -1
    var colors = [
      "white",
      "whitesmoke",
      "blue",
      "green",
      "gold",
      "firebrick",
      "purple",
      "greenyellow",
      "cornflowerblue",
      "darkorange"
    ]
    var charDiv = document.createElement("div")
    var charStr = ""
    var charNode
    if (isNaN(val)) {
      if (parenths.indexOf(val) != -1 || val == ".") {
        charStr = val != "." ? parenths[parenths.indexOf(val)] : val
        charDiv.style.color = "orchid"
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
    wrappedOutput[1].style.paddingBottom = "0.16em"
    thisLine.innerHTML = ""
    for (let i = 0; i < charArr.length; i++) {
        thisLine.appendChild(colorDivFactory(charArr[i]))
    }
  }
  /*
  //
  // Data-processing cocnern
  //
  */
  function initTenKey(signal, bool) {
    var val = cleanInputString(input.value)
    var valMinusOp
    currentLine = document.getElementById("scrollToMe")
    textBox.style.display = "block"
    if ((Number(signal) || signal == "point" || signal == "0")) {
      console.log("number - " + signal)
      console.log(input.value)
      colorCodeNumeric(val)
    } else {
      input.value = ""
      if (currentLine.innerHTML.length >= 1) {
        console.log("operator - " + signal)
        console.log(input.value)
        if (signal != "equals") { makeNewLine() }
        valMinusOp = val.slice(0,input.value.length-1)
        listOperation(val,operatorHTML.indexOf("&" + signal + ";"))
        controller.operatorOnly = false
      } else {
        if (signal === "laquo") { displayControlPanel() }
      }
    }
  }

  function cleanInputString(badinput) {
    var goodinput = ""
    var badarray = badinput.split("")
    var len = badarray.length
    var isFloat = false
    for (let i = 0; i < len; i++) {
      if (!isNaN(badarray[i]) || (badarray[i] == "." && !isFloat)) {
        goodinput += badarray[i]
        if (goodinput[i] == ".") {
          isFloat = true
        }
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

  function mult(subtotal,arg) {
    return subtotal *= arg
  }

  function div(subtotal, arg) {
    return subtotal /= arg
  }

  function rack(subtotal, arg) {
    return subtotal += arg
  }

  function recursiveOps(arr,needsFirstArg,arg,verb) {
    var runningtotal = needsFirstArg? arg : arr[0]
    var startloop = needsFirstArg? 0 : 1
    for (let iv = startloop; iv < arr.length; iv++) {
      switch(verb) {
        case "times":
          runningtotal = mult(runningtotal, arr[iv])
          break
        case "divide" :
          runningtotal = div(runningtotal, arr[iv])
          break
        default :
          runningtotal = rack(runningtotal, arr[iv])
      }
    }
    return runningtotal
  }

  function clearOperation() {
    output.innerHTML = ""
    makeNewLine()
    textBox.style.display = "none"
    //subTotal.style.display = "none"
    results.style.display = "none"
    document.getElementById("resultsText").innerHTML = ""
    document.getElementById("subTotalText").innerHTML = ""
    debug.innerHTML = ""
    trace.reRack()
    trace.total = 0
    trace.reRacks = 0
    trace.backtrace = []
  }

  function calculateResults() {

    function multDivOperation(index) {
      var subvalue = 0
      var truevalue = 0
      switch(trace.firstArg[index]) {
        case "times":
          console.log("calling recursive multiplication first")
          subvalue = recursiveOps(trace.times[index],false,0,"times")
          console.log("got " + subvalue.toString())
          if (trace.divide[index].length) {
            truevalue = recursiveOps(trace.divide[index],true,subvalue,"divide")
            console.log("piping result to recursive division")
            console.log("got " + truevalue.toString())
          } else {
            truevalue = subvalue
          }
          break
        case "divide" :
          console.log("calling recursive division first")
          subvalue = recursiveOps(trace.divide[index],false,0,"divide")
          console.log("got " + subvalue.toString())
          if (trace.times[index].length) {
            truevalue = recursiveOps(trace.times[index],true,subvalue,"times")
            console.log("piping result to recursive multiplication")
            console.log("got" + truevalue.toString())
          } else {
            truevalue = subvalue
          }
          break
        default :
          console.log("get real")
      }
      return truevalue
    }

    function substitutionOperation() {
      var newbacktrace = trace.backtrace
      var returnbacktrace = []
      var subVal = 0
      for (let ii = 0; ii < trace.indexIndex.length; ii++) {
        subVal = multDivOperation(ii)
        trace.subVals.push(subVal)
        for (let iii = 0; iii < trace.indexIndex[ii].length; iii++) {
          newbacktrace[trace.indexIndex[ii][iii]] = iii == 0? subVal : null
        }
      }
      for (let v = 0; v < newbacktrace.length; v++) {
        if (newbacktrace[v] != null) {
          returnbacktrace.push(newbacktrace[v])
        }
      }
      console.log(trace.subVals)
      return returnbacktrace
    }

    function traceOperation(index,isNewStage,isMultDiv) {
      var verb = trace.backtrace[index].slice(1,trace.backtrace[index].length-1)
      if (isNewStage) {
        if (isMultDiv) {
          trace.times.push([])
          trace.divide.push([])
          trace.indexIndex.push([])
          if (!trace.firstArg[trace.times.length-1]) {
            trace.firstArg.push(verb)
          }
          trace[verb][trace[verb].length-1].push(
            trace.backtrace[index-1],
            trace.backtrace[index+1]
          )
          trace.indexIndex[trace.indexIndex.length-1].push(index-1,index,index+1)
          console.log(
            "started new " + verb + " [" + (trace[verb].length-1).toString() +
            "] at case number " + (index-1).toString()
          )
        }
      } else if (isMultDiv) {
        trace[verb][trace[verb].length-1].push(trace.backtrace[index+1])
        trace.indexIndex[trace[verb].length-1].push(index,index+1)
        console.log(
          "added " + trace.backtrace[index+1] + "to " + verb + " [" +
          (trace[verb].length-1).toString() + "]"
        )
      } else {
        console.log("no substitution required")
      }
    }
    /*
    //_calculateResults _M__A__I__N_
    */
    var sumArr = []
    var summary = []
    var sum = 0

    trace.indexMultDiv = false
    if (trace.backtrace.length == 2 && trace.backtrace[1] == "&equals;") {
      sum = trace.backtrace[0]
    } else {
      if (controller.lineCalc == true) {
        sum = trace.lineCalcSubTotal()
        trace.total = sum
      } else {
        for (let i = 1; i < trace.backtrace.length; i+=2) {
          console.log("backtrace[" + i.toString() + "]" + trace.backtrace[i])
          switch(trace.backtrace[i]) {
            case "&plus;" :
            case "&minus;" :
              console.log("PlusMinus")
              if (trace.indexMultDiv == true) {
                trace.indexMultDiv = false
                traceOperation(i,true,trace.indexMultDiv)
              } else {
                traceOperation(i,false,trace.indexMultDiv)
              }
              break
            case "&times;" :
            case "&divide;" :
               console.log("MultDiv")
               if (trace.indexMultDiv == false) {
                 trace.indexMultDiv = true
                 traceOperation(i,true,trace.indexMultDiv)
               } else {
                 traceOperation(i,false,trace.indexMultDiv)
               }
               break;
            default :
               console.log("_defualt_")
          }
        }
        console.log(JSON.stringify(trace))
        summary = substitutionOperation()
        console.log(summary)
        for (let i = 0; i < summary.length; i+=2) {
          if (i != 0 && summary[i-1] == "&minus;") {
            sumArr.push(summary[i] - (summary[i]*2))
          } else {
            sumArr.push(summary[i])
          }
        }
        sum = recursiveOps(sumArr,false,0,"sum")
        trace.total = sum
      }
    }
    trace.reRack()
    //input.focus()
    input.value = ""
    console.log("sum:")
    console.log(sum)
    return sum
  }

  function undoLastEntry() {
    return true
  }

  function listOperation(numStr,index) {
    var operator = []
    var total = 0
    if (trace.backtrace.length != 1) { trace.backtrace.push(Number(numStr)) }
    if (index != 5) { trace.backtrace.push(operatorHTML[index]) }
    debug.innerHTML = trace.backtrace
    //console.log(trace.backtrace[-1])
    switch (index) {
      case 4 :
        total = calculateResults()
        displayResults(total,"resultsText", results)
      break
      case 5 :
        displayControlPanel()
      break
      default :
        displayOperator(index)
        if (controller.lineCalc) {
          total = trace.backtrace.length >= 4 ?
            trace.lineCalcSubTotal() : trace.backtrace[0]
          trace.total = total
          displayResults(total, "subTotalText", subTotal)
        }
    }
  }
  /*
  //
  //_M__A__I__N_
  //
  */
  var debug = document.getElementById("test1")
  /*
  // Data-processing cocnern
  */
  var operator = false// did the keyboard keydown event just type an operator?
  var falseOperator = false// did the keyboard keydown type two operators in a row?
  var trace = { backtrace: [], plus: [], minus: [], times: [], divide: [],
                total: 0, indexIndex: [], firstArg: [], subVals: [], reRacks: 0 }
  var controller = { lineCalc : false, base: 10, operatorOnly: false }

  trace.lineCalcSubTotal = function () {
    var args = [trace.total]
    var opStr = trace.backtrace[trace.backtrace.length - 3].slice(
      1,
      trace.backtrace[trace.backtrace.length - 3].length-1
    )
    if (opStr == "minus") {
      args.push(
        trace.backtrace[trace.backtrace.length - 2] -
        (trace.backtrace[trace.backtrace.length - 2] * 2)
      )
    } else {
      args.push(trace.backtrace[trace.backtrace.length - 2])
    }
    trace.total = recursiveOps(args,false,0,opStr)
    return trace.total
  }

  trace.reRack = function () {
    var tracekeys = Object.keys(trace)
    var protectedKeys = ["total","reRacks","lineCalcSubTotal","reRack"]
    for (let i = 0; i < tracekeys.length; i++) {
      if (protectedKeys.indexOf(tracekeys[i]) === -1)
        trace[tracekeys[i]] = []
    }
    trace.backtrace.push(trace.total)
    trace.reRacks += 1
  }
  /*
  // References
  */
  var parenths = ["(",")"]
  var ops = ["+","-","*","/","="]
  var operatorHTML = [
    "&plus;","&minus;","&times;","&divide;","&equals;","&laquo;"
    ]
  var operatorCodes = [107,109,106,111,13]
  var tenKeyCodes = [96,97,98,99,100,101,102,103,104,105]
  var numKeyCodes = [48,89,50,51,52,53,54,55,56,57]
  var shift = 16
  /*
  //DOM / View - concern
  */
  var app = document.getElementById("app")
  var wrappedInput = makeInput()
  var wrappedOutput = makeTextBox()
  var tenKey = makeTenKey()
  var resultsModal = makeModal("resultsBox","resultsText")
  var subTotalModal = makeModal("subTotalBox","subTotalText")
  var controlPanelModal = makeModal("controlPanelBox","controlPanelText")
  var formConsole = makeConsole()
  var input//actual html-form-style input; it's {display:none;}
  var output//stump onto which new lines of datra are grafted it's .flexOuterColumn
  var results//modal displaying the sum; it's {display:none;}
  var textBox//backdrop for the output column
  var subTotal//modal displaying the sum
  var controlPanel//modal displaying the options
  var controlPanelConsole//stump onto which the options form is grafted
  var currentLine
  /*
  // Building the DOM
  */
  app.appendChild(subTotalModal)
  app.appendChild(resultsModal)
  app.appendChild(controlPanelModal)
  app.appendChild(wrappedInput[0])
  app.appendChild(wrappedOutput[0])
  app.appendChild(tenKey)
  input = document.getElementById("theInput")
  output = document.getElementById("theOutput")
  results = document.getElementById("resultsBox")
  textBox = document.getElementById("textBox")
  subTotal = document.getElementById("subTotalBox")
  controlPanel = document.getElementById("controlPanelBox")
  controlPanelConsole = document.getElementById("controlPanelText")
  controlPanelConsole.appendChild(formConsole)
  //
  window.addEventListener("keydown", function () {input.focus()})
  /*
  // The hidden input listens for keyboard events
  */
  // 1. Waits for operator input: +,-,*,/,enter on keydown
  input.addEventListener("keydown", function () {
    var val = this.value
    var index = operatorCodes.indexOf(event.keyCode)
    var validVal = ""
    var testOperator
    currentLine = document.getElementById("scrollToMe")
    textBox.style.disply = "block"
    if (operator) {
      return false
    }

    if (index != -1 ) {
      if (currentLine.innerHTML.length < 1) {
        falseOperator = true
        return false
      } else {
        operator = true
        if (index != 4 ) { makeNewLine() }
        listOperation(val,index)
      }
      //console.log(val)
    }
  })
  // 2. Binds view to keyboard input--
  //  - starts a new line if the last character was an operator
  //  - will process all sting-input (not keyCoded, e.g. mobile keypad input)
  //  operators, except "+" for whatever reason
  input.addEventListener("keyup", function () {
    var inputVal = this.value
    var validVal = ""
    var testOperator
    currentLine = document.getElementById("scrollToMe")
    if (!falseOperator) {
      textBox.style.display = "block"
    } else {
      if (document.getElementsByClassName("flexInnerColumn").length == 1) {
        textBox.style.display = "none"
      }
      falseOperator = false
    }
    //this is basically error-proofing against fat-fingering the 10key on an
    //actual keyboard - if there are mulitple keys down, the first operator key
    //that is released will register as the current operator and end the line
    if (!operator) {
      testOperator = parseInputString(inputVal)
      //console.log(testOperator)
      validVal = cleanInputString(inputVal)
      input.value = validVal
      if (testOperator) {
        //if (currentLine.innerHTML.length >= 1) {
        if (testOperator != 4) { makeNewLine() }
        listOperation(validVal,testOperator)
        //console.log(validVal)
        operator = false
        controller.operatorOnly = false
        //}
      } else {
        colorCodeNumeric(validVal)
      }
    } else {
      operator = false
      controller.operatorOnly = false
      //makeNewLine()
    }
  })
}
