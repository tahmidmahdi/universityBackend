import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import config from '../config'

const sendImageToCloudinary = async () => {
  cloudinary.config({
    cloud_name: config.cloudinary_name?.toString(),
    api_key: config.cloudinary_api_key?.toString(),
    api_secret: config.cloudinary_api_secret?.toString(),
  })

  const uploadResult = await cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
      },
    )
    .catch(error => {
      console.log(error)
    })

  return uploadResult?.secure_url
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/uploads`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })

export default sendImageToCloudinary
