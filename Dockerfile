FROM nikolaik/python-nodejs:python3.9-nodejs15-slim

ENV DEBIAN_FRONTEND noninteractive

WORKDIR /usr/src/app
RUN chmod 777 /usr/src/app
RUN apt-get -qq update --no-install-recommends
COPY . .
RUN apt-get install -y git && \
    git clone https://github.com/pytgcalls/pytgcalls && \
    cd pytgcalls/ && \
    npm install && \
    npm run prepare && \
    cd pytgcalls/js && \
    npm install && \
    cd ../../../ && \
    pip3 install --no-cache-dir -r requirements.txt && \
    apt-get -qq install -y ffmpeg && \
    mv -v Userge.session session.session
ENV LANG en_US.UTF-8
RUN chmod +x run.sh
CMD ["bash","run.sh"]
