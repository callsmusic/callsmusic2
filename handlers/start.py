from pyrogram import Client, filters
from pyrogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton


@Client.on_message(
    filters.command("start")
    & filters.private
    & ~ filters.edited
)
async def start_(client: Client, message: Message):
    await message.reply_text(
        f"""<b>👋🏻 Hai {message.from_user.first_name}!</b>

Saya bisa memutar musik melalui obrolan suara digrub Telegram anda.
Gunakan tombol di bawah untuk mengetahui lebih banyak tentang saya dan
Jangan lupa baca Cara Penggunaan dan Frequently Asked Questions! Untuk dapat menggunakan saya.""",
        reply_markup=InlineKeyboardMarkup(
            [
                [
                    InlineKeyboardButton(
                        "⚒ Pengembang", url="https://t.me/hanzprjct"
                    )
                ],
            [
                    InlineKeyboardButton(
                        "📖 Cara Penggunaan", url="https://bit.ly/3escfn3"
                    ),
                ],
   [
                    InlineKeyboardButton(
                        "🗣️ Frequently Asked Questions", url="https://telegra.ph/Frequently-Asked-Questions-03-10"
                    ),
                ],
            [
                    InlineKeyboardButton(
                        "💬 Group", url="https://t.me/AnnabelleSupport"
                    ),
                ],
            [
                    InlineKeyboardButton(
                        "📢 Channel", url="https://t.me/AnnabelleUpdates"
                    ),
                    InlineKeyboardButton(
                        "💸 Donasi", url="https://trakteer.id/hanzerge"
                    )
                ]
            ]
        )
    )


@Client.on_message(
    filters.command("start")
    & filters.group
    & ~ filters.edited
)
async def start(client: Client, message: Message):
    await message.reply_text(
        "💁🏻‍♂️ Apakah kamu ingin mencari sebuah lagu?",
        reply_markup=InlineKeyboardMarkup(
            [
                [
                    InlineKeyboardButton(
                        "✅ Iya", switch_inline_query_current_chat=""
                    ),
                    InlineKeyboardButton(
                        "Tidak ❌", callback_data="close"
                    )
                ]
            ]
        )
    )
