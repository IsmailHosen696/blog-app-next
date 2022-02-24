import Link from 'next/link';
import classes from '../styles/Home.module.css';

export default function Navbar() {
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
                            <Link href='/auth/signin'>
                                <a>Signin</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
