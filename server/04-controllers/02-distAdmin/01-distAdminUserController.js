
const DistAdminUser = require("../../02-models/02-distAdmin/distAdminUserSchema.js");
const bcrypt = require ("bcrypt")
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const speakeasy = require('speakeasy');
dotenv.config();

// // Retrieve the salt rounds from the environment
// const saltRounds = parseInt(process.env.SALT_ROUNDS);

// if (isNaN(saltRounds) || saltRounds <= 0) {
//   console.error('Invalid SALT_ROUNDS value in .env');
//   process.exit(1); // Exit the script with an error code
// }

const DistAdminSignUp = async(req, res) => {
    try{
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = encryptedPassword
        req.body.backup2FaCode = Math.floor(100000 + Math.random() * 900000)

        const data = await DistAdminUser.create(req.body)
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


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password',
  },
});

const SendOtp = async (req, res) => {
  const { email } = req.body;

  // Find the user by email (in your real app, fetch from database)
  const user = DistAdminUser.findOne(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate and save OTP secret
  user.otpSecret = speakeasy.generateSecret().base32;

  // Generate OTP
  const otp = speakeasy.totp({
    secret: user.otpSecret,
    encoding: 'base32',
    // window: 30
  });

// Send OTP via email
try {
    if (email) {
        console.log(email)
        // let testAccount = await nodemailer.createTestAccount()
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'brent.bednar64@ethereal.email',
                pass: '7kGuVczKaRn2k5nGvU'
            }
        });
        let info = await transporter.sendMail({
            from: 'NNDSWO Headquarters', // sender address
            to: email, // list of receivers
            subject: 'NNDSWO Login OTP', // Subject line
            text: 'Verify your login to district admin account', // plain text body
            html: `<h>Verify your login to NNDSWO district admin account.</h><br><h>Your one time password to verify login code is <h><h1  style="color:#5A0047;">${otp}</h1><br><h>The code is valid for 30 seconds.  <h `
        })

        console.log("Message sent: %s", info.messageId);
    } else {
        res.status(401).json({ msg: "The email address doesn't exist" });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
}

}

// Controller to verify OTP
const verifyOtp = async(req, res) => {
  const { email, otp } = req.body;

  // Find the user by email (in your real app, fetch from database)
  const user = DistAdminUser.findOne(email);

  if (!user || !user.otpSecret) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  // Verify OTP
  const isValidOTP = speakeasy.totp.verify({
    secret: user.otpSecret,
    encoding: 'base32',
    token: otp,
  });

  if (isValidOTP) {
    // Clear OTP secret after successful verification
    user.otpSecret = null;
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(401).json({ message: 'Invalid OTP' });
  }
}


const DistAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const distAdminUser = await DistAdminUser.findOne({ email: email })

        if (!distAdminUser || !(await bcrypt.compare(password, distAdminUser.password))) {
            return (res.status(401).json({ msg: "Invalid email or password." }))
        } else {
            res.status(200).json({
                msg: "Logged into district admin account successfully.",
                fullName: distAdminUser.fullName,
                email: distAdminUser.email,
                backup2FaCode: distAdminUser.backup2FaCode,
                profileImageName: distAdminUser.profileImageName,
                district: distAdminUser.district,
                id: distAdminUser._id
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const ChangeDistAdminUserProfile = async (req, res) => {
    try {
        // Remove the "password" field from req.body if it exists
        if (req.body.hasOwnProperty('password')) {
            delete req.body.password;
        }

        const updated = await DistAdminUser.findByIdAndUpdate(req.body._id, req.body);

        if (updated) {
            res.status(200).json({
                msg: "Profile updated!",
                fullName: req.body.fullName,
                profileImageName: profile.profileImageName,
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


const ChangeDistAdminUserPassword = async (req, res) => {
    // try {
    //     const { oldPassword, newPassword, _id } = req.body

    //     const user = await DistAdminUser.findById(_id)

    //     if (!user) {
    //         return res.status(404).json({ msg: "Super admin user not found." })
    //     }

    //     const isMatch = bcrypt.compare(oldPassword, user.password)

    //     if (!isMatch) {
    //         return res.status(401).json({ msg: "Old password is incorrect." })
    //     }

    //     const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    //     user.password = hashedNewPassword
    //     await user.save()

    //     return res.status(200).json({ msg: "Password updated successfully." })

    // } catch (error) {
    //     console.error("Authentication error:", error);
    //     return res.status(500).json({ msg: "Internal server error." });
    // }
}

const GetDistAdminUserProfile = async (req, res) => {
    try {

        const profile = await DistAdminUser.findById(req.body._id)

        if (profile) {
            res.status(200).json({
                fullName: profile.fullName,
                email: profile.email,
                profileImageName: profile.profileImageName
            })
        } else {
            res.json({ msg: "Error" })
        }

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const GetDistAdminUsersList = async (req, res) => {
    try {

        //filter
        const queryObj = { ...req.query }
        const excludeFields = ["page", "sort", "skip", "limit", "fields"]
        excludeFields.forEach(el => delete queryObj[el])

        //sort
        const sortBy = req.query.sort
        // console.log(queryObj, req.query.sort)

        //pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        console.log(page, limit, skip)

        const profiles = await DistAdminUser.find(queryObj).sort(sortBy).skip(skip).limit(limit)

        if (profiles) {
            const data = profiles.map(profile => ({
                _id: profile._id,
                fullName: profile.fullName,
                phoneNumber: profile.phoneNumber,
                email: profile.email,
                backup2FaCode: profile.backup2FaCode,
                profileImageName: profile.profileImageName,
                district: profile.district,
                createdAt: profile.createdAt,
                updatedAt: profile.updatedAt,
            }))
            res.status(200).json({data })
        } else {
            res.json({ msg: "DistAdminUser profiles not found." })
        }

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const DeleteDistAdmin = async(req, res) => {
    try {
        const id = req.params.id;

        const deletedDistAdmin = await DistAdminUser.findByIdAndDelete(id);

        if (!deletedDistAdmin) {
            return res.status(404).json({ message: 'Distrist admin data not found' });
        }

        res.status(200).json({ message: 'Distrist admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting distrist admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const CheckBackUp2FaCode = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await DistAdminUser.findById(id);
        console.log(data.backup2FaCode, req.body.backup2FaCodeForCheck)
        if (!data) {
            // User not found
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!data.backup2FaCode) {
            // Backup 2FA code not set for the user
            return res.status(401).json({ message: 'Backup 2FA code not set.' });
        }

        if (data.backup2FaCode === req.body.backup2FaCodeForCheck) {
            res.status(200).json({ message: 'Backup 2FA code matches.' });
        } else {
            res.status(401).json({ message: 'Invalid backup 2FA code.' });
        }

    } catch (error) {
        console.error('Error checking 2FA backup code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




exports.DistAdminSignUp = DistAdminSignUp
exports.DistAdminLogin = DistAdminLogin
exports.ChangeDistAdminUserProfile = ChangeDistAdminUserProfile
exports.ChangeDistAdminUserPassword = ChangeDistAdminUserPassword
exports.GetDistAdminUserProfile = GetDistAdminUserProfile
exports.GetDistAdminUsersList = GetDistAdminUsersList
exports.DeleteDistAdmin = DeleteDistAdmin
exports.CheckBackUp2FaCode = CheckBackUp2FaCode
exports.SendOtp = SendOtp
exports.verifyOtp = verifyOtp
