import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import classes from '../../styles/Home.module.css';
import { userinfo } from '../../utils/types';
import { XIcon } from '@heroicons/react/solid'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<{ iserror: boolean, msg: string | null }>({ iserror: false, msg: '' });
    const router = useRouter();
    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        setError({ ...error, iserror: false })
        if (!username || !email || !password || password.length < 5) return setError({ iserror: true, msg: "please fill all the fields carefully ." })
        if (password !== confirmPassword) return setError({ iserror: true, msg: "password and confirm password must be same" })
        var payload: userinfo = {
            username,
            password,
            email,
        }
        await axios.post(`/api/user`, { ...payload })
            .then(res => {
                if (res.data.error) return setError({ iserror: true, msg: res.data.error })
                setCookie("user", res.data.token)
                router.push('/')
            })
            .catch((err) => console.log(err))
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
                <h1>Create new account</h1>
                {error.iserror && <p className={classes.errormsg}>{error.msg} <XIcon onClick={() => setError({ ...error, iserror: false })} className={classes.closeerror} /></p>}
                <form onSubmit={handleSignup} className={classes.signinForm}>
                    <div className={classes.signininput}>
                        <label htmlFor="username">username</label>
                        <input value={username}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            autoComplete='off' type="text" id="username" />
                    </div>
                    <div className={classes.signininput}>
                        <label htmlFor="email">emaIl</label>
                        <input autoComplete='off' value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" id="email" />
                    </div>
                    <div className={classes.signininput}>
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" value={password}
                            autoComplete='true'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    </div>
                    <div className={classes.signininput}>
                        <label htmlFor="cpassword">confirm password</label>
                        <input type="password" id="cpassword"
                            autoComplete='true'
                            value={confirmPassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button className={classes.signinbtn}>Create</button>
                </form>
                <div className={classes.authlinks}>
                    <p>
                        Already have an account?
                        <Link href={'/auth/signin'}>
                            <a> signin</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
