import { ClusterNode, ClusterOptions } from 'ioredis';

export interface ConfigTest {
  readonly syncModels: boolean;
  readonly syncForce: boolean;
  readonly db: {
    readonly uri: string;
  };
  readonly redis?: {
    readonly startupNodes?: Array<ClusterNode>;
    readonly options?: ClusterOptions;
  };
}
