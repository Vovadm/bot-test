const {gameOptions, againOptions} = require('./options')
const TelegramApi = require("node-telegram-bot-api");

token = "7679893299:AAHgUxl5Ti79laTHn8k7_qRFLfRw5NGD-tM";

const bot = new TelegramApi(token, { polling: true });

const start = async () => {


    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                await UserModel.create({chatId})
                return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот `);
            }
            if (text === '/info') {
                const user = await UserModel.findOne({chatId})
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, в игре у тебя правильных ответов ${user.right}, неправильных ${user.wrong}`);
            }
            if (text === '/game') {
                return startGame(chatId);
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибочка!)');
        }

    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        const user = await UserModel.findOne({chatId})
        if (data == chats[chatId]) {
            user.right += 1;
            await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
        } else {
            user.wrong += 1;
            await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
        }
        await user.save();
    })
}

start()