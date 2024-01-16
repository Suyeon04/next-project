import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/post';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react'

const Post = ({ postData }: {
    postData: {
        date: string
        title: string
        contentHtml: string
    }
}) => {
    return (
        <div>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 >{postData.title}</h1>
                <div>
                    {postData.date}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
            </article >
        </div >
    )
}

export default Post;


export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();

    //[{params: {id:'pre-rendering'}}]
    return {
        paths,
        fallback: false,
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id as string);
    return {
        props: {
            postData
        }
    }

}