import axios from 'axios'
import { PostProps } from '..'

//各ブログ記事のURLリスト(urlの最後の部分)を設定
export async function getStaticPaths() {
  const blogData = await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.data)

  const paths = blogData.map((blog: PostProps) => {
    return { params: { id: `${blog.id}` } }
  })

  return {
    paths,
    fallback: false,
  }
}

//さっきのidをparamsとして受け取って、それを使ってデータを取得
export async function getStaticProps({ params }: { params: PostProps }) {
  const postData = await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    .then((res) => res.data)

  return {
    props: {
      postData,
    },
  }
}

//取得したデータを表示
export default function Post({ postData }: { postData: PostProps }) {
  return (
    <div>
      <h2>{postData.title}</h2>
      <h3>{postData.body}</h3>
    </div>
  )
}
