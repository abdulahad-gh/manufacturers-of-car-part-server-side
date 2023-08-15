const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination:'okk/bro/kikbr/',
  filename:(req,file,cb)=>{
    const prefixName = Date.now()
    cb(null,prefixName+'---'+file.originalname)
  }
})

const uploder = multer({
  storage:storage,
  fileFilter:(req,file,cb)=>{
    const regEx = /png|jpg|jpeg|pdf/
    const extentionName = path.extname(file.originalname)
    if(regEx.test(extentionName)){
      cb(null,true)
    }
  }
})


module.exports = uploder;