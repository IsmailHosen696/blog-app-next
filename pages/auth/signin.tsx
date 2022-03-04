import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import classes from '../../styles/Home.module.css';
import { userinfo } from '../../utils/types';

export default function Signin() {
    const [userInfo, setUserInfo] = useState<userinfo>({ email: "", password: "" });
    const [error, setError] = useState<{ iserror: boolean, msg: string | null }>({ iserror: false, msg: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSignin = async (e: FormEvent) => {
        e.preventDefault();
        setError({ ...error, iserror: false })
        if (!userInfo.email || !userInfo.password || userInfo.password.length < 5) return setError({ iserror: true, msg: "please fill all the fields carefully ." })
        await axios.post("/api/user/login", { ...userInfo }).then(({ data }) => {
            if (data.error) return setError({ iserror: true, msg: data.error })
            setCookie("user", data.token)
            router.push('/')
        }).catch(err => {
            console.log(err);
        })
    }
    function setCookie(name: string, value: string) {
        var expires = '';
        var date = 60 * 60 * 24 * 3;
        expires = "; expires=" + date;
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    return (
        <div className={classes.signindiv}>
            <div className={classes.signinContainer}>
                <h1>Signin to continue</h1>
                {error.iserror && <p className={classes.errormsg}>{error.msg} <XIcon onClick={() => setError({ ...error, iserror: false })} className={classes.closeerror} /></p>}
                <form onSubmit={handleSignin} className={classes.signinForm}>
                    <div className={classes.signininput}>
                        <label htmlFor="email">emaIl</label>
                        <input value={userInfo.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInfo({ ...userInfo, email: e.target.value })}
                            autoComplete='off' type="email" id="email" />
                    </div>
                    <div className={classes.signininput}>
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" value={userInfo.password} onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInfo({ ...userInfo, password: e.target.value })} />
                    </div>
                    <button className={classes.signinbtn}>signin</button>
                </form>
                <div className={classes.authlinks}>
                    <p>
                        {`Don't`} have an account?
                        <Link href={'/auth/signup'}>
                            <a> Create new</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
