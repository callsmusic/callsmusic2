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

from callsmusic.callsmusic import stop
from callsmusic.helpers.decorators import authorized_users_only
from callsmusic.helpers.decorators import errors
from callsmusic.helpers.filters import command
from callsmusic.helpers.filters import other_filters


@Client.on_message(command('stop') & other_filters)
@errors
@authorized_users_only
async def _(_, message: Message):
    if stop(message.chat.id):
        await message.reply_text('Stopped!')
    else:
        await message.reply_text('Nothing is playing!')
