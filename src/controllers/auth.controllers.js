import User from "../models/users";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/roles";

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const saveUser = await newUser.save();
    const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
      expiresIn: 86400, // 24horas
    });

    res.json({ token });
  } catch (error) {
    console.log(error.message);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email }).populate("roles");

    if (!userFound) return res.status(400).json({ message: "user not found" });
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid Password" });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86401,
    });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
  }
};
