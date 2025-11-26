import multer from 'multer';

const MAX_SIZE = 1 * 1024 * 1024; // 1 MB

// Allowed image mime types
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

export const upload = multer({
  limits: { fileSize: MAX_SIZE },

  fileFilter(req, file, cb) {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPG, PNG, WEBP files are allowed'));
    }
    cb(null, true);
  },

  storage: multer.memoryStorage(), // store in memory for direct S3 upload
});
