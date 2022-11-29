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
    console.log("ok")
    let now = new Date();
    let timeSpan = eventDay - now;

    if(eventDay == "" || eventDay == null){
        console.log("No date entered yet")
    }
    else if (timeSpan <= 0) {
        console.log("Today is the event day");
        dayField.innerHTML = "0";
        hourField.innerHTML = "0";
        minuteField.innerHTML = "0";
        secondField.innerHTML = "0";

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
    console.log("setting up interval")
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
    else{
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
        }
    }

    if(day > 31){
        canStartCountdown = false;
        DisplayError("Entered day (" + day + ") is over 12");
        return;
    }
    else if(day == 31){
        console.log("31 day")
        for(i = 0; i < oddMonths.length; i++){
            console.log("checking month " + oddMonths[i])
            if(month == oddMonths[i]){
                console.log("month has 31 days");
                canStartCountdown = true;
            }
            else if(i == oddMonths.length){
                canStartCountdown = false;
                DisplayError("Month " + month + " does not have 31 days, resubmit with a valid month");
                return;
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

 // I'm pretty sure you can just toggle hidden and it
 // would work, but for some reason it doesn't
 function DisplayError(message){
    errorMessageField.innerHTML = message;
    errorMessageField.classList.toggle("transparent");
    errorWord.classList.toggle("transparent");
    setTimeout(()=>{
        errorMessageField.classList.toggle("transparent");
        errorWord.classList.toggle("transparent");
        errorMessageField.innerHTML = "";
     }, 7000);
 }
