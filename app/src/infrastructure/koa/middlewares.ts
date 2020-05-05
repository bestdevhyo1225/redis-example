import { Context, Next } from 'koa';

const handleError = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    const message = ctx.status === 500 ? 'Internal Server Error' : err.message;
    ctx.error(message, null, err.code);
    ctx.app.emit('error', err, ctx);
  }
};

export default {
  handleError,
};
