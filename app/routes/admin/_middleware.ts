console.log('[_middleware.ts] File loaded');
import { basicAuth } from 'hono/basic-auth'
import  { createRoute } from 'honox/factory'

const basicAuthHandler = basicAuth({
  username: 'admin',
  password: 'mactive'
});
console.log('[_middleware.ts] basicAuthHandler created, type:', typeof basicAuthHandler);

export default createRoute(async (c, next) => {
  console.log('[_middleware.ts] createRoute callback in middleware invoked.');
  try {
    console.log('[_middleware.ts] Attempting to execute basicAuthHandler...');
    const response = await basicAuthHandler(c, async () => {
      console.log('[_middleware.ts] basicAuthHandler successful (called its internal next). Calling Honox next().');
      await next();
    });

    if (response instanceof Response) {
      console.log('[_middleware.ts] basicAuthHandler returned a Response (e.g., 401). Returning it.');
      return response;
    }

    console.log('[_middleware.ts] basicAuthHandler finished. If successful, Honox next() should have been called.');
  } catch (e) {
    console.error('[_middleware.ts] Error/Exception during basicAuthHandler execution:', e);
    if (e instanceof Error && 'res' in e && e.res instanceof Response) {
      console.log('[_middleware.ts] basicAuthHandler threw HTTPException, returning its Response object.');
      return e.res;
    }
    console.error('[_middleware.ts] Unexpected error/exception type, rethrowing.');
    throw e;
  }
});