# Calls Music 2 - Telegram bot for streaming audio in group calls
# Copyright (C) 2021  Roj Serbest
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
from pyrogram import Client
from pyrogram.types import Message

from callsmusic.callsmusic import client
from callsmusic.channels import rm_channel
from callsmusic.channels import set_channel
from callsmusic.helpers.decorators import authorized_users_only
from callsmusic.helpers.decorators import errors
from callsmusic.helpers.filters import command
from callsmusic.helpers.filters import other_filters


@Client.on_message(command('channel') & other_filters)
@errors
@authorized_users_only
async def _(_, message: Message):
    if len(message.command) == 1:
        if rm_channel(message.chat.id):
            await message.reply('Channel removed!')
        else:
            await message.reply('Channel is not set!')
    else:
        chat_id = message.command[1]
        try:
            chat_id = int(chat_id)
        except ValueError:
            await message.reply('Invalid chat ID!')
            return
        await client.get_chat(chat_id)
        if set_channel(message.chat.id, chat_id):
            await message.reply('Channel set!')
        else:
            await message.reply('Channel is already this!')
