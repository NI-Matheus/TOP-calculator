document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const operators = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "/": (a,b) => a / b,
    };

    //Add event listener to buttons
    buttons.forEach ((button) => {
        button.addEventListener ("click", () => {
            addToDisplay(button.dataset.value)
        });
    });

    //Add event listener to the equal button
    const equalButton = document.querySelector (".btn-equal");
    equalButton.addEventListener ("click",calculate);

    //Add event listener to the clear button
    const clearButton = document.querySelector (".btn-clear");
    clearButton.addEventListener ("click",clearDisplay);

    //Function to add the clicked button value to the display
    function addToDisplay (value) {
        //Limit the number of characters in the display to 12 and allow only valid input: numbers, decimal point, and operators
        display.value.length >= 12 && isValidInput(value) ?  null : display.value += value;
    }


    // Function to calculate the result
    function calculate() {
        // Check if the display is empty
        if (display.value === "") {
            return;
        }
        let result;
        try {
            result = evaluateExpression(display.value);
            // Limit the number of decimal places to 2
            display.value = parseFloat(result.toFixed(2));
        } catch (error) {
            display.value = `Error: ${error.message}`;
        }
    }

    // Function to clear the display
    function clearDisplay () {
        display.value = "";
    }

    // Function to check if the input is valid
    function isValidInput(value) {
        //Check if the value is a number, decimal point or operator
        return isNumeric(value) || value === "." || operators.includes(value);
    }

    // Function to check if a value is numeric
    function isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    //Function to evaluate the expression using a safe parser
    function evaluateExpression(expression) {
        throw new Error("Expression evaluation not implemented");
    }
});