import { v2 as cloudinary } from 'cloudinary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image_url } = req.body;
  if (!image_url) {
    return res.status(400).json({ error: 'Missing image_url' });
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    const result = await cloudinary.uploader.upload(image_url, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
    });
    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}