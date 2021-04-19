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
from typing import Dict


channels: Dict[int, int] = {}


def set_channel(chat_id: int, channel_id: int) -> bool:
    if chat_id in channels:
        if channels[chat_id] == channel_id:
            return False
    channels[chat_id] = channel_id
    return True


def rm_channel(chat_id: int) -> bool:
    if chat_id in channels:
        del channels[chat_id]
        return True
    return False


def get_channel(chat_id: int):
    if chat_id in channels:
        return channels[chat_id]
    return chat_id
