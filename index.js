const TelegramBot = require('node-telegram-bot-api');
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

const token = '5992572679:AAHWGrjiuNmHG32VRM7YTkp9DFpJfw9RYk0';
const characterId = "EEI6sjnddRIJTVC59MODiYjL0-JyDIVI2IEGLkPx2Jk" // Stella
// EEI6sjnddRIJTVC59MODiYjL0-JyDIVI2IEGLkPx2Jk
const bot = new TelegramBot(token, {polling: true});

let isInit = false
let chat;

async function init(){
    await characterAI.authenticateWithToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJpc3MiOiJodHRwczovL2NoYXJhY3Rlci1haS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDUxMDU5NDU4NzUzMjcwMjUxMjUiLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMC5jaGFyYWN0ZXIuYWkvIiwiaHR0cHM6Ly9jaGFyYWN0ZXItYWkudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NDA2MTE5MCwiZXhwIjoxNjg2NjUzMTkwLCJhenAiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.MgqFPQX2PLhCbuU8x5-wUniHYoULeMVStx-IISXIVaitzcqG3mfb5yScQAFGXoslwfbBhYhKphmjzlH75NWtoyma4FWyaChLu0Jq7v2fv_lgolMFFPStDSLxUVRcXteSdHu2cLALk_qUIb2DdINLYQuwiCAYMHjS7aucI4dPj4VQVGQq_suJm-rZjyaG7vwVM2z6LnwlOL9Y7xAdArx5F1TaYaZgqXNMjiNnAVqoiFN0ucnbrvAO0TiaMJdz0j_LOu79FAIJgEaCk_hou0XRNK7dvdF7eAaR26oCc8Ft9Oi3XCbIIm3avVJaQ-jt0-1MBwHDpaRJwynTzkvaBZ8qSQ");
    // await characterAI.authenticateAsGuest();
    chat = await characterAI.createOrContinueChat(characterId);
    let response;
    console.log("Запрашивает ответ инициализации")
    try {
        response = await chat.sendAndAwaitResponse("Привет", true)
        console.log("Ответ инициализации: "+response.text)
    } catch (error) {
        console.log(error)
        console.log("Ошибка при генерации ответа инициализации")
    }
    isInit = true
    console.log("Инициализация завершена")
}

async function charAImsg(input=""){
    let response;
    try {
        response = await chat.sendAndAwaitResponse(input, true)
    } catch (error) {
        console.log("Ошибка при генерации ответа")
    }
    
    

    return response.text
};

async function msgResponse(chatId,msg){
    bot.sendMessage(chatId, 'Received your message')
}


init()

// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if(isInit){
        console.log(`[${chatId}]Полученное сообщение: ${msg.text}`)
        charAImsg(msg.text).then((val)=>{
            console.log(`[${chatId}]Ответ: ${val}`)
            bot.sendMessage(chatId, val)
        })
    }
    // send a message to the chat acknowledging receipt of their message
    ;
});





