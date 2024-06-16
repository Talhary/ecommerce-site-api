import 'dotenv/config';
import '../middlware/auth.js';
import passport from 'passport';
import { generateToken } from '../utils/jwt.js';
import { isAuthenticated } from '../middlware/authJWT.js';
import express from 'express'
const router = express.Router()
const app = router;
app.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

app.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});
app.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get('/google/callback',
  passport.authenticate('google',
   { 
    session: false ,
    failureRedirect:'/login/failure'
  }),
  (req, res) => {
    const token = generateToken(req.user);
    // res.cookie('Authorization', `Bearer ${token}`); // Set the token in the headers
    res.redirect(process.env.CLIENT_URL+'?token='+token) // Return the token in the response body
 }
);
app.get('/user', isAuthenticated, (req, res) => {

  res.json({ user: req.user });
});
export default app