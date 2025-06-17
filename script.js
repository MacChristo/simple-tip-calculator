// TIP = (TIP PERCENTAGE/100) * TOTAL AMOUNT

const totalBillAmt = document.getElementById("bill-amt")
const tipPercentRanges = document.querySelectorAll(".tip-percent")
const numOfPeople = document.getElementById("num-ppl")
const tipPerPerson = document.getElementById("tip-person")
const totalAmountPerPerson = document.getElementById("total-person")
const calculateButton = document.getElementById("calculate")
const resetButton = document.getElementById("reset")
const errorMessageBill = document.getElementById("err-msg-bill")
const errorMessagePeople = document.getElementById("err-msg-ppl")
const billInput = document.getElementById("bill-input")
const numInput = document.getElementById("num-input")

//Get percentage
let selectedPercent = 0;
let customTipPercent = tipPercentRanges[5].valueAsNumber

tipPercentRanges.forEach((percentBTN) => {
    percentBTN.addEventListener(("click"), (e)=>{
        selectedPercent = Number(e.target.value.slice(0, -1))
            
        //This highlights the selected percentage with a different color
        tipPercentRanges.forEach((eve)=>eve.classList.remove("selected-percent"))
       percentBTN.classList.add("selected-percent")   
    })
})

//This selects the custom percentage input
tipPercentRanges[5].addEventListener(("input"), (e)=>{
    customTipPercent = e.target.valueAsNumber
    selectedPercent = customTipPercent
})


//Parameters
let totalTip = 0.00
let totalBillAmount = totalBillAmt.valueAsNumber
totalBillAmt.addEventListener(("input"), (e)=>{
    totalBillAmount = e.target.valueAsNumber //Gets the input of the bill as the user types "live"
    handleErrors()
})
let people = numOfPeople.valueAsNumber
numOfPeople.addEventListener(("input"), (e)=>{
    people = e.target.valueAsNumber //Gets the input of the people as the user types "live"
    handleErrors()
})

//Calculate the TIP and returns the result
const calculateTip = (percent, totalBill) =>{
    totalTip = (percent/100) * totalBill
    return totalTip
}

//Displays the result after calculation
calculateButton.addEventListener(('click'), ()=>{
    totalTip = calculateTip(selectedPercent, totalBillAmount)
    tipPerPerson.textContent = (totalTip/people).toFixed(2)
    totalAmountPerPerson.textContent = ((totalBillAmount + totalTip)/people).toFixed(2)
})

//Resets the value of tip amount/person and total/person only
resetButton.addEventListener(("click"), ()=>{
    tipPerPerson.textContent = "0.00"
    totalAmountPerPerson.textContent = "0.00"
    selectedPercent = 0
    totalBillAmt.textContent = "0.00"
    numOfPeople.textContent = "0.00"

    tipPercentRanges.forEach((e)=>{
        e.classList.remove("selected-percent")
    })
})

//Handles all inputs errors
const handleErrors = () => {
    if (totalBillAmt.value > 0) {
        errorMessageBill.innerHTML = ""
        errorMessageBill.classList.remove("err-color")
        billInput.style.border = "none"
    } 
    if (totalBillAmt.value === "") {
        errorMessageBill.innerHTML = "Can't be empty!"
        errorMessageBill.classList.add("err-color")
        billInput.style.border = "1px solid red"
        calculateButton.disabled = true
        calculateButton.style.cursor = "not-allowed"
    } 
    if (totalBillAmount === 0) {
        errorMessageBill.innerHTML = "Can't be zero"
        errorMessageBill.classList.add("err-color")
        billInput.style.border = "1px solid red"
        calculateButton.disabled = true
        calculateButton.style.cursor = "not-allowed"
    }

    //Error check For Number of People input
    if (numOfPeople.value > 0) {
        errorMessagePeople.innerHTML = ""
        errorMessagePeople.classList.remove("err-color")
        numInput.style.border = "none"
    } 
    if (numOfPeople.value === "") {
        errorMessagePeople.innerHTML = "Can't be empty!"
        errorMessagePeople.classList.add("err-color")
        numInput.style.border = "1px solid red"
        calculateButton.disabled = true
        calculateButton.style.cursor = "not-allowed"
    } 
    if (people === 0) {
        errorMessagePeople.innerHTML = "Can't be zero"
        errorMessagePeople.classList.add("err-color")
        numInput.style.border = "1px solid red"
        calculateButton.disabled = true
        calculateButton.style.cursor = "not-allowed"
    }

    //Check if either bill or number of people input has an error
    if (errorMessageBill.innerHTML.length === 0 && errorMessagePeople.innerHTML.length === 0) {
        calculateButton.disabled = false
        calculateButton.style.cursor = "pointer"
    }

}
