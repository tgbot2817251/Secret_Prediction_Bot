const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf("7981454522:AAHL-P1xDPkmxgUQdZcN_t1Msukk20MORyw"); // 🔹 Apna BOT Token Yaha Dalein

// 🔹 Aapke Telegram Channels (Apne Replace Karein)
const channel1 = "@official_team_19";
const channel2 = "@team19_4u";

// 🔹 Start command – Image + Message + Buttons
bot.start(async (ctx) => {
    const chatId = ctx.chat.id;

    await ctx.replyWithPhoto(
        "https://t.me/Only_4_photos/2", // 🔹 Yaha Apna Image URL Dalein
        {
            caption: "👋 ᴡᴇʟᴄᴏᴍᴇ! ᴊᴏɪɴ ᴀʟʟ ᴄʜᴀɴɴᴇʟ ᴀɴᴅ ᴄʟɪᴄᴋ ᴠᴇʀɪꜰʏ..",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "📢 𝗝𝗢𝗜𝗡 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝟭",
                            url: `https://t.me/${channel1.replace("@", "")}`,
                        },
                    ],
                    [
                        {
                            text: "📢 𝗝𝗢𝗜𝗡 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝟮",
                            url: `https://t.me/${channel2.replace("@", "")}`,
                        },
                    ],
                    [{ text: "✅ 𝗩𝗘𝗥𝗜𝗙𝗬", callback_data: "verify" }],
                ],
            },
        },
    );
});

// 🔹 Verification Button ka Code
bot.action("verify", async (ctx) => {
    const userId = ctx.from.id;

    try {
        // ✅ Check if User is in Channel 1
        const res1 = await ctx.telegram.getChatMember(channel1, userId);
        const isMember1 = ["member", "administrator", "creator"].includes(
            res1.status,
        );

        // ✅ Check if User is in Channel 2
        const res2 = await ctx.telegram.getChatMember(channel2, userId);
        const isMember2 = ["member", "administrator", "creator"].includes(
            res2.status,
        );

        if (isMember1 && isMember2) {
            // ✅ Agar user dono channels me hai, verify success message bhejo
            await ctx.replyWithPhoto(
                "https://t.me/Only_4_photos/2", // 🔹 Yaha Apna Image URL Dalein
                {
                    caption:
                        `🎉 *ᴄᴏɴɢʀᴀᴛᴜʟᴀᴛɪᴏɴꜱ, ${ctx.from.first_name}!* 🎉\n\n` +
                        `✅ ʏᴏᴜ ʜᴀᴠᴇ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴠᴇʀɪꜰɪᴇᴅ!!\n` +
                        `🚀 ɴᴏᴡ, ᴄʜᴏᴏꜱᴇ ᴀ ʜᴀᴄᴋ ʙᴇʟᴏᴡ ᴀɴᴅ ꜱᴛᴀʀᴛ ᴡɪɴɴɪɴɢ!! 🎮🔥`,
                    parse_mode: "Markdown",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "🎮 𝗠𝗜𝗡𝗘𝗦 𝗛𝗔𝗖𝗞",
                                    web_app: {
                                        url: "https://team19sachin.github.io/MinesPrediction/",
                                    },
                                },
                            ],
                            [
                                {
                                    text: "🎯 𝗪𝗜𝗡𝗚𝗢 𝗛𝗔𝗖𝗞",
                                    web_app: {
                                        url: "https://team19sachin.github.io/WingoPrediction/",
                                    },
                                },
                            ],
                        ],
                    },
                },
            );
        } else {
            // ❌ Agar user dono channels me nahi hai, warning do
            await ctx.reply("⚠️ ʏᴏᴜ ᴍᴜꜱᴛ ᴊᴏɪɴ ᴀʟʟ ᴄʜᴀɴɴᴇʟ ᴛᴏ ᴄᴏɴᴛɪɴᴜᴇ!");
        }
    } catch (error) {
        console.error("Verification Error:", error);
        await ctx.reply(
            "⚠️ Error checking your membership. Please try again later.",
        );
    }
});

// 🔹 Bot Ko Start Karna
bot.launch();
console.log("🤖 Bot is running...");


const express = require('express');  // Express.js इम्पोर्ट करें
const app = express();  // Express ऐप इनिशियलाइज़ करें

const PORT = process.env.PORT || 3000; // पोर्ट सेट करें

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
