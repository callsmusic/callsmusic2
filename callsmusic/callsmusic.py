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
from pytgcalls import PyTgCalls

from .channels import get_channel
from callsmusic import config
from callsmusic import queues

client = Client(config.SESSION_NAME, config.API_ID, config.API_HASH)
pytgcalls = PyTgCalls(client)


async def play(chat_id: int, file_path: str) -> int:
    chat_id = get_channel(chat_id)
    if chat_id in pytgcalls.active_calls:
        return await queues.put(chat_id, file_path=file_path)
    else:
        pytgcalls.join_group_call(chat_id, file_path)
        return -1


def play_next(chat_id: int):
    chat_id = get_channel(chat_id)
    if queues.is_empty(chat_id):
        pytgcalls.leave_group_call(chat_id)
    else:
        pytgcalls.change_stream(
            chat_id, queues.get(chat_id)['file_path'],
        )


def pause(chat_id: int) -> bool:
    chat_id = get_channel(chat_id)
    if (
            chat_id not in pytgcalls.active_calls
    ) or (
            pytgcalls.active_calls[chat_id] == 'paused'
    ):
        return False
    pytgcalls.pause_stream(chat_id)
    return True


def resume(chat_id: int) -> bool:
    chat_id = get_channel(chat_id)
    if (
            chat_id not in pytgcalls.active_calls
    ) or (
            pytgcalls.active_calls[chat_id] == 'playing'
    ):
        return False
    pytgcalls.resume_stream(chat_id)
    return True


def skip(chat_id: int) -> bool:
    chat_id = get_channel(chat_id)
    if chat_id not in pytgcalls.active_calls:
        return False
    queues.task_done(chat_id)
    play_next(chat_id)
    return True


def stop(chat_id: int) -> bool:
    chat_id = get_channel(chat_id)
    if chat_id not in pytgcalls.active_calls:
        return False
    try:
        queues.clear(chat_id)
    except:
        pass
    pytgcalls.leave_group_call(chat_id)
    return True


@pytgcalls.on_stream_end()
def on_stream_end(chat_id: int) -> None:
    queues.task_done(chat_id)
    play_next(chat_id)


run = pytgcalls.run
