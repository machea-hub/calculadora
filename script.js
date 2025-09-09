const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let currentExpression = "";

function calculateExpression(expr) {
    try {
        expr = expr.replace(/%/g, "/100");

        expr = expr.replace(/\s+/g, "");

        if (!/^[0-9+\-*/.]+$/.test(expr)) return "Erro";

        const numbers = expr.split(/([+\-])/).filter(Boolean);

        let processed = [];
        let i = 0;

        while (i < numbers.length) {
            let num = numbers[i];

            if (num.includes("*") || num.includes("/")) {
                let temp = num.split(/([*/])/).filter(Boolean);
                let tempResult = parseFloat(temp[0]);

                for (let j = 1; j < temp.length; j += 2) {
                    const op = temp[j];
                    const nextNum = parseFloat(temp[j + 1]);
                    if (op === "*") tempResult *= nextNum;
                    if (op === "/") tempResult /= nextNum;
                }
                processed.push(tempResult);
            } else if (num === "+" || num === "-") {
                processed.push(num);
            } else {
                processed.push(parseFloat(num));
            }
            i++;
        }

        let total = processed[0];
        for (let k = 1; k < processed.length; k += 2) {
            const op = processed[k];
            const nextNum = processed[k + 1];
            if (op === "+") total += nextNum;
            if (op === "-") total -= nextNum;
        }

        return total;
    } catch {
        return "Erro";
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            currentExpression = "";
            result.value = "";
            return;
        }

        if (value === "=") {
            const calculation = calculateExpression(currentExpression);
            result.value = calculation.toFixed(4);
            currentExpression = calculation === "Erro" ? "" : calculation.toString();
            return;
        }

        currentExpression += value;
        result.value = currentExpression;
    });
});
