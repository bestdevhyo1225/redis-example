import { ClusterNode, ClusterOptions } from 'ioredis';

export interface ConfigDevelopment {
  readonly syncModels: boolean;
  readonly syncForce: boolean;
  readonly db: {
    readonly options: {
      readonly replication: string;
    };
  };
  readonly redis?: {
    readonly startupNodes?: Array<ClusterNode>;
    readonly options?: ClusterOptions;
  };
}
