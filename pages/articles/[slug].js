import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allArticles } from 'contentlayer/generated'

export async function getStaticPaths() {
  const paths = allArticles.map((article) => article.url)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const article = allArticles.find((article) => article._raw.flattenedPath === `articles/`+params.slug)
  return {
    props: {
      article,
    },
  }
}

const ArticleLayout = ({ article }) => {
  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <article>
        <div>
          <Link legacyBehavior href="/">
            <a>Home</a>
          </Link>
        </div>
        <div>
          <h1 >{article.title}</h1>
          <time dateTime={article.date}>
            {format(parseISO(article.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.body.html }} />
      </article>
    </>
  )
}

export default ArticleLayout