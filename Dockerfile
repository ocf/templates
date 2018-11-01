FROM nginx

RUN apt-get update && apt-get install -y python3

COPY www /usr/share/nginx/html/
COPY template.py /tmp

RUN cd /usr/share/nginx/html && /tmp/template.py
