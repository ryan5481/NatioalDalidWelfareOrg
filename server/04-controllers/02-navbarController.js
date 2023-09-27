const Navbar = require("../02-models/02-navbarSchema.js");

 const CreateNavbarMenu = async (req, res) => {
  try {
    const data = await Navbar.create(req.body);
    console.log(req.body);
    if (data) {
      res.status(200).json({
        msg: "Data added."
      });
    } else {
        msg: "Failed to add data."
      };
    }catch (e) {
    console.log(e);
  }
};

 const GetNavbarMenu = async (req, res) => {
  try {
    //http://localhost:8000/admin/edit-contact-info/65016d03646e5d503fca284e
    const data = await Navbar.find();
    // console.log(allUsersPosts);
    if (data) {
      res.json({ 
        data
      });
    }else {
      res.status(200).json({
        msg: "Failed fetch data."
      });
    }
  } catch (e) {
    console.log(e);
  }
};

 const UpdateNavbarMenu = async (req, res) => {
  // console.log(req.params);
  try {
    const contactId = req.params.id;
    const updatedFields = req.body; // Fields to be updated

    // Find the contact by ID and update the specified fields
    const updatedContact = await Navbar.findByIdAndUpdate(
      contactId,
      { $set: updatedFields },
      { new: true } // Return the updated contact document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const DeleteNavbarMenu = async (req, res) => {
//   // console.log(req.params);
//   try {
//       const _id = req.params.id;
//       console.log(req)
//       const deletedImage = await Navbar.findByIdAndDelete(_id);

//       if (!deletedImage) {
//           return res.status(404).json({ message: 'Image not found' });
//       }
//     res.status(200).json({ message: 'Image deleted successfully' });
//   } catch (error) {
//       console.error('Error deleting sector:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.CreateNavbarMenu = CreateNavbarMenu
exports.GetNavbarMenu = GetNavbarMenu
exports.UpdateNavbarMenu = UpdateNavbarMenu
// exports.DeleteNavbarMenu = DeleteNavbarMenu