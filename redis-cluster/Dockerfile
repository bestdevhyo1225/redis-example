FROM redis:5.0-alpine

RUN rm -rf /usr/local/bin/docker-entrypoint.sh

COPY redis.conf /usr/local/bin/redis.conf
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod 777 /usr/local/bin/redis.conf
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh

RUN chown redis:redis /usr/local/bin/redis.conf
RUN chown redis:redis /usr/local/bin/docker-entrypoint.sh

EXPOSE $CLIENTPORT

# 컨테이너가 생성, 시작하는 시점에 실행된다.
ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]

# 컨테이너 빌드가 완료되고 Redis Server를 실행한다.
CMD [ "redis-server","/usr/local/bin/redis.conf" ]