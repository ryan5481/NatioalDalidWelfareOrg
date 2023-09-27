const Carousel = require("../02-models/03-carouselSchema.js");

 const AddCarouselImage = async (req, res) => {
  try {
    const reqInclImg = {
      ...req.body,
      carouselImage: req.file.filename,
    };
    const data = await Carousel.create(reqInclImg);
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

 const GetCarousleImages = async (req, res) => {
  try {
    const data = await Carousel.find();
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

 const UpdateCarouselImage = async (req, res) => {
  // console.log(req.params);
  try {
    const reqInclImg = {
      ...req.body,
      carouselImage: req.file.filename,
    };
    const data = await Carousel.findByIdAndUpdate(req.body._id, reqInclImg);
    // console.log(userIdsPosts);
    if (data) {
      res.json({
        msg: "Data updated."
      });
    } else {
      res.json({
        msg: "Error updating data",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const DeleteCarouselImage = async (req, res) => {
  // console.log(req.params);
  try {
      const _id = req.params.id;
      console.log(req)
      const deletedImage = await Carousel.findByIdAndDelete(_id);

      if (!deletedImage) {
          return res.status(404).json({ message: 'Image not found' });
      }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
      console.error('Error deleting sector:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

exports.AddCarouselImage = AddCarouselImage
exports.GetCarousleImages = GetCarousleImages
exports.UpdateCarouselImage = UpdateCarouselImage
exports.DeleteCarouselImage = DeleteCarouselImage