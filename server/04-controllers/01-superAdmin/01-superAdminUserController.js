
const SuperAdminUser = require("../../02-models/01-superAdmin/superAdminUserSchema.js");
const bcrypt = require ("bcrypt")
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const otpEmailHost = process.env.OTP_SENDING_EMAIL_HOST
const otpEmailPort = process.env.OTP_SENDING_EMAIL_PORT
const otpEmailAddress = process.env.OTP_SENDING_EMAIL
const otpEmailPassword = process.env.OTP_SENDING_EMAIL_PASSWORD

const SuperAdminSignUp = async(req, res) => {
    try{
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = encryptedPassword

        const data = await SuperAdminUser.create(req.body)
        if(data){
            res.status(200).json({
                msg: "Admin account created successfully."
            })
        }else{
            res.status(403).json({
                msg: "Admin account registration failed."
            })
        }
    }catch(error){
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const SuperAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const superAdminUser = await SuperAdminUser.findOne({ email: email })

        if (!superAdminUser || !(await bcrypt.compare(password, superAdminUser.password))) {
            return (res.status(401).json({ msg: "Invalid email or password." }))
        } else {
            res.status(200).json({
                msg: "Logged into super admin account successfully.",
                fullName: superAdminUser.fullName,
                email: superAdminUser.email,
                id: superAdminUser._id
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const ChangeSuperAdminUserProfile = async (req, res) => {
    try {
        // Remove the "password" field from req.body if it exists
        if (req.body.hasOwnProperty('password')) {
            delete req.body.password;
        }

        const updated = await SuperAdminUser.findByIdAndUpdate(req.body._id, req.body);

        if (updated) {
            res.status(200).json({
                msg: "Profile updated!",
                fullName: req.body.fullName,
                email: req.body.email,
                id: updated._id
            });
        } else {
            res.json({ msg: "Error" });
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}


const ChangeSuperAdminUserPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, _id } = req.body

        const user = await SuperAdminUser.findById(_id)

        if (!user) {
            return res.status(404).json({ msg: "Super admin user not found." })
        }

        const isMatch = bcrypt.compare(oldPassword, user.password)

        if (!isMatch) {
            return res.status(401).json({ msg: "Old password is incorrect." })
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedNewPassword
        await user.save()

        return res.status(200).json({ msg: "Password updated successfully." })

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const GetSuperAdminUserProfile = async (req, res) => {
    try {

        const profile = await SuperAdminUser.findById(req.body._id)

        if (profile) {
            res.status(200).json({
                fullName: profile.fullName,
                email: profile.email,
            })
        } else {
            res.json({ msg: "Error" })
        }

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

// const Dcrypt = async (req, res) => {

//     const hashedPassword = '$2b$10$xxJyOKV1ZS7Y9sjbbOBa2.VKjb0tnRxJ4r4rf.eGYevlrbDcaOQqq';
//     const userInputPassword = 'Hello@123';
    
//     bcrypt.compare(userInputPassword, hashedPassword, (err, result) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
    
//       if (result) {
//         console.log('Password is correct!');
//       } else {
//         console.log('Password is incorrect.');
//       }
//     });
    
// }

// SEND OTP BY EMAIL
const SendSuperAdminOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email (in your real app, fetch from database)
        const user = await SuperAdminUser.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000


        // Send OTP via email
        if (email) {
            // console.log(email)
            // let testAccount = await nodemailer.createTestAccount()
            const transporter = nodemailer.createTransport({
                host: otpEmailHost,
                port: otpEmailPort,
                auth: {
                    user: otpEmailAddress,
                    pass: otpEmailPassword
                }
            });
            let info = await transporter.sendMail({
                from: 'NNDSWO Headquarters', // sender address
                to: email, // list of receivers
                subject: 'NNDSWO Login OTP', // Subject line
                text: 'Verify your login to super admin account', // plain text body
                html: `<h>Verify your login to NNDSWO super admin account.</h><br><h>Your one time password to verify login code is <h><h1  style="color:#5A0047;">${otp}</h1><br><h>The code is valid for 5 minutes.  <h> `
            })

            console.log("Message sent: %s", info.messageId);
        } else {
            return res.status(401).json({ msg: "The email address doesn't exist" });
        }
        console.log(otp)
        const hashedOTP = await bcrypt.hash(otp.toString(), 10)
        //OTP VALID DURATION
        const otpExpiresAt = Date.now() + 300000
        const updated = await SuperAdminUser.updateMany(
            { email: email },
            { $set: { otp: hashedOTP, otpExpiresAt: otpExpiresAt } }
        )
        if (updated) {
            return res.status(200).json({ msg: "Encrypted OTP sent by email, saved to the DB and expiry set." });
        } else {
            return res.status(401).json({ msg: "Failed to save OTP to the DB and set expiry." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send OTP' });
    }

}

// Controller to verify OTP
const VerifySuperAdminOtp = async (req, res) => {
    const email = req.body.email
    const reqOtp = req.body.otp
    try {
        if (!email || !reqOtp) {
            return res.status(400).json({ message: 'Invalid request. Empty values.' });
        }
        // Find the user by email (in your real app, fetch from database)
        const data = await SuperAdminUser.findOne({ email });

        if (data) {
            const hashedOtp = data.otp;
            const expiresAt = data.otpExpiresAt
            if (expiresAt < Date.now()) {
                res.status(401).json({
                    code: "expired_otp",
                    msg: "The OTP code has expired."
                })
            } else {
                const isValidOtp = await bcrypt.compare(reqOtp, hashedOtp)
                if (!isValidOtp) {
                    res.status(401).json({
                        code: "invalid_otp",
                        msg: "The OTP code is invalid."
                    })
                } else {
                    res.status(200).json({
                        msg: "The OTP code his verified successfully.",
                        fullName: data.fullName,
                        email: data.email,
                        profileImageName: data.profileImageName,
                        id: data._id
                    })
                }
            }
        } else {
            res.status(404).json({
                msg: "No data found."
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Failed to verify OTP."
        })
    }
}

exports.SuperAdminSignUp = SuperAdminSignUp
exports.SuperAdminLogin = SuperAdminLogin
exports.ChangeSuperAdminUserProfile = ChangeSuperAdminUserProfile
exports.ChangeSuperAdminUserPassword = ChangeSuperAdminUserPassword
exports.GetSuperAdminUserProfile = GetSuperAdminUserProfile
exports.SendSuperAdminOtp = SendSuperAdminOtp
exports.VerifySuperAdminOtp = VerifySuperAdminOtp
// exports.Dcrypt = Dcrypt