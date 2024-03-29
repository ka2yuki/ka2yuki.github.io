import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-7 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      {/* <span>{post.date}</span> */}
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={post.body.code} />
      <div className="pt-5">
        {/* <!-- Lancers Code START --> */}
        <a href="https://www.lancers.jp/affiliate/track?id=2154970&link=%2F" target="_blank" rel="nofollow">
          <img alt="クラウドソーシング「ランサーズ」" src="https://www.lancers.jp/img/affiliate/banner_animate468_60_1.gif" />
        </a>
        <a className="" href="https://www.lancers.jp/affiliate/track?id=2154970&link=%2F" target="_blank" rel="nofollow">
          <img alt="クラウドソーシング「ランサーズ」" src="https://www.lancers.jp/img/affiliate/lancer_2_728x90.gif?v=2.0" />
        </a>
        {/* <!-- Lancers Code END --> */}
      </div>
    </article>
  )
}
