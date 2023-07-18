import { GetStaticProps } from 'next'
import axios from 'axios'
import Link from 'next/link'

//ブログのデータを取得
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.data)

  return {
    props: {
      allPostsData,
    },
  }
}

export type PostProps = {
  userId: string
  id: string
  title: string
  body: string
}

export type Props = PostProps[]

//取得したデータを表示
export default function Home({ allPostsData }: { allPostsData: Props }) {
  return (
    <div>
      <ul>
        {allPostsData.map((post) => {
          return (
            <li key={post.id}>
              {/* リンク先を設定 
              ここで指定したidが[id].tsxのgetStaticPathsで別で設定する
              URLと一致して飛ぶようになる！*/}
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
