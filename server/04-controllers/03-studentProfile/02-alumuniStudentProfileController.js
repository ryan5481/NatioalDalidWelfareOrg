
const AlumuniStudent = require("../../02-models/03-student/02-alumuniStudentSchema.js");
const dotenv = require("dotenv");
const fs = require("fs");
const {promisify} = require('util')
const unlinkAsync = promisify(fs.unlink)
dotenv.config();


const CreateAlumuniStudentProfile = async(req, res) => {
    try{
        // const reqInclFile = {
        //     ...req.body,
        //     profileImageName: req.file.filename,
        //   };

        const data = await AlumuniStudent.create(req.body)
        if(data){
            res.status(200).json({
                msg: "Alumuni student profile created successfully."
            })
        }else{
            res.status(403).json({
                msg: "Student profile registration failed."
            })
        }
    }catch(error){
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const GetAlumuniStudentProfiles = async (req, res) => {
    try {
        // Filter
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "skip", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        const data = await AlumuniStudent.find(queryObj);

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


const EditAlumuniStudentProfile = async (req, res) => {
    try {
        console.log(req.params, req.body);

        const studentId = req.params.id;
        const updatedFields = req.body

        if (!updatedFields || Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ msg: "No valid update data provided." });
        }

        const updated = await AlumuniStudent.findByIdAndUpdate(
            studentId,
            { $set: updatedFields },
            { new: true } // Return the updated contact document
        );

        if (updated) {
            return res.status(200).json({
                msg: "Updated successfully.",
                updated // Optionally, you can include the updated contact in the response
            });
        } else {
            return res.status(404).json({
                msg: "Student profile not found." // Adjust this message according to your use case
            });
        }
    } catch (err) {
        console.error("Error: " + err);
        return res.status(500).json({
            msg: "Internal server error." // Adjust this message according to your use case
        });
    }
};

const DeleteAlumuniStudentProfile = async(req, res) => {
    try {
        const id = req.params.id;

        const data = await AlumuniStudent.findByIdAndDelete(id);
        // const fileName = data.profileImageName;
          
        // Construct the path to the pdf file
        // const imagePath = `../client/src/uploads/studentImage/${fileName}`;
    
        // Delete the pdf file from the file system
        // await unlinkAsync(imagePath);
        if (!data) {
            return res.status(404).json({ message: 'Student profile data not found' });
        }

        res.status(200).json({ message: 'Studet profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting student profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.CreateAlumuniStudentProfile = CreateAlumuniStudentProfile
exports.GetAlumuniStudentProfiles = GetAlumuniStudentProfiles
exports.EditAlumuniStudentProfile = EditAlumuniStudentProfile
exports.DeleteAlumuniStudentProfile = DeleteAlumuniStudentProfile
