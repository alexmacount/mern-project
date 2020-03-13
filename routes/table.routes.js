const auth = require('../middleware/auth.middleware')
// const config = require('config')
const {Router} = require('express')
const router = Router()
const User = require('../models/user')

router.get('/',auth, async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch (e) {
        res.status(500).json({message:'Error, try again'})
    }
})

module.exports = router



