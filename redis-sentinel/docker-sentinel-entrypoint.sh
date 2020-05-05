#!/bin/sh

set -e

sed -i "s/bind 127.0.0.1/bind $CLIENTHOST/g" /usr/local/bin/sentinel.conf
sed -i "s/port 26379/port $CLIENTPORT/g" /usr/local/bin/sentinel.conf

# sentinel이 master redis에 접근할 때 인증하는 비밀번호를 설정한다.
sed -i "s/# sentinel auth-pass mymaster MySUPER--secret-0123passw0rd/sentinel auth-pass mymaster $REQUIREPASS/g" /usr/local/bin/sentinel.conf

# 모니터링할 마스터의 Host와 Port를 정한다.
# QUORUM은 Slave->Master Role Change 시, slave redis가 받아야 하는 최소 투표 수를 정한다.
sed -i "s/sentinel monitor mymaster 127.0.0.1 6379 2/sentinel monitor mymaster $MASTERHOST $MASTERPORT $QUORUM/g" /usr/local/bin/sentinel.conf

# Redis server가 다운되고 후처리 실행 시간 까지 걸리는 시간을 지정한다.
sed -i "s/sentinel down-after-milliseconds mymaster 30000/sentinel down-after-milliseconds mymaster $DOWN_AFTER_MILLISEC/g" /usr/local/bin/sentinel.conf

# Redis failover timeout 시간을 설정한다.
sed -i "s/sentinel failover-timeout mymaster 180000/sentinel failover-timeout mymaster $FAILOVER_TIMEOUT/g" /usr/local/bin/sentinel.conf

if [ "${1#-}" != "$1" ] || [ "${1%.conf}" != "$1" ]; then
    set -- redis-server "$@"
fi

if [ "$1" = 'redis-server' -a "$(id -u)" = '0' ]; then
    chown -R redis .
    exec su-exec redis "$@"
fi

exec "$@"