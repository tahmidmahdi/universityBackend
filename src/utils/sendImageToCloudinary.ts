import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import multer from 'multer'
import config from '../config'

cloudinary.config({
  cloud_name: config.cloudinary_name?.toString(),
  api_key: config.cloudinary_api_key?.toString(),
  api_secret: config.cloudinary_api_secret?.toString(),
})

const sendImageToCloudinary = async (imageName: string, path: string) => {
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch(error => {
      console.log(error)
    })
  fs.unlink(path, err => {
    if (err) {
      console.error(err)
    } else {
      console.log('file has been deleted')
    }
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
