const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const router = Router()

// /api/auth/register
router.post(

    '/register',
    [
        check('username', 'invalid name').isLength({min:3}),
        check('email','invalid email!').isEmail(),
        check('password', 'Minimal length of password is 6 symbols!')
            .isLength({min:6})
    ],
    async (req,res) =>{
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Incorrect registration data!'
            })
        }

        const {username, email, password,registrationDate}=req.body

        const candidate = await User.findOne({email})
        if (candidate){
          return  res.status(400).json({message:'This user already exist!'})
        }

        const regDate = await  Date.now(registrationDate)
        const hashedPassword =await bcrypt.hash(password,12)
        const user = new User({username, email, password: hashedPassword,registrationDate:regDate})

        await user.save()

        res.status(201).json({message:'User created!'})


    }catch (e) {
        res.status(500).json({message:'Error, try again'})
    }
})

router.post('/login',
    [
        check('username', 'invalid name').isLength({min:3}),
        check('email','Enter correct email').normalizeEmail().isEmail(),
        check('password','Enter password').exists()
    ],
    async (req,res) =>{
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array(),
                    message:'Incorrect enter data!'
                })
            }

        const {username,email, password}=req.body

        const user = await  User.findOne({username})

        if(!user) {
            return res.status(400).json({message:'User not found!'})
        }

        const name = await  User.findOne({email})

            if(!name) {
                return res.status(400).json({message:'User not found!'})
            }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:'Incorrect password, enter again'})
        }


        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn:'1h'}
        )

        res.json({token, userId: user.id})

        }catch (e) {
            res.status(500).json({message:'Error, try again'})
        }

    })


module.exports = router