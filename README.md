## Redis Replication, Redis Sentinel, Redis Cluster, Cache API Server

<br>

### :diamonds: Redis Architecture

![image](https://user-images.githubusercontent.com/23515771/81189925-255e0e00-8ff2-11ea-8185-5f7328d0877a.png)

<br>

### :diamonds: Done

- Redis Replication 구현

- Redis Sentinel 구현 및 Fail Over 동작 체크 확인

- typescript, awilix-koa, ioredis로 api server 구현 및 Fail Over시, Write/Read 동작 체크 확인

<br>

### :diamonds: Todo

- Docker Container로 API Server와 Redis를 연결하는 방법 (Host랑 Port만으로 연결할 수 없었음)

- HAProxy 부하 분산 처리하기

- AWS ElasticCache로 전환하기

- 캐시 전략에 대해 공부하기

  - `Look aside Cache` : 캐시에 있으면 리턴, 없으면 캐시에 저장하고 리턴

  - `Write Back` : 모든 데이터를 캐시에 저장, 특정 시점에만 캐시 데이터 DB에 저장

### :diamonds: Important

- Redis는 메모리 관리가 제일 중요
- 메모리 관리를 위해 적절한 Collections를 선택하고, ZipList를 최대한 활용할 것
- Redis는 싱글스레드이므로, 모든 데이터를 한번에 처리하는 작업은 절대 하지말 것

<br>
