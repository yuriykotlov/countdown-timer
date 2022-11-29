let eventDay = "";
let interval;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// January, March, May, July, August, October, December; days which have 31 days
const oddMonths = ["1", "3", "5", "7", "8", "10", "12"]

let dayField = document.getElementById("day");
let hourField = document.getElementById("hour");
let minuteField = document.getElementById("minute");
let secondField = document.getElementById("second");

let errorWord = document.getElementById("word")
let errorMessageField = document.getElementById("sentence")

function countDownFn(){
    let now = new Date();
    let timeSpan = eventDay - now;

    if(eventDay == "" || eventDay == null){
        console.log("No date entered yet")
    }
    else if (timeSpan <= 0) {
        console.log("The desired day has been reached!");
        dayField.innerHTML = "0";
        hourField.innerHTML = "0";
        minuteField.innerHTML = "0";
        secondField.innerHTML = "0";

        DisplaySuccess()
        clearInterval(interval);
        return;
    }
    else {
        const days = Math.floor(timeSpan / day)
        const hours = Math.floor((timeSpan % day) / hour)
        const minutes = Math.floor((timeSpan % hour) / minute)
        const seconds = Math.floor((timeSpan % minute) / second)
      
        dayField.innerHTML = days;
        hourField.innerHTML = hours;
        minuteField.innerHTML = minutes;
        secondField.innerHTML = seconds;

        console.log(days + ":" + hours + ":" + minutes + ":" + seconds);
    }
 }

 function SetupInterval(){
    console.log("Setting up interval")
    clearInterval(interval)
    interval = setInterval(countDownFn, second);
 }

 function ProcessNewDate(){
    let canStartCountdown = false
    let newDate = ""

    let day = document.getElementById("input-day").value;
    let month = document.getElementById("input-month").value;
    let year = document.getElementById("input-year").value;

    console.log("month " + month + " day " + day + " year " + year)

    // Probably able to optimize this better but just trying to get it working at least
    if(month > 12){
        canStartCountdown = false;
        DisplayError("Entered month (" + month + ") is over 12")
        return;
    }
    else if(month.slice(0, 1) == "0"){
        console.log("month has a zero in it")
        // When the input has a zero before a number it just doesn't work
        switch(month){
            case "01":
                month = "1"
                break
            case "02":
                month = "2"
                break
            case "03":
                month = "3"
                break
            case "04":
                month = "4"
                break      
            case "05":
                month = "5"
                break
            case "06":
                month = "6"
                break
            case "07":
                month = "7"
                break
            case "08":
                month = "8"
                break
            case "09":
                month = "9"
                break
            default:
                // Month inputted is 0 or 00
                DisplayError("Month entered (" + month + ") is invalid");
                return;
                break
        }
    }

    if(day > 31){
        canStartCountdown = false;
        DisplayError("Entered day (" + day + ") is over 12");
        return;
    }
    else if(day == 31){
        console.log("31 day")
        // Check if the month chosen is one that has 31 days
        for(i = 0; i <= oddMonths.length; i++){
            console.log("using month " + month + ", checking month " + oddMonths[i])

            if(i == oddMonths.length - 1){
                console.log("Month is not part of oddMonths")
                canStartCountdown = false;
                DisplayError("Month " + month + " does not have 31 days");
                return;
            }
            else if(month == oddMonths[i]){
                console.log("month has 31 days");
                canStartCountdown = true;
                break;
            }
            else{
                i++;
            }
        }
    }
    else if(day < 31 && day > 0){
        canStartCountdown = true;
    }
    newDate = month + "/" + day + "/" + year
    
    if(canStartCountdown){
        eventDay = new Date(newDate);
        SetupInterval();
    }
 }

 function DisplayError(message){
    console.log("ERROR: " + message)
    // Red color
    errorWord.style.color = "#ff0000"
    errorMessageField.style.color = "#000";
    errorMessageField.innerHTML = message;
    errorWord.innerHTML = "Error:";
    setTimeout(()=>{
        errorMessageField.style.color = "transparent";
        errorWord.style.color = "transparent";
     }, 7000);
 }

 function DisplaySuccess(){
    // Blue color
    errorWord.style.color = "#0080ff"
    errorMessageField.style.color = "#000";
    errorMessageField.innerHTML = "The desired date has been reached!";
    errorWord.innerHTML = "Success:"
    setTimeout(()=>{
        errorMessageField.style.color = "transparent";
        errorWord.style.color = "transparent";
     }, 10000);
 }