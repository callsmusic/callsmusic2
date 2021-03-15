# SU Music Player — The first open-source PyTgCalls based Pyrogram bot to play music in voice chats

## Requirements

- FFmpeg
- NodeJS 15+
- Python 3.7+

## Deployment

### Config

Copy `example.env` to `.env` and fill it with your credentials.

### Without Docker

1. Install Python requirements:
   ```bash
   pip install -U -r requirements.txt
   ```
2. Run:
   ```bash
   python main.py
   ```

### Using Docker

1. Build:
   ```bash
   docker build -t musicplayer .
   ```
2. Run:
   ```bash
   docker run --env-file .env musicplayer
   ```

### Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/suprojects/CallsMusicHeroku/)


## Credits

- [Roj](https://github.com/rojserbest): main developer
- [Marvin](https://github.com/BlackStoneReborn): bug reporter
- [Laky](https://github.com/Laky-64) & [Andrew](https://github.com/AndrewLaneX): PyTgCalls
