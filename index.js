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
            caption: "👋 Welcome! Join both channels to continue.",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "📢 JOIN CHANNEL 1",
                            url: `https://t.me/${channel1.replace("@", "")}`,
                        },
                    ],
                    [
                        {
                            text: "📢 JOIN CHANNEL 2",
                            url: `https://t.me/${channel2.replace("@", "")}`,
                        },
                    ],
                    [{ text: "✅ VERIFY", callback_data: "verify" }],
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
                        `🎉 *Congratulations, ${ctx.from.first_name}!* 🎉\n\n` +
                        `✅ You have successfully verified your membership!\n` +
                        `🚀 Now, choose a hack below and start winning! 🎮🔥`,
                    parse_mode: "Markdown",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "🎮 Mines Hack",
                                    web_app: {
                                        url: "https://team19sachin.github.io/MinesPrediction/",
                                    },
                                },
                            ],
                            [
                                {
                                    text: "🎯 Wingo Hack",
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
            await ctx.reply("⚠️ You must join **both** channels to continue!");
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