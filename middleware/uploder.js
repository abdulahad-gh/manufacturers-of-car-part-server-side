const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
  destination:'images/',
  filename:(req,file,cb)=>{
    const suffixName = Date.now() + '-' + Math.round(Math.random()  * 1E7)
    cb(null,suffixName + '-'+ file.originalname) 
  }
})

const uploder = multer({
  storage:storage,
  fileFilter:(req,file,cb)=>{
    const supportRegex = /png|jpg|jpeg/
    const extention = path.extname(file.originalname)
    if(supportRegex.test(extention)){
      cb(null,true)
    }else{
      cb(new Error('must be a png/jpg/jpeg image'))
    }
  }
})

module.exports  = uploder;