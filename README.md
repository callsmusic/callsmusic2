# SU Music Player — The first open-source PyTgCalls based Pyrogram bot to play music in voice chats

## Note

Neither this, or PyTgCalls are stable.

## Requirements

- FFmpeg
- NodeJS [nodesource.com](https://nodesource.com/)
- Python 3.7+
- [PyTgCalls](https://github.com/pytgcalls/pytgcalls)

## Deployment

1. Install Python requirements:
   ```bash
   pip install -r requirements.txt
   ```
2. Copy `example.env` to `.env` and fill it with your credentials.
3. Run:
   ```bash
   python main.py
   ```
## Deploy Docker

1. Install Python requirements:
   ```bash
   pip3 install -r requirements.txt
   ```
2. Copy `example.env` to `.env` and fill it with your credentials.
3. Run:
   ```bash
   python3 genStrSession.py
   ```
4. Build Docker:
   ```bash
   sudo docker build . -t uptoyou
   ```
5. Run Docker:
   ```bash
   sudo docker run --privileged -t -i --rm uptoyou 
   ```
   or
   ```bash
   sudo docker uptoyou
   ```
## Credits
- kang from [suproject](https://github.com/suprojects/MusicPlayer) 
- [Roj](https://github.com/rojserbest): main developer
- [Marvin](https://github.com/BlackStoneReborn): bug reporter
- [Laky](https://github.com/Laky-64) & [Andrew](https://github.com/AndrewLaneX): PyTgCalls
