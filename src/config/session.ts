//to declare additional properties on session object using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
//commented out. @types express-session 1.17.0 doesnt error type check on when adding req.session.xxx. later version needs the below code.
/* declare module 'express-session' {
  interface SessionData {
      username: string;
  }
}
export { };
 */


//cookie options
export const sessionOptions = {
  resave: true,
  saveUninitialized: true,
  secret: 'notagoodsecret',
  cookie: {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 5 * 60),
    maxAge: 1000 * 5 * 60
  }
}
