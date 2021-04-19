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
from os import path

from pyrogram import Client
from pyrogram.types import Message

from .. import converter
from ..callsmusic import play
from ..config import DURATION_LIMIT
from ..downloaders import youtube
from ..helpers import get
from ..helpers.decorators import errors
from ..helpers.errors import DurationLimitError
from ..helpers.filters import command
from ..helpers.filters import other_filters


@Client.on_message(command('play') & other_filters)
@errors
async def _(_, message: Message):
    audio = get.audio(message.reply_to_message)
    url = get.url(message)
    if audio:
        duration = round(audio.duration / 60)
        if duration > DURATION_LIMIT:
            raise DurationLimitError(
                f'Videos longer than {DURATION_LIMIT} minute(s) aren’t allowed, the provided video is {duration} minute(s)',
            )
        file_name = get.file_name(audio)
        file_path = await converter.convert(
            (await message.reply_to_message.download(file_name))
            if not path.isfile(file_name) else file_name,
        )
    elif url:
        file_path = await converter.convert(youtube.download(url))
    else:
        return await message.reply_text('You did not give me anything to play!')
    result = await play(message.chat.id, file_path)
    if result != -1:
        await message.reply_text(f'Queued at position {result}!')
    else:
        await message.reply_text('Playing...')
