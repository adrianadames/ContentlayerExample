import Head from 'next/head'
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, allArticles } from 'contentlayer/generated'

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  const articles = allArticles.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts, articles } }
}

function PostCard(post) {
  return (
    <div >
      <time dateTime={post.date}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2 >
        <Link legacyBehavior href={post.url}>
          <a>{post.title}</a>
        </Link>
      </h2>
    </div>
  )
}

function ArticleCard(article) {
    return (
      <div >
        <time dateTime={article.date}>
          {format(parseISO(article.date), 'LLLL d, yyyy')}
        </time>
        <h2 >
          <Link legacyBehavior href={article.url}>
            <a>{article.title}</a>
          </Link>
        </h2>
      </div>
    )
}

export default function Home({ posts, articles }) {
  return (
    <div>
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      <h1>Contentlayer Blog Example</h1>

      <h2>Posts</h2>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}

      <h2>Articles</h2>

      {articles.map((article, idx) => (
        <ArticleCard key={idx} {...article} />
      ))}
    </div>
  )
}