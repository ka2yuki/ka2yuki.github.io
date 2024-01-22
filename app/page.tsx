import { Post, allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  allPosts.sort(function(a:Post, b:Post) {
    return (a.date > b.date ? -1:1);
  });
  return (
    <div className="prose dark:prose-invert">
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
