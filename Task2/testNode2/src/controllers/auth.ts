import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req:any, res:any) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
     
      } = req.body;
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password:passwordHash,
       
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser)
  } catch (err:any) {
      res.status(500).json({error:err.message})
  }
};





export const login = async (req:any, res: any): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user:any = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({ msg: 'User Does not exist' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
        delete user.password;
        
        res.status(200).json({ token, user });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
};