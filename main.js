#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//print welcome message
console.log(chalk.green("\n \tWelcome in ATM\n"));
//initialize user balance and pincode
let myPin = 1112;
let myBalance = 50000;
let pinAnswer = await inquirer.prompt([
    {
        name: "pincode",
        type: "number",
        message: chalk.blue("Enter your pincode:"),
    }
]);
if (pinAnswer.pincode === myPin) {
    console.log(chalk.green("\npin is correct, Login successfully!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "select your operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.bgRed("Insufficient Balance!"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw successfully`);
                console.log(`your remaining account Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let AmountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount you want to withdraw:"
                }
            ]);
            if (AmountAns.amount > myBalance) {
                console.log(chalk.redBright("Insufficent Balance"));
            }
            else {
                myBalance -= AmountAns.amount;
                console.log(`${AmountAns.amount} withdraw successfully`);
                console.log(`your Remaining Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`your account Balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.red("Pin is incorrect, Try Again!"));
}
