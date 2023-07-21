const User = require('./User')
const jwt = require('jsonwebtoken')


const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYsImlhdCI6MTY4OTk2MDMyM30.zH0B7epk1-qy4jJy7HxOUF82zfOW5TJulO_ljcEzlcw`

const getUserByToken = async () => {
    const {id} = await jwt.verify(token, "secret")
    console.log(id)
    const user = await User.findByPk(id)
    console.log(user.username)
}


// console.log(User.findByToken(token))

getUserByToken()