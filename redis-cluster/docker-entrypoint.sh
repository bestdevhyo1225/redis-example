#!/bin/sh

set -e

sed -i "s/bind 127.0.0.1/bind $CLIENTHOST/g" /usr/local/bin/redis.conf
sed -i "s/port 6379/port $CLIENTPORT/g" /usr/local/bin/redis.conf

sed -i "s/# requirepass foobared/requirepass $REQUIREPASS/g" /usr/local/bin/redis.conf
sed -i "s/# masterauth <master-password>/masterauth $REQUIREPASS/g" /usr/local/bin/redis.conf

if [ "$MASTERPORT" != "" ]; then
  sed -i "s/# replicaof <masterip> <masterport>/replicaof $MASTERHOST $MASTERPORT/g" /usr/local/bin/redis.conf
fi

if [ "${1#-}" != "$1" ] || [ "${1%.conf}" != "$1" ]; then
    set -- redis-server "$@"
fi

if [ "$1" = 'redis-server' -a "$(id -u)" = '0' ]; then
    chown -R redis .
    exec su-exec redis "$@"
fi

exec "$@"