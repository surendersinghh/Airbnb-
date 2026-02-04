const express = require("express")
const router  = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
    .get(userController.userSignupRoute)
    .post(wrapAsync(userController.userSignupRoute1)

);



router.route("/login")
    .get(saveRedirectUrl,userController.userLoginRoute)
    .post(
    passport.authenticate("local", {
    failureRedirect: "/login",
        failureFlash: true,
      }), userController.userLoginRoute1
);



//user logout routes
router.get("/logout",userController.userLogoutRoute);

module.exports = router;