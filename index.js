const path = require("path");
const { readdir } = require("fs/promises");
const axios = require("axios");
const driver = require("selenium-webdriver");
const { Builder, By, Key, untill } = require("selenium-webdriver");
const TelegramBot = require("node-telegram-bot-api");
const token = "5879394130:AAGw9NgBEpycnISeNDfUP5VF_sYjf11UUYQ";
const bot = new TelegramBot(token, { polling: true });
// get request
let defLink = " front-view-generic-brandless-moder-car ";

let downloadFolder = process.env.USERPROFILE + "/Downloads";

function getIdFromLink(link) {
  let splitted = link.split(".htm");
  let id = splitted[0].split("_")[splitted.length - 1];
  return id;
}

function getAliasFromLink(link) {
  let splitted = link.split(".htm");
  let fileLink = splitted[0].split("_")[0];
  let fileLinkSplit = fileLink.split("/");
  let alias = fileLinkSplit[fileLinkSplit.length - 1];
  return alias;
}

const findByName = async (dir, name) => {
  const matchedFiles = [];
  const files = await readdir(dir);

  for (const file of files) {
    // Method 1:
    const filename = path.parse(file).name;
    let splittedName = filename.split(" ")[0];
    if (splittedName === name) {
      matchedFiles.push(file);
    }
  }
  return matchedFiles;
};

function linkHandler(value) {
  return new Promise(async (resolve, reject) => {
    let driver = await new Builder().forBrowser("chrome").build();
    if (value) {
      let link = getIdFromLink(value);
      try {
        await driver.get(
          "https://id.freepikcompany.com/v2/log-in?client_id=freepik&lang=en&_ga=2.22590587.1573958854.1671131491-470343965.1671131491"
        );
        await driver
          .findElement(
            By.css(
              ".main-button.button.button--outline.button--with-icon:nth-child(3)"
            )
          )
          .click();
        let email_field = await driver.findElement(By.name("email"));
        let password_field = await driver.findElement(By.name("password"));
        let checkbox_field = await driver.findElement(By.name("keep-signed"));
        await checkbox_field.click();
        await email_field.sendKeys("zafar.azimov@davrbank.uz");
        await password_field.sendKeys("Ddrake140ckm!");
        let submit_button = await driver.findElement(
          By.css('.main-button.button[type="submit"]')
        );
        await submit_button.click();
        setTimeout(() => {
          driver
            .get(`https://www.freepik.com/download-file/${link}`)
            .then(() => {
              let countInterval = 0;
              let interval = setInterval(async () => {
                let aliasFile = getAliasFromLink(value);
                let files = await findByName(downloadFolder, aliasFile);
                let fileName = "";

                if (files.length > 0) {
                  fileName = files[files.length - 1];
                  resolve(downloadFolder + "/" + fileName);
                  driver.quit();
                } else {
                  countInterval++;
                  if (countInterval > 15) {
                    clearInterval(interval);
                    reject("File not found");
                    driver.quit();
                  }
                }
              }, 2000);
              // resolve("File not found");
            });
        }, 10000);
      } catch (e) {
        console.log(e);
      }
    }
  });
}

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  let replyText = msg.text;
  if (replyText != "/start") {
    const filepath = await linkHandler(replyText);
    // bot.sendMessage(chatId, `hello ${filepath}`);
    bot.sendDocument(chatId, filepath);
  } else {
    bot.sendMessage(chatId, `Добро пожаловать ${msg.from.username} `);
  }
});
