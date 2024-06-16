import session from "express-session"
export default  session({
    secret: `'k234234sdfd;;'hgrghx;.;dtgbgggg54cv,,435i934-sdffsd234fwee45a45gt#3eewas46ghcat'`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  })
  