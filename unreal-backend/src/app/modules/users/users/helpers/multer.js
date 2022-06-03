import multer from 'multer'

/**
 * File Path to store the CollectionImage
 */
 const storage = multer.diskStorage({ 
    destination: function(req, file, cb){
        cb(null,'./upload/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const fileFilter =  (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }



export const upload = multer({storage: storage,fileFilter: fileFilter, limits:{fileSize: 1024*1024*5}})
