// Переменная для отображения текущего введенного значения
let displayValue = ''; 
let numValue=null;      //количество слагаемых
let numOperator=null;   //количество операторов
let val=[];           //текущее слагаемое число, включая "."
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
    valTemp += number;  //записываем введенные цифры в буферную переменную
}

// Функция для добавления оператора к текущему значению
function appOperator(operator) {
    displayValue += operator;
    updateDisplay();
    numValue+=1;
    numOperator+=1;
    val.push(parseFloat(valTemp)); //добавляем текущее число в массив 
    smbOperator.push(operator);  // и закидываем в массив оператор
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
        updateDisplay(); // оставила эту ф-цию для проверки
        setTimeout(function() {
            numValue+=1;
            val.push(parseFloat(valTemp)); //в первую очередь вычислем умножение и деление чисел 
            for (let i = 0; i<val.length; i++){
                if (smbOperator[i] == '*'){
                    val[i] = val[i] * val[i+1];
                    val.splice([i+1],1); //удаляем второе число и знак из массивов,
                    smbOperator.splice([i],1); // в первое значение записываем результат
                }
            }
            for (let i = 0; i<val.length; i++){
                if (smbOperator[i] == '/'){
                    val[i] = val[i] / val[i+1];
                    val.splice([i+1],1);
                    smbOperator.splice([i],1);
                }
            }
            // последовательно считаем сумму или разницу
            rez = val[0];
            for (let i = 0; i<smbOperator.length; i++){
                if(smbOperator[i] == '+'){
                    rez += val[i+1];
                    continue; 
                }else(smbOperator[i] == '-')
                {
                    rez-=val[i+1];
                    continue;
                }
            }
            alert('результат =' + rez); //итоговый результат
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
