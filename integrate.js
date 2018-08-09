'use strict'

window.addEventListener("load", initFuncs)

function initFuncs() {
/*
//
// this is the DOM/view concern
//
*/
 function findKeys() {
   var classNames = ["keyChar","keyCharLong","keyCharTall"]
   var keys = []
   var classedElms = []
   var tenKeyArg = ""
   for (let i = 0; i < classNames.length; i++) {
     classedElms = document.getElementsByClassName(classNames[i])
     for (let ii = 0; ii < classedElms.length; ii++) {
         classedElms[ii].addEventListener("click",function () {
         input.value += this.innerHTML
         tenKeyArg = isNaN(this.innerHTML) ?
            this.id :
            this.innerHTML
        console.log(tenKeyArg)
         initTenKey(tenKeyArg, true)
       })
       keys.push(classedElms[ii])
     }
   }
   return keys
 }

 function clickToClose(elmToClick,elmToClose) {
   elmToClick.addEventListener("click", function () {
     console.log("this is clickToClose()")
     elmToClose.style.display = "none"
   })
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

  function makeViewComponent(classStr) {
    var outerShell = document.createElement("div")
    var perspectiveShell = document.createElement("div")
    var flexShell = document.createElement("div")
    var opShell = document.createElement("div")
    var charShell = document.createElement("div")
    outerShell.className = "flexInnerColumn"
    perspectiveShell.className = classStr
    flexShell.className = "flexOuterBetween"
    opShell.className = "flexOuterStart"
    charShell.className = "flexOuterEnd"
    document.getElementById("currentOperator").id = ""
    document.getElementById("currentLine").id = ""
    opShell.id = "currentOperator"
    charShell.id = "currentLine"
    flexShell.appendChild(opShell)
    flexShell.appendChild(charShell)
    perspectiveShell.appendChild(flexShell)
    outerShell.appendChild(perspectiveShell)
    return outerShell
  }

  function makeNewLine() {
    var appendClasses = ["_awayTop","_awayBottom","_relaxed","_basic"]
    var baseClass = "perspectiveShell"
    var shellElms = []
    var elmsByType = { operators: [], lines: [] }
    var dataByType = { opSymbols: [], lineDivs: [] }
    var elm = {}
    var className = ""
    for (let i = 0; i < appendClasses.length; i++) {
      className = baseClass + appendClasses[i]
      elm = document.getElementsByClassName(className)[0]
      shellElms.push(elm)
      elmsByType.operators.push(elm.children[0].children[0])
      elmsByType.lines.push(elm.children[0].children[1])
      dataByType.opSymbols.push(elm.children[0].children[0].innerHTML)
      dataByType.lineDivs.push(elm.children[0].children[1].innerHTML)
    }
    dataByType.opSymbols.shift()
    dataByType.lineDivs.shift()
    dataByType.opSymbols.push("")
    dataByType.lineDivs.push("")
    for (let i = 0; i < elmsByType.lines; i++ ) {}


    //for (let i = 0; i < ) {}
    /*
    var appendClasses = ["","_awayTop","_awayBottom","_relaxed","_basic"]
    var baseClass = "perspectiveShell"
    var divs = document.getElementsByTagName("div")
    var newShell = {}
    var removeMe = {}
    var removeIndex = 0
    var j = appendClasses.length
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].className.indexOf(baseClass) != -1) {
          divs[i].className = baseClass +
                               appendClasses[appendClasses.length - j]
          if (j === appendClasses.length) { removeIndex = i }
          j -= 1
          if (j === 1) {
            newShell = makeViewComponent(baseClass +
                                 appendClasses[appendClasses.length - j])
            document.getElementById("theOutput").appendChild(newShell)
          }
      }
    }
    //console.log(removeIndex.toString())
    //console.log(divs[removeIndex].className)
    removeMe = divs[removeIndex].parentNode
    document.getElementById("theOutput").removeChild(removeMe)
    */
    console.log("this is makeNewLine()")
  }
  function displayOperator() {
    console.log("this is displayOperator()")
  }
  function colorCodeNumeric() {
    console.log("this is colorCodeNumeric()")
  }
  /*

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

  function displayOperator(indexNo) {
    var char = operatorHTML[indexNo]
    var charDiv = document.createElement("div")
    var lines = document.getElementsByClassName("flexInnerColumn")
    var newLine = lines[lines.length-1]
    charDiv.className = "opChar"
    charDiv.innerHTML = char
    newLine.appendChild(charDiv)
    return true
  }

  function colorCodeNumeric(num) {
    var charArr = num.toString().split("")
    var rows = document.getElementsByClassName("flexInnerColumn")
    var thisRow = rows[rows.length-1]
    var thisLine = thisRow.firstChild
    //wrappedOutput[1].style.paddingBottom = "0.16em"
    thisLine.innerHTML = ""
    for (let i = 0; i < charArr.length; i++) {
        thisLine.appendChild(colorDivFactory(charArr[i]))
    }
  }

  */

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
  /*
  //
  // Data-processing cocnern
  //
  */
  function initTenKey(signal, bool) {
    var val = cleanInputString(input.value)
    var valMinusOp
    var currentLine = document.getElementById("currentLine")
    textBox.style.display = "block"
    if ((Number(signal) || signal == "period" || signal == "0")) {
      console.log("number - " + signal)
      console.log(input.value)
      colorCodeNumeric(val)
    } else {
      input.value = ""
      console.log("operator - " + signal)
      console.log(input.value)
      if (currentLine.innerHTML) {
        if (signal != "equals" && signal != "laquo") { makeNewLine() }
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
    controller.history = [[]]
    controller.opCount = 0
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
    if (controller.opCount === 0) {
      controller.history[controller.opCount].push(null)
    }
    controller.history[controller.opCount].push(numStr)
    controller.history.push([])
    controller.history[controller.opCount+1].push(operatorHTML[index])
    //debug.innerHTML = trace.backtrace
    //console.log(controller.history)
    switch (index) {
      case 4 :
        total = calculateResults()
        displayResults(total,"resultsText", results)
      break
      case 5 :
        displayControlPanel()
      break
      default :
        controller.opCount++
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
  var debug = document.getElementById("debug")
  /*
  // Data-processing cocnern
  */
  var operator = false// did the keyboard keydown event just type an operator?
  var falseOperator = false// did the keyboard keydown type two operators in a row?
  var trace = { backtrace: [], plus: [], minus: [], times: [], divide: [],
                total: 0, indexIndex: [], firstArg: [], subVals: [], reRacks: 0 }
  var controller = { lineCalc : false, base: 10, operatorOnly: false,
                      history: [[]],  opCount: 0 }

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
  var boolArr = [false, true]
  var displayArr = ["none","block"]
  /*
  //DOM / View - concern
  */
  var app = document.getElementById("app")

  /*
  // Building the DOM
  */
  var keys = findKeys()
  var input = document.getElementById("theInput")
  var output = document.getElementById("theOutput")
  var textBox = document.getElementById("textBox")
  var results = document.getElementById("resultsBox")
  var subTotal = document.getElementById("subTotalBox")
  var controlPanel = document.getElementById("controlPanelBox")
  var controlPanelConsole = document.getElementById("controlPanelText")
  var modals = document.getElementsByClassName("modal")
  var closeModals = document.getElementsByClassName("closeModal")
  var radios = document.getElementsByClassName("modeButton")
  var clearButton = document.getElementsByClassName("clearButton")[0]
  clearButton.addEventListener("click", clearOperation)
  for (let i = 0; i < radios.length; i++) {
    radios[i].onchange = function () {
      controller.lineCalc = boolArr[i]
      subTotal.style.display = displayArr[i]
    }
  }
  for (let i = 0; i < closeModals.length; i++) {
    if (modals[i]) {
      clickToClose(closeModals[i],modals[i])
    }
  }
  //
  window.addEventListener("keydown", function () {input.focus()})
  /*
  // The hidden input listens for keyboard events
  */
  // 1. Waits for operator input: +,-,*,/,enter on keydown
  input.addEventListener("keydown", function () {
    var val = this.value
    var index = operatorCodes.indexOf(event.keyCode)
    var currenntLine = document.getElementById("currentLine")
    var validVal = ""
    var testOperator
    textBox.style.disply = "block"
    if (operator) {
      return false
    }

    if (index != -1 ) {
      //prevents two operators in a row:
      //if it's not the first line, and there are no numeric characters entered yet
      //the user cannot type an operator
        if (controller.opCount >= 1 && !(currentLine.innerHTML)) {
          falseOperator = true
          return false
        } else {
          operator = true
          if (index != 4 ) {
            makeNewLine()
          }
          input.value = ""
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
    var currentLine = document.getElementById("currentLine")
    if (!falseOperator) {
      textBox.style.display = "block"
    } else {
      falseOperator = false
    }
    //this is basically error-proofing against fat-fingering the 10key on an
    //actual keyboard - if there are mulitple keys down, the first operator key
    //that is released will register as the current operator and end the line
    if (!operator && !falseOperator) {
      testOperator = parseInputString(inputVal)
      //console.log(testOperator)
      validVal = cleanInputString(inputVal)
      input.value = validVal
      if (testOperator) {
        //if (currentLine.innerHTML.length >= 1) {
        if (testOperator != 4) {
          makeNewLine()
        }
        input.value = ""
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
