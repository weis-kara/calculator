// Переменная для отображения текущего введенного значения
let displayValue = ''; 
let numValue=null;      //количество слагаемых
let numOperator=null;   //количество операторов
let val=[];           //текущее слагаемое
let smbOperator=[];      //текущий оператор
let valTemp='';
let rez=null

// Переменная для хранения значения памяти
let memoryValue = null;

// Функция для обновления отображения на экране
function updateDisplay() {
    document.getElementById('display').value = displayValue;
}

// Функция для добавления цифры к текущему значению 
function appNumber(number) {
    displayValue += number;
    updateDisplay();
    valTemp += number;  // 
    //alert(displayValue,valTemp);
   //return valTemp
}

// Функция для добавления оператора к текущему значению
function appOperator(operator) {
    displayValue += operator;
    updateDisplay();
    numValue+=1;
    numOperator+=1;
    val.push(parseFloat(valTemp));
    smbOperator.push(operator);
    /*alert(val);
    alert(smbOperator);*/
    valTemp='';
    
    return [valTemp,numValue,numOperator,val,smbOperator];
}

/* Функция для добавления десятичной точки к текущему значению
function appDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}*/

// Функция для очистки текущего значения на экране
function clearDisplay() {
    
    displayValue = '';
    updateDisplay();
    numValue=null; 
    numOperator=null;
    val.length=0;
    smbOperator.length=0;
    valTemp='';
}

// Функция для удаления последней цифры из текущего значения
function backspace() {
    valTemp=valTemp.slice(0,-1)
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

// Функция для добавления текущего значения в память
function addToMemory() {
    memoryValue = parseFloat(displayValue);
    console.log('Memory set to: ' + memoryValue);
}

// Функция для вызова значения из памяти и установки его в текущее значение
function recallMemory() {
    if (memoryValue !== null) {
        displayValue = memoryValue.toString();
        updateDisplay();
        console.log('Memory recalled: ' + memoryValue);
    }
}

// Функция для выполнения арифметического вычисления текущего значения
function calculate() {
    try {
        displayValue = eval(displayValue).toString();
        updateDisplay();
        setTimeout(function() {
            numValue+=1;
            val.push(parseFloat(valTemp));
            alert(numValue + ';' + val);
            let rez= parseFloat(val[0] + '+' + val[1]);
            //let rez= parseFloat(displayValue);
                        
            alert('=;' + rez);
            numValue=null; 
            numOperator=null;
            val.length=0;
            smbOperator.length=0;
        });
     
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }


}
let dis = document.getElementById('display');
dis.style.borderRadius="7px"
dis.style.boxShadow="inset 2px 3px 10px rgb(0 0 0 / 50%)";
dis.style.width="80%";
dis.style.height="20px";
dis.style.paddingTop="10px";