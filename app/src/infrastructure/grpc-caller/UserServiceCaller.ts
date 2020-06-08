import glob from 'glob';
import caller from 'grpc-caller';

export default class UserServiceCaller {
  private readonly caller: any;

  constructor() {
    const [protoPath]: string[] = glob.sync('idl/user.proto');
    console.log(protoPath);
    this.caller = caller('localhost:9000', protoPath, 'UserService');
  }

  public getCaller(): any {
    return this.caller;
  }
}
