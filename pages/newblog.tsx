import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import XIcno from '../icons/XIcno';
import classes from '../styles/Home.module.css';
export interface blogdetail {
    blogHeader: string,
    blogDescription: string,
    blogImageUrl: string
}
export default function NewBlog() {
    const [blogDetail, setBlogDetail] = useState<blogdetail>({ blogHeader: "", blogDescription: "", blogImageUrl: "" })
    const [file, setFile] = useState<FileList | null>(null);
    const [tempUrl, setTempUrl] = useState<string>("")

    useEffect(() => {
        if (file) {
            const obj = URL.createObjectURL(file[0])
            setTempUrl(obj);
            return () => URL.revokeObjectURL(obj)
        }
        return
    }, [file])

    const handleBlogSubmit = (e: FormEvent) => {
        e.preventDefault();
    }
    return (
        <Fragment>
            <Head>
                <title>Create New Blog</title>
            </Head>
            <div className={classes.newBlog}>
                <div className={classes.blogContainer}>
                    <div className={classes.newBlogHeader}>
                        <h1>Create New Blog</h1>
                    </div>
                    <form onSubmit={handleBlogSubmit} className={classes.newBlogFromContainer}>
                        <div className={classes.inputdiv}>
                            <label htmlFor="blogheading">Blog Header</label>
                            <input value={blogDetail.blogHeader}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setBlogDetail({ ...blogDetail, blogHeader: e.target.value })}
                                type="text" id='blogheading' />
                        </div>
                        <div className={classes.inputdiv}>
                            <label htmlFor="blogdesc">Blog Description</label>
                            <textarea value={blogDetail.blogDescription}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBlogDetail({ ...blogDetail, blogDescription: e.target.value })}
                                id="blogdesc"></textarea>
                        </div>
                        <div className={classes.inputdiv}>
                            <label htmlFor="blogimg">
                                <span>
                                    Blog Image
                                </span>
                                <span className={classes.chooseImg}>choose</span>
                                <input onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files)} type="file" accept="image/*" className={classes.blogimg} id='blogimg' />
                            </label>
                        </div>
                        <button className={classes.createBlgBtn}>Create Blog</button>
                    </form>
                    <div className={classes.tempurldiv}>
                        {
                            tempUrl &&
                            <div className={classes.imgt}>
                                <button onClick={() => { setFile(null); setTempUrl("") }} className={classes.xIcon}><XIcno /></button>
                                <Image src={tempUrl} width={700} height={600} alt='tempimageurl' objectFit='cover' className={classes.tempblog} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
