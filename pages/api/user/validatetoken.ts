import { NextApiRequest, NextApiResponse } from "next";
import { userinfo } from "../../../utils/types";
import jwt, { VerifyErrors } from "jsonwebtoken"

interface Data {
    user?: any
    error?: string | VerifyErrors
}
export default async function validatetoken(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") return;
    const token = req.headers.authorization as string
    const secret = process.env.SECRET_TOKEN as string
    await jwt.verify(token, secret, (err, decode) => {
        if (err) return res.status(201).json({ error: err });
        res.status(200).json({ user: decode })
    })
}
