
const DistAdminUser = require("../../02-models/02-distAdmin/distAdminUserSchema.js");
const bcrypt = require ("bcrypt")
const saltRounds = 10


const DistAdminSignUp = async(req, res) => {
    try{
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds)

        req.body.password = encryptedPassword

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

const DistAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const distAdminUser = await DistAdminUser.findOne({ email: email })

        if (!distAdminUser || !(await bcrypt.compare(password, distAdminUser.password))) {
            return (res.status(401).json({ msg: "Invalid email or password." }))
        } else {
            res.status(200).json({
                msg: "Logged into super admin account successfully.",
                fullName: distAdminUser.fullName,
                email: distAdminUser.email,
                profileImageName: profile.profileImageName,
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
    try {
        const { oldPassword, newPassword, _id } = req.body

        const user = await DistAdminUser.findById(_id)

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

        const profiles = await DistAdminUser.find({}, {password: 0})

        if (profiles) {
            const data = profiles.map(profile => ({
                _id: profile._id,
                fullName: profile.fullName,
                email: profile.email,
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

exports.DistAdminSignUp = DistAdminSignUp
exports.DistAdminLogin = DistAdminLogin
exports.ChangeDistAdminUserProfile = ChangeDistAdminUserProfile
exports.ChangeDistAdminUserPassword = ChangeDistAdminUserPassword
exports.GetDistAdminUserProfile = GetDistAdminUserProfile
exports.GetDistAdminUsersList = GetDistAdminUsersList