// const TelegramApi = require('node-telegram-bot-api')
//
// const token = '5890317465:AAHJn7gXLRZDIgmnc7JiSmYqzDTCn-zO92Q'
//
// const bot = new TelegramApi(token, {polling: true})
//
// bot.onText(RegExp("message"), msg => {
//     bot.on("polling_error", console.log);
//     const text = msg.text;
//     console.log(msg);
//     if (text === "/start") {
//         bot.sendMessage(chat.id, `hello user`)
//     } else {
//         bot.sendMessage(chat.id, `you textded me ${first_name}`)
//     }
//     const bye = "bye";
//     if (msg.text.toString().toLowerCase().includes(bye)) {
//         bot.sendMessage(chat.id, "Hope to see you around again , Bye");
//     }
// })


const TelegramBot = require('node-telegram-bot-api');
const token = '5890317465:AAHJn7gXLRZDIgmnc7JiSmYqzDTCn-zO92Q'
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
    console.log(msg);
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    let replyText = msg.text
    console.log(msg);
    console.log(replyText)
    if (replyText != "/start") {
        bot.sendMessage(chatId, `hello ${replyText}`)
    }else{
        bot.sendMessage(chatId, `idi naxuy`)
    }
});

// const TelegramBot = require('node-telegram-bot-api');
//
// // replace the value below with the Telegram token you receive from @BotFather
// const token = '5890317465:AAHJn7gXLRZDIgmnc7JiSmYqzDTCn-zO92Q';
//
// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, {polling: true});
//
// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message
//
//     const chatId = msg.chat.id;
//     const resp = match[1]; // the captured "whatever"
//
//     // send back the matched "whatever" to the chat
//     bot.sendMessage(chatId, resp);
// });
//
// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });