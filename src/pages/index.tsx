import { GetStaticProps } from 'next'
import axios from 'axios'
import Link from 'next/link'
import CreatePost from '../components/CreatePost'
import { useEffect, useState } from 'react'

//getStaticPropsを定義すればそのページは
//ビルド時に出来上がるけど、そのコンポーネントの中のロジックとかは
//レンダリング時にもちゃんと動く。（普通のコンポーネントと一緒の動き）

//ブログのデータを取得
//今回は投稿が擬似的だからこれでいいけど、
//本当に投稿機能がある場合はgetServerSidePropsでやらないと
//投稿を追加してもビルド時にfetchされた情報がページに固定されているため
//リフレッシュすると新しい投稿が消えてしまう
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
  const [posts, setPosts] = useState<Props>(allPostsData)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const item = localStorage.getItem('blogPost')
    console.log(isInitialized)
    if (item && !isInitialized) {
      const parsedItem = JSON.parse(item)
      //parsedItemも配列なので展開

      setPosts((prev) => [...parsedItem, ...prev])
      setIsInitialized(true)
    }
  }, [isInitialized])

  const updatePosts = (post: PostProps) => {
    setPosts((prev) => [post, ...prev])
  }

  return (
    <div>
      <CreatePost updatePosts={updatePosts} />
      <ul>
        {posts.map((post) => {
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
