FROM docker.io/_/python:3.11-slim as builder

COPY www /build/www
COPY template.py .

RUN python template.py /build/www/index.html.tmpl /build/www/templates /build/www/index.html


FROM docker.io/lipanski/docker-static-website:2.1.0

COPY --from=builder /build/www/ ./

