const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('7981454522:AAFhST6s31OunWwgOTg6k-JoNbVxKz4ad-U'); // 🔹 Apna BOT Token Yaha Dalein

// 🔹 Aapke Telegram Channels (Apne Replace Karein)
const channel1 = '@mines_prediction';
const channel2 = '@team19_Secrets';
const channel3 = '@team19sachin';

// 🔹 Start command – Image + Message + Buttons
bot.start(async (ctx) => {
    const chatId = ctx.chat.id;

    await ctx.replyWithPhoto(
        'https://t.me/Only_4_photos/4', // 🔹 Yaha Apna Image URL Dalein
        {
            caption: "👋 ᴡᴇʟᴄᴏᴍᴇ! ᴊᴏɪɴ ᴀʟʟ ᴄʜᴀɴɴᴇʟ ᴀɴᴅ ᴄʟɪᴄᴋ ᴠᴇʀɪꜰʏ.",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📢 𝗝𝗢𝗜𝗡 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝟭", url: `https://t.me/${channel1.replace('@', '')}` }],
                    [{ text: "📢 𝗝𝗢𝗜𝗡 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝟮", url: `https://t.me/${channel2.replace('@', '')}` }],
                    [{ text: "📢 𝗝𝗢𝗜𝗡 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝟯", url: `https://t.me/${channel3.replace('@', '')}` }],
                    [{ text: "✅ 𝗩𝗘𝗥𝗜𝗙𝗬", callback_data: "verify" }]
                ]
            }
        }
    );
});

// 🔹 Verification Button ka Code
bot.action('verify', async (ctx) => {
    const userId = ctx.from.id;

    try {
        // ✅ Check if User is in Channel 1
        const res1 = await ctx.telegram.getChatMember(channel1, userId);
        const isMember1 = ['member', 'administrator', 'creator'].includes(res1.status);

        // ✅ Check if User is in Channel 2
        const res2 = await ctx.telegram.getChatMember(channel2, userId);
        const isMember2 = ['member', 'administrator', 'creator'].includes(res2.status);

        // ✅ Check if User is in Channel 3
        const res3 = await ctx.telegram.getChatMember(channel3, userId);
        const isMember3 = ['member', 'administrator', 'creator'].includes(res3.status);

        if (isMember1 && isMember2 && isMember3) {
            // ✅ Agar user tino channels me hai, verify success message bhejo
            await ctx.replyWithPhoto(
                'https://t.me/Only_4_photos/2', // 🔹 Yaha Apna Image URL Dalein
                {
                    caption: `🎉 *ᴄᴏɴɢʀᴀᴛᴜʟᴀᴛɪᴏɴꜱ, ${ctx.from.first_name}!* 🎉\n\n` +
                             `✅ ʏᴏᴜ ʜᴀᴠᴇ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴠᴇʀɪꜰɪᴇᴅ!\n` +
                             `🚀 ɴᴏᴡ, ᴄʜᴏᴏꜱᴇ ᴀ ʜᴀᴄᴋ ʙᴇʟᴏᴡ ᴀɴᴅ ꜱᴛᴀʀᴛ ᴡɪɴɴɪɴɢ! 🎮🔥`,
                    parse_mode: "Markdown",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "🎮 𝗠𝗜𝗡𝗘𝗦 𝗛𝗔𝗖𝗞", web_app: { url: "https://www.minesprediction.site" } }],
                            [{ text: "🎯 𝗪𝗜𝗡𝗚𝗢 𝗛𝗔𝗖𝗞", web_app: { url: "https://www.wingoprediction.site" } }],
                            [{ text: "🚀 𝗔𝗩𝗜𝗔𝗧𝗢𝗥 𝗛𝗔𝗖𝗞", web_app: { url: "https://www.modmaking.in" } }]
                        ]
                    }
                }
            );
            
            
        } else {
            // ❌ Agar user tino channels me nahi hai, warning do
            await ctx.reply("⚠️ ʏᴏᴜ ᴍᴜꜱᴛ ᴊᴏɪɴ ᴀʟʟ ᴄʜᴀɴɴᴇʟ ᴛᴏ ᴄᴏɴᴛɪɴᴜᴇ");
        }
    } catch (error) {
        console.error("Verification Error:", error);
        await ctx.reply("⚠️ Error checking your membership. Please try again later.");
    }
});

// 🔹 Bot Ko Start Karna
bot.launch();
console.log("🤖 Bot is running...");
