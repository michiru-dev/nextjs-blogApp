import React from 'react'

function SubmitButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
  return <button onClick={onClick}>投稿</button>
}

export default SubmitButton
