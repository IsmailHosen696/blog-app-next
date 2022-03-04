import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import classes from '../styles/Home.module.css';
import { userinfo } from '../utils/types';

export default function Navbar() {
    const [user, setUser] = useState<userinfo | null>(null)
    async function getCookie(name: string) {
        const value = document.cookie
        const part = value.split("; ")
        return await part.filter((cpart) => cpart.split("=")[0] === name)[0]?.split("user=")[1].split("Bearer ")[1]
    }
    useEffect(() => {
        getCookie("user").then(cookie => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': cookie
            }
            axios.post("/api/user/validatetoken", null, { headers }).then(({ data: { user } }) => {
                setUser({ email: user.emaIl, username: user.username });
            })
        })
    }, [])
    return (
        <div className={classes.navbarContainer}>
            <div className={classes.nav}>
                <div className={classes.navLogo}>
                    <Link href='/'>
                        <a>blogger</a>
                    </Link>
                </div>
                <div className={classes.navlinks}>
                    <ul>
                        <li>
                            <Link href='/newblog'>
                                <a>NewBlog</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/profile'>
                                <a>Profile</a>
                            </Link>
                        </li>
                        <li>
                            {user ?
                                <p>
                                    {user.username}
                                </p>
                                :
                                <Link href='/auth/signin'>
                                    <a>Signin</a>
                                </Link>}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
