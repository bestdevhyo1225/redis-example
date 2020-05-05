FROM lgatica/redis-sentinel:4.0.2

RUN rm -rf /usr/local/bin/docker-sentinel-entrypoint.sh

COPY sentinel.conf /usr/local/bin/sentinel.conf
COPY docker-sentinel-entrypoint.sh /usr/local/bin/docker-sentinel-entrypoint.sh

RUN chmod 777 /usr/local/bin/sentinel.conf
RUN chmod 777 /usr/local/bin/docker-sentinel-entrypoint.sh

RUN chown redis:redis /usr/local/bin/sentinel.conf
RUN chown redis:redis /usr/local/bin/docker-sentinel-entrypoint.sh

EXPOSE $CLIENTPORT

# 컨테이너가 생성, 시작하는 시점에 실행된다.
ENTRYPOINT [ "/usr/local/bin/docker-sentinel-entrypoint.sh" ]

CMD [ "redis-server", "/usr/local/bin/sentinel.conf", "--sentinel" ]