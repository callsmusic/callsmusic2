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
from os.path import dirname
from os.path import join
from typing import Union

from pyrogram.types import Audio
from pyrogram.types import Message
from pyrogram.types import Voice


def url(message_1: Message) -> Union[str, None]:
    messages = [message_1]

    if message_1.reply_to_message:
        messages.append(message_1.reply_to_message)

    text = ''
    offset = -1
    length = -1

    for message in messages:
        if offset != -1:
            break

        if message.entities:
            for entity in message.entities:
                if entity.type == 'url':
                    text = message.text or message.caption
                    offset, length = entity.offset, entity.length
                    break

    if offset == -1:
        return None

    return text[offset:offset + length]


def file_name(audio: Union[Audio, Voice]) -> str:
    return join(dirname(dirname(dirname(__file__))), audio.file_unique_id)


def audio(message: Message) -> Union[Audio, Voice, None]:
    return (
        message.audio or message.voice
    ) if message else None
