import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '../../../server/db/connection'
import User from '../../../server/model/UserModel';
import { userinfo } from '../../../utils/types'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type Data = {
    error?: string | Error,
    token?: string,
    user?: any
}
connectToDB();

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { email, password } = req.body as userinfo
    if (req.method === 'GET') return
    await User.findOne({ email: email }).then(async (user) => {
        if (!user) return res.status(201).json({ error: "no user found with that email !" })
        await bcrypt.compare(password as string, user.password).then(async result => {
            if (!result) return res.status(201).json({ error: "provided email and password doesn't match ." })
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