document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");


    // Define the available operators and their corresponding functions
    const operators = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    };

    // Create a stack to hold the intermediate values and operators
    const stack = [];

    // Variable to track if the display value is cleared after an operator is pressed
    let isDisplayCleared = false;

    //Add event listener to buttons
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            updateDisplay(button.value)
        });
    });

    //Add event listener to the clear button
    const clearButton = document.querySelector(".btn-clear");
    clearButton.addEventListener("click", () => {
        clearDisplay(); // Call the clearDisplay function to clear the display
        clearStack(); // Call the clearStack function to clear the stack
    });

    // Function to update the display when a button is clicked
    function updateDisplay(value) {
        console.log("Clicked value:", value);
        console.log("Stack before update:", stack);

        // Check if the value is a number
        if (!isNaN(value)) {
            // If the display is cleared after an operator, start a new value
            if (isDisplayCleared) {
                clearDisplay();
            }
            // Limit the number of characters in the display to 12
            if (display.value.length >= 12 || (value === "0" && display.value.length === 0)) {
                return;
            } else {
                display.value += value;
            }
        }

        // Check if the value is decimal point
        if (value === ".") {
            // If the display is cleared after an operator, start a new value
            if (isDisplayCleared) {
                display.value = "";
                isDisplayCleared = false;
            }
            // Limit the number of characters in the display to 12
            if (display.value.includes(".") || display.value.length === 0) {
                return;
            } else {
                display.value += value;
            }
        }

        // Check if the value is an operator
        if (operators.hasOwnProperty(value)) {
            // Check if the current display's value is not empty
            if (display.value !== "") {
                // Push the current display value to the stack
                stack.push(parseFloat(display.value));
                //Attempt to calculate the solution if theres enough operands in the stack
                calculate();
                // Push the operator to the stack
                stack.push(value);
                // Clear the display value after pressing an operator
                isDisplayCleared = true;
            }
            if (stack.length > 0 && typeof stack[stack.length - 1] === "string") {
                // Replace the previous operator with the current one
                stack[stack.length - 1] = value;
            }
        }

        // Check if the value is the equal button
        if (value === "=") {
            // Check if the current display's value is not empty
            if (display.value !== "") {
                // Push the current display value to the stack[0]
                stack.push(parseFloat(display.value));
                clearDisplay();
                // Check if the current stack can be solved
                if (stack.length >= 3) {
                    // Calculate the result
                    display.value = calculate();
                    clearStack();
                } else {
                    // Keep the current display value
                    clearStack();
                    return;
                }
            }
            // Check if the last item in the stack is not an operator leading to an useless operator in the stack after the stack is solved
            if (stack.length > 0 && typeof stack[stack.length - 1] === "string") {
                // Remove the last operator that will not be used because theres no second operand
                stack.pop();
            }
        }
        console.log("Stack after update:", stack);
    }


    // Function to calculate the result if there is 2 operands in the stack
    function calculate() {
        try {
            let result;
            // Check if the stack has solvable condition "[number,operator,number]" and perform the calculation
            if (stack.length >= 3) {
                // Get the first operand (a) from the stack
                const a = stack.shift();
                // Get the operator from the stack
                const operator = stack.shift();
                // Get the second operand (b) from the stack
                const b = stack.shift();
                // Check if the division by zero occurs
                if (operator === '/' && b === 0) {
                    // Display a error message for division by zero
                    display.value = "Error: Dividing by zero? Nice try.";
                    stack.length = 0; // Clear the stack in case of an error
                } else {
                    result = operators[operator](a, b);
                    stack.unshift(result);
                    display.value = result;
                    // Limit the number of decimal places to 2
                    return (result = parseFloat(result.toFixed(2)));
                }
            }

        } catch (error) {
            display.value = `Error: ${error.message}`;
            // Clear the stack in case of an error
            clearStack();
        }
    }

    // Function to clear the display
    function clearDisplay() {
        display.value = "";
        isDisplayCleared = false;
    }

    function clearStack() {
        // Clear the stack by setting its length to 0
        stack.length = 0;
    }
});