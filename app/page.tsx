import { Post, allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  /**
   * Post: .sort() の引数
   * allPosts: map & posts rendering..
   */
  allPosts.sort(function (a: Post, b: Post) {
    return (a.date > b.date ? -1 : 1);
  });

  return (
    <div className="pt-0 prose dark:prose-invert">
      <h2 className="text-sm">気になる記事一覧：</h2>
      <ul className="text-sm">
        <li><a href="https://coliss.com/articles/build-websites/operation/css/css-framework-for-radial-circular-ui.html">UI要素をグリッドではなく、サークル・放射状、曲線状にレイアウトできるCSSのフレームワーク -Orbit | coliss.com</a></li>
      </ul>
      <hr className="p-0 m-0" />
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
