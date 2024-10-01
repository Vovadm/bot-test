const TelegramApi = require("node-telegram-bot-api");

token = "7679893299:AAHgUxl5Ti79laTHn8k7_qRFLfRw5NGD-tM";

const bot = new TelegramApi(token, { polling: true });

const start = () => {
  bot.setMyCommands([
    { command: "start", description: "Приветсвие" },
    { command: "/info", description: "юзернейм пользователя" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    // bot.sendMessage(chatId, "1" + text);

    if (text === "/start") {
      return bot.sendMessage(chatId, "воспользуйся /info");
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, msg.from.username);
    }
    return bot.sendMessage(chatId, "Такой команды нет, возпользуйся /info");
  });
};

start();
