
const StudentProfile = require("../../02-models/03-student/01-studentProfileSchema");
const dotenv = require("dotenv");
const fs = require("fs");
const {promisify} = require('util')
const unlinkAsync = promisify(fs.unlink)
dotenv.config();


const CreateStudentProfile = async(req, res) => {
    try{

        // console.log(req.body)

        if (!req.file) {
            return res.status(400).json({
                msg: "File not received."
            });
        }

        const reqInclFile = {
            ...req.body,
            profileImageName: req.file.filename,
          };

        const data = await StudentProfile.create(reqInclFile)
        if(data){
            res.status(200).json({
                msg: "Student profile created successfully."
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

const GetStudentProfiles = async (req, res) => {
    try {
        
        const data = await StudentProfile.find();

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


const EditStudentProfile = async (req, res) => {
    try {
        const data = await StudentProfile.findByIdAndUpdate(req.body._id, req.body);
        

        return res.status(200).json({ msg: "Student profile updated successfully." })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const DeleteStudentProfile = async(req, res) => {
    try {
        const id = req.params.id;

        const data = await StudentProfile.findByIdAndDelete(id);
        const fileName = data.profileImageName;
          
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


exports.CreateStudentProfile = CreateStudentProfile
exports.GetStudentProfiles = GetStudentProfiles
exports.EditStudentProfile = EditStudentProfile
exports.DeleteStudentProfile = DeleteStudentProfile
