import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "server/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const filefilter = (req, res, cb) => {
  if (file.mimetype.includes("image") || file.mimetype.includes("video")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filefilter
});

export default upload;
