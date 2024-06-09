import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: "public/assets", // Directory to save uploaded files
  filename: (_req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Check file type for single file upload (images only)
function checkImageFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Check file type for multiple file upload (images and videos)
function checkImageVideoFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images and Videos Only!");
  }
}

// Initialize upload for single image upload
const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: (_req, file, cb) => {
    checkImageFileType(file, cb);
  },
}).single("picture");

// Middleware function for single image upload
const uploadSinglePicture = (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }
    next();
  });
};

// Initialize upload for multiple image and video upload
const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: (_req, file, cb) => {
    checkImageVideoFileType(file, cb);
  },
}).array("medias", 10);

// Middleware function for multiple image and video upload
const uploadMultipleImageVideo = (req, res, next) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }
    next();
  });
};

export { uploadSinglePicture, uploadMultipleImageVideo };
