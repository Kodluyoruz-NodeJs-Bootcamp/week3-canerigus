import { RequestHandler } from "express";
import { ExpressError } from "../utils/ErrorHandler";
import * as bcrypt from 'bcrypt'
import {User, IUser} from '../model/user';
import { generateAccessToken } from "../utils/middleware"
import '../config/session'

//app use controller. available every req/res
//The res.locals property is an object that contains response local variables scoped to the request and because of this, 
//it is only available to the view(s) rendered during that request / response cyc
export const handleViews: RequestHandler = (req, res, next) => {
  //send username info res.locals to change navbar.
  res.locals.currentUser = req.session.username;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
}

//home get controller
export const renderHome: RequestHandler = (req, res) => {
  res.render('home')
}

//register get controller
export const renderRegister: RequestHandler = (req, res)  => {
  res.render('register')
}
//register post controller
export const register: RequestHandler = async (req, res)  => {
  try {
    const { name, surname, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await new User({ name, surname, username, password: hashedPassword })
    await user.save();
    req.flash('success', 'Successfully signed up!')
    res.redirect('login')
  } catch (e) {
    req.flash('error', 'Something went wrong!. Maybe the username or email already in use!')
    res.redirect('register')
  }
}


//login get controller
export const renderLogin: RequestHandler = (req, res)  => {
  res.render('login')
}
//login post controller
export const login: RequestHandler = async (req, res) => {
  //get username&password from body then correct it with the registered userbase.
  const username = req.body.username;
  const password = req.body.password;
  const user: IUser = await User.findOne({ username })
  if (!user) {
    req.flash('error', 'User not found!')
    return res.redirect('login')
  }
  try {
    if (await user.username === username && await bcrypt.compare(password, user.password)) {
      //after username & password correction, generate token for the user for specified minutes.
      const name = {name: username}
      const accessToken = await generateAccessToken(name)
      //jwt token generated and sent to client as cookie.
      res.cookie("token", accessToken, { httpOnly: true, sameSite: "strict" });
      //username added into session info.
      req.session.username = user.username;
      req.flash('success', 'Successfully logged in!')
      res.redirect('users')
    } else {
      req.flash('error', 'Wrong username or password!')
      return res.redirect('login')
    }

  } catch (e) {
    req.flash('error', 'Sorry, something went wrong while loggin in!')
    res.redirect('login')
  }
}

//user get controller
//redirect sends req.body info temporarily to /users get route
export const renderUsers: RequestHandler =  async (req, res) => {
  //find the current user by session.
  //const user = await User.findOne({ username: req.session.username });
  //find the current user by token
  const user = await User.findOne({ username: req.body.name });
  const session = req.sessionID
  const token = req.cookies.token
  //token expiration date
  const expDate = new Date(req.body.exp * 1000).toLocaleString('tr-TR', { timeZone: 'Turkey' })
  //token initiation date
  const iatDate = new Date(req.body.iat * 1000).toLocaleString('tr-TR', { timeZone: 'Turkey' })
  res.render('users', { user, session, token, expDate, iatDate })
}

//logout controller
export const logout: RequestHandler = (req, res)  => {
  req.session.username = null;
  res.clearCookie('token');
  res.redirect('/');
}

//unknown url handler
export const NotFound: RequestHandler = (req, res, next) => {
  next(new ExpressError('Page not Found', 404))
}

