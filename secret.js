require('dotenv').config()

const port = process.env.PORT || 8080
const mongooseUrl = process.env.DATABASE_LIVE || process.env.DATABASE_LOCAL


module.exports={
    port,
    mongooseUrl
}