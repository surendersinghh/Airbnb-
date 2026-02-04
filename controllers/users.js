const User = require("../models/user.js");


module.exports.userSignupRoute = (req, res) => {
    res.render("users/signup.ejs");
};



module.exports.userSignupRoute1 = async(req, res, next) => {
    console.log(req.body);
        try {
         let {username, email, password} = req.body;
         console.log(req.body);
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
    req.flash("success", "Welcome to WanderLust");
    res.redirect("/listings");
    
    });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};



module.exports.userLoginRoute = (req, res) => {
    res.render("users/login.ejs");
};


module.exports.userLoginRoute1 = async (req, res) => {
  console.log(req.body);
  req.flash("success", "Welcome back to WanderLust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};



module.exports.userLogoutRoute =  (req, res, next) => {
    req.logout((err) => {
        if(err) {
           return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};