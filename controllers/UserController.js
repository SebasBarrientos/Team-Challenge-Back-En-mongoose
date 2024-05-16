const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env;

const UserController = {
  async register(req, res,next) { 
    try {
      if (!req.body.password) {
        return res.status(400).send("rellena tu contrasena ")
      }
      const password = bcrypt.hashSync(req.body.password, 10)
      const user = await User.create({ ...req.body, password })
      res.status(201).send({ message: "Usuario creado con exito", user })
    } catch (error) {
      next(error)
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      })
      if (!user) {
        return res.status(400).send("correo o contraseña incorrectos")
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password)
      if (!isMatch) {
        return res.status(400).send("correo o contraseña incorrectos")
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET)
      if (user.tokens.length > 4) user.tokens.shift()
      user.tokens.push(token)
      await user.save()
      res.send({ message: `Bienvenid@`, token })
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },
  async logout(req, res) {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { tokens: req.headers.authorization },
        });
        res.send({ message: "Disconected succesfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "There has been a problem during the disconnection, please try again!",
        });
    }
},
}

module.exports = UserController
