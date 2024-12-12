import { Post, allPosts } from "@/.contentlayer/generated"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
        <li className="leading-normal m-0">🎉<a href="https://react.dev/blog/2024/12/05/react-19">React 19 is now stable! | Dec 05, 2024</a></li>
        <li className="leading-normal m-0"><a href="https://coliss.com/articles/build-websites/operation/css/css-framework-for-radial-circular-ui.html">UI要素をグリッドではなく、サークル・放射状、曲線状にレイアウトできるCSSのフレームワーク -Orbit | coliss.com</a></li>
      </ul>
      <h2 className="text-sm">ReadingList <FontAwesomeIcon icon={faFile} />：</h2>
      <ul className="text-sm">
        <li className="m-0 leading-normal"><FontAwesomeIcon icon={faFile} /> <a href="https://github.com/integrations/slack#readme">Slack: with Github</a></li>
        <li className="m-0 leading-normal"><FontAwesomeIcon icon={faGithub} className="m-0" /> <a href="https://github.com/vercel/styled-jsx?tab=readme-ov-file#styled-jsx">styled-jsx</a></li>
      </ul>

      <h2 className="text-sm">DevInfo：</h2>
      <ul>
        <li>Can I use: up-to-date browser support tables: </li>
        <ul>
          <li className="m-0 leading-normal"><a href="https://caniuse.com/ciu/news">https://caniuse.com/ciu/news</a></li>
          <li className="m-0 leading-normal"><a href="https://caniuse.com">https://caniuse.com</a></li>
        </ul>
        <li>memo:</li>
        <ul>
          <li>Browserslist: caniuse-lite is outdated. Please run:
            <ul>
              <li>npx update-browserslist-db@latest</li>
              <li>Why you should do it regularly: <a href=" https://github.com/browserslist/update-db#readme"> https://github.com/browserslist/update-db#readme</a></li>
            </ul>
          </li>
        </ul>
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
