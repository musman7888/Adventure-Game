#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// chalk color defination
const gameLogo = chalk.bold.bgBlue;
const Win = chalk.whiteBright.bold.bgGreen;
const lose = chalk.bold.yellowBright.bgRed;
const withDraw = chalk.bold.redBright.bgYellowBright;
const finalRes = gameLogo;
// enemy section
let enemies = ["Zombie", "Joker", "Venom", "Thanos"];
let enemyHealth = 100;
let enemyRandom = 0;
let enemyName = "";
// player section
let playerHealth = 100;
let healthBonus = 50;
let healthBonusCount = 3;
let noOfFights = 0;
let noOfWins = 0;
let fightLoop = true;
console.log(gameLogo("\n*****************************************"));
console.log(gameLogo("------- Welcome to Adventure Game -------"));
console.log(gameLogo("*****************************************\n"));
function enemyIntroduce() {
    enemyRandom = Math.round(Math.random() * 3);
    enemyName = enemies[enemyRandom];
    enemyHealth = 100;
    let enemyAppeared = `\n${enemyName} has appeared to fight with you\n
    Your Health: ${playerHealth}
    ${enemyName} Health: ${enemyHealth}\n`;
    console.log(enemyAppeared);
}
function attackImpact() {
    let impact = Math.ceil(Math.random() * 30);
    return impact;
}
function finalResult() {
    console.log(finalRes(`
    Number of Fights: ${noOfFights} 
    Number of Wins  : ${noOfWins}
    `));
}
enemyIntroduce();
function status() {
    noOfFights++;
    if (enemyHealth < 1 && playerHealth < 1) {
        console.log(withDraw(`Game Withdraw`));
        finalResult();
    }
    else if (enemyHealth < 1) {
        noOfWins++;
        console.log(Win("You Win"));
        enemyIntroduce();
        gameStart();
    }
    else {
        console.log(lose("\nYou lose\n"));
        finalResult();
    }
}
function fight() {
    while (fightLoop) {
        let enemyDamage = attackImpact();
        let playerDamage = attackImpact();
        enemyHealth -= enemyDamage;
        playerHealth -= playerDamage;
        console.log(`\nYour Strike ${enemyDamage} on ${enemyName} and ${enemyName} Strike is ${playerDamage} on You\n`);
        console.log(`Your Health: ${playerHealth}\n${enemyName} Health: ${enemyHealth}\n`);
        fightLoop = false;
        if (enemyHealth < 1 || playerHealth < 1) {
            status();
        }
        else {
            gameStart();
        }
    }
}
async function gameStart() {
    let userAction = await inquirer.prompt([
        {
            message: "\nSelect an action: ",
            name: "action",
            type: "list",
            choices: ["Fight", "Get Health Bonus", "Quit"]
        }
    ]);
    function refillHealth() {
        if (healthBonusCount > 0) {
            playerHealth += healthBonus;
            healthBonusCount--;
            console.log(`\nPlayer Health: ${playerHealth}`);
            console.log("Remaining health bonus: " + healthBonusCount);
        }
        else {
            console.log("No health bonus is left behind");
        }
        gameStart();
    }
    switch (userAction.action) {
        case "Fight":
            fightLoop = true;
            fight();
            break;
        case "Get Health Bonus":
            refillHealth();
            break;
        case "Quit":
            finalResult();
            break;
    }
}
gameStart();
