import { v2 as cloudinary } from 'cloudinary'
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

export default sendImageToCloudinary
