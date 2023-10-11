
const LogoImage = require("../../02-models/05-settings/logoImageSchema");
const dotenv = require("dotenv");
const fs = require("fs");
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
dotenv.config();


const AddLogoImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                msg: "File not received."
            });
        }
        // console.log(req.file)
        const reqInclFile = {
            logoImageName: req.file.filename,
        };

        const data = await LogoImage.create(reqInclFile)
        if (data) {
            res.status(200).json({
                msg: "Image added successfully."
            })
        } else {
            res.status(403).json({
                msg: "Adding image failed."
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const GetLogoImage = async (req, res) => {
    try {
        // Filter
        const data = await LogoImage.findById("652600b13cd29ea24a8ca7d5");

        if (data) {
            res.status(200).json({
                data
            });
        } else {
            res.json({ msg: "Error" });
        }
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const EditLogoImage = async (req, res) => {
    try {
        // console.log(req.params, req.file);

        // const id = req.params.id;
        const updatedFields = { logoImageName: req.file.filename }

        if (!updatedFields || Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ msg: "No valid update data provided." });
        }

        // Find the existing document to get the old filename
        const existingDoc = await LogoImage.findById("652600b13cd29ea24a8ca7d5");

        if (!existingDoc) {
            return res.status(404).json({ msg: "Contact not found." });
        }

        // Delete the old image file
        if (existingDoc.logoImageName) {
            const oldImagePath = `../client/src/uploads/logoImage/${existingDoc.logoImageName}`;
            await fs.promises.unlink(oldImagePath);
        }

        const updated = await LogoImage.findByIdAndUpdate(
            "652600b13cd29ea24a8ca7d5",
            { $set: updatedFields },
            { new: true }
        );

        if (updated) {
            return res.status(200).json({
                msg: "Updated successfully.",
                updated
            });
        } else {
            return res.status(404).json({
                msg: "Contact not found."
            });
        }
    } catch (err) {
        console.error("Error: " + err);
        return res.status(500).json({
            msg: "Internal server error."
        });
    }
};

const DeleteLogoImage = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await StudentProfile.findByIdAndDelete(id);
        const fileName = data.logoImageName;

        // Construct the path to the pdf file
        const imagePath = `../client/src/uploads/studentImage/${fileName}`;

        // Delete the pdf file from the file system
        await unlinkAsync(imagePath);
        if (!data) {
            return res.status(404).json({ message: 'Student profile data not found' });
        }

        res.status(200).json({ message: 'Studet profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting student profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.AddLogoImage = AddLogoImage
exports.GetLogoImage = GetLogoImage
exports.EditLogoImage = EditLogoImage
exports.DeleteLogoImage = DeleteLogoImage



