import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '../../../server/db/connection'
import User from '../../../server/model/UserModel';
import { userinfo } from '../../../utils/types'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type Data = {
    error?: string | Error,
    token?: string
}
connectToDB();

export default async function register(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { username, password, email, } = req.body as userinfo
    if (req.method === 'GET') return
    const findmail = await User.findOne({ email: email })
    if (findmail) return res.status(201).json({ error: "there is already a user with that email . use another one to join ." })
    return await bcrypt.genSalt(10, async (err, salt) => {
        if (err) return res.status(400).json({ error: err });
        return await bcrypt.hash(password as string, salt, async (error, hash) => {
            if (error) return res.status(400).json({ error });
            const user = await new User({
                username,
                email,
                password: hash
            });
            await user.save();
            const token = await createToken(user)
            res.status(200).json({ token: `Bearer ${token}` })
        })
    })
}
const createToken = async (user: userinfo) => {
    const maxage = 60 * 60 * 24 * 3;
    const secret = await process.env.SECRET_TOKEN as string
    return await jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: maxage })
}