const Logo = require("../02-models/01.5-logoSchema.js");

 const AddLogoImage = async (req, res) => {
  try {
    const reqInclImg = {
      ...req.body,
      logoImage: req.file.filename,
    };
    const data = await Logo.create(reqInclImg);
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

 const GetLogoImage = async (req, res) => {
  try {
    const data = await Logo.findById("6502a4f802b9bbf5f6b2da2c");
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

 const UpdateLogoImage = async (req, res) => {
  // console.log(req.params);
  try {
    const reqInclImg = {
      ...req.body,
      logoImage: req.file.filename,
    };
    const data = await Logo.findByIdAndUpdate(req.body._id, reqInclImg);
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

const DeleteLogoImage = async (req, res) => {
  // console.log(req.params);
  try {
      const _id = req.params.id;
      console.log(req)
      const deletedImage = await Logo.findByIdAndDelete(_id);

      if (!deletedImage) {
          return res.status(404).json({ message: 'Image not found' });
      }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
      console.error('Error deleting sector:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

exports.AddLogoImage = AddLogoImage
exports.GetLogoImage = GetLogoImage
exports.UpdateLogoImage = UpdateLogoImage
exports.DeleteLogoImage = DeleteLogoImage


{/* <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
<Image
  src={`data:image/jpeg;base64,${logoImageData.logoImage}`}
  alt="Logo"
  h={20}
  p={2}
  _hover={{
    textDecoration: 'none',
    cursor: "pointer"
  }}
  textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
  fontFamily={'heading'}
  color={useColorModeValue('gray.800', 'white')}
  onClick={() => navigate("/")}
/>
<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
  <Center>
    <DesktopNav menuItems={menuItems} />
  </Center>
</Flex>
</Flex> */}