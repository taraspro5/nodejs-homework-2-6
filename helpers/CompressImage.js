import Jimp from "jimp";

const CompressImage = async (path) => {
  const img = await Jimp.read(path);
  const resizeImg = img.resize(250, 250);
  const newImg = resizeImg.writeAsync(path);
  return newImg;
};

export default CompressImage;
