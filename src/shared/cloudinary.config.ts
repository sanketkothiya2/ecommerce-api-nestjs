require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dk3itrbpl' || process.env.CLOUDIANRY_NAME,
    api_key: '671925275789363' || process.env.CLOUDIANRY_API_KEY,
    api_secret:
        'hFq-cRhHLd9Pg-PDKWIgdkxFeDw' || process.env.CLOUDIANRY_API_SECRET,
});

export default cloudinary;
