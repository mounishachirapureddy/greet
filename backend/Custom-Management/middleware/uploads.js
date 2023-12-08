// upload.js
import multer from 'multer';

const storage = multer.diskStorage({
  // Your storage configuration here
});

const upload = multer({ storage: storage });

export default upload;
