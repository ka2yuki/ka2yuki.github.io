import { Post, allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  allPosts.sort(function (a: Post, b: Post) {
    return (a.date > b.date ? -1 : 1);
  });
  return (
    <div className="pt-0 prose dark:prose-invert">
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug} className="no-underline">
            <h2 className="mt-5 mb-0">{post.title}</h2>
          </Link>
          {post.description && <p className="mt-0">{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
