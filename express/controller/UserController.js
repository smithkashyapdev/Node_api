const UserModel = require("../model/User");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helper/apiResponse");
const utility = require("../helper/utility");
const { constants } = require("../helper/constants");
const bcrypt = require("bcrypt");

exports.signUp = [

    body("firstName").isLength({ min: 1 }).trim().withMessage("First name must be specified.")
        .isAlphanumeric().withMessage("First name has non-alphanumeric characters."),
    body("lastName").isLength({ min: 1 }).trim().withMessage("Last name must be specified.")
        .isAlphanumeric().withMessage("Last name has non-alphanumeric characters."),
    body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
        .isEmail().withMessage("Email must be a valid email address."),
    body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
    // Sanitize fields.
    sanitizeBody("firstName").escape(),
    sanitizeBody("lastName").escape(),
    sanitizeBody("email").escape(),
    sanitizeBody("password").escape(),

    (req, res) => {
        try {
            // Extract the validation errors from a request.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Display sanitized values/errors messages.
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }else {
                //hash input password
                bcrypt.hash(req.body.password,10,function(err, hash) {
                    // generate OTP for confirmation
                    let otp = utility.randomNumber(4);
                    // Create User object with escaped and trimmed data
                    var user = new UserModel(
                        {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            confirmOTP: otp
                        }
                    );
                    // Html email body
                    let html = "<p>Please Confirm your Account.</p><p>OTP: "+otp+"</p>";
                    // Send confirmation email



                    user.save(function (err) {
                        if (err) {
                            return apiResponse.ErrorResponse(res, err);
                        }
                        let userData = {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        };
                        return apiResponse.successResponseWithData(res,"Registration Success.", userData);
                    })
                });
            }
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }

]