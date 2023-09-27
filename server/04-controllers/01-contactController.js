const Contact = require("../02-models/01-contactSchema.js");

 const AddContactInfo = async (req, res) => {
  try {
    const data = await Contact.create(req.body);
    // console.log(req.body);
    if (data) {
      res.status(200).json({
        msg: "Data added."
      });
    } else {
      res.status(200).json({
        msg: "Failed to add data."
      });
    }
  } catch (e) {
    console.log(e);
  }
};

 const GetContactInfo = async (req, res) => {
  try {
    //http://localhost:8000/admin/edit-contact-info/65016d03646e5d503fca284e
    const data = await Contact.findById("65016d03646e5d503fca284e");
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

 const UpdateContactInfo = async (req, res) => {
  // console.log(req.params);
  try {
    const contactId = req.params.id;
    const updatedFields = req.body; // Fields to be updated

    // Find the contact by ID and update the specified fields
    const updatedContact = await Contact.findByIdAndUpdate(
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

// const DeleteContactInfo = async (req, res) => {
//   // console.log(req.params);
//   try {
//       const _id = req.params.id;
//       console.log(req)
//       const deletedImage = await Carousel.findByIdAndDelete(_id);

//       if (!deletedImage) {
//           return res.status(404).json({ message: 'Image not found' });
//       }
//     res.status(200).json({ message: 'Image deleted successfully' });
//   } catch (error) {
//       console.error('Error deleting sector:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.AddContactInfo = AddContactInfo
exports.GetContactInfo = GetContactInfo
exports.UpdateContactInfo = UpdateContactInfo
// exports.DeleteCarouselImage = DeleteCarouselImage