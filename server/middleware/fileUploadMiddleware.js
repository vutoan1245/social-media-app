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

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("picture");

// Check file type
function checkFileType(file, cb) {
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

// Middleware function
const uploadSingle = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }
    next();
  });
};

export { uploadSingle };
