import { ClusterNode, ClusterOptions } from 'ioredis';

export interface ConfigAll {
  readonly env: string | number;
  readonly port: number;
  readonly host: string;
  readonly syncModels: string | boolean;
  readonly syncForce: string | boolean;
  readonly jwtSecret: string | undefined;
  readonly redis: {
    readonly startupNodes: Array<ClusterNode>;
    readonly options: ClusterOptions;
  };
}
