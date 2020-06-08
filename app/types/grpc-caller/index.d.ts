declare module 'grpc-caller' {
  export default function caller(host: string, proto: string | object, name: string): any;
}
