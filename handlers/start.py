from pyrogram import Client, filters
from pyrogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton


@Client.on_message(
    filters.command("start")
    & filters.private
    & ~ filters.edited
)
async def start_(client: Client, message: Message):
    await message.reply_text(
        f"""<b>👋🏻 heya how are you {message.from_user.first_name}!</b>

iam a telegram voice chat music bot created by team @unitedbotssupport.

you can join the given groups for our support.""",
        reply_markup=InlineKeyboardMarkup(
            [
                [
                    InlineKeyboardButton(
                        "ELIZA SOURCE", url="unitedbotssupport"
                    )
                ],
                [
                    InlineKeyboardButton(
                        "GROUP", url="https://unitedbotssupport"
                    ),
                    InlineKeyboardButton(
                        "CHANNEL", url="https://t.me/nimmisupport"
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
        "IF WHAT TO SEARCH FOR A YOUTUBE LINK",
        reply_markup=InlineKeyboardMarkup(
            [
                [
                    InlineKeyboardButton(
                        "YES", switch_inline_query_current_chat=""
                    ),
                    InlineKeyboardButton(
                        "NO", callback_data="close"
                    )
                ]
            ]
        )
    )
