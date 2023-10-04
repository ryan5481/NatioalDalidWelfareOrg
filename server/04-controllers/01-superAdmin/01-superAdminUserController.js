
const SuperAdminUser = require("../../02-models/01-superAdmin/superAdminUserSchema.js");
const bcrypt = require ("bcrypt")
const dotenv = require("dotenv");
dotenv.config();

// Retrieve the salt rounds from the environment
// const saltRounds = parseInt(process.env.SALT_ROUNDS);

// if (isNaN(saltRounds) || saltRounds <= 0) {
//   console.error('Invalid SALT_ROUNDS value in .env');
//   process.exit(1); // Exit the script with an error code
// }

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

// const GetSuperAdminPassword = async (req, res) => {
//     try {
//         // console.log(req.params)
//         const data = await SuperAdminUser.findById(req.body._id)
//         const encryptedPass = data.password

//         if (data) {
//             res.status(200).json({
//                 pass: data.password,
//             })
//         } else {
//             res.json({ msg: "Error" })
//         }

//     } catch (error) {
//         console.error("Authentication error:", error);
//         return res.status(500).json({ msg: "Internal server error." });
//     }
// }

exports.SuperAdminSignUp = SuperAdminSignUp
exports.SuperAdminLogin = SuperAdminLogin
exports.ChangeSuperAdminUserProfile = ChangeSuperAdminUserProfile
exports.ChangeSuperAdminUserPassword = ChangeSuperAdminUserPassword
exports.GetSuperAdminUserProfile = GetSuperAdminUserProfile
// exports.GetSuperAdminPassword = GetSuperAdminPassword