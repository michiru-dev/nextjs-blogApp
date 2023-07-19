import SubmitButton from '@/components/SubmitButton'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { PostProps } from '@/pages'

type CreatePostProps = { updatePosts: (post: PostProps) => void }

function CreatePost({ updatePosts }: CreatePostProps) {
  const [blogPost, setBlogPost] = useState({
    userId: 11,
    title: '',
    body: '',
  })

  const handleTitleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    //展開してtitleだけ更新
    setBlogPost((prev) => ({ ...prev, title: e.target.value }))
  }

  const handleBodyOnchange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBlogPost((prev) => ({ ...prev, body: e.target.value }))
  }

  const handleOnClick = async () => {
    const post = await axios.post<PostProps>(
      'https://jsonplaceholder.typicode.com/posts',
      blogPost
    )
    const existingPosts = JSON.parse(localStorage.getItem('blogPost') ?? '[]')
    existingPosts.push(post.data)
    localStorage.setItem('blogPost', JSON.stringify(existingPosts))
    updatePosts(post.data)
  }

  return (
    <>
      <input onChange={(e) => handleTitleOnchange(e)}></input>
      <textarea onChange={(e) => handleBodyOnchange(e)}></textarea>
      <SubmitButton onClick={handleOnClick} />
    </>
  )
}

export default CreatePost
