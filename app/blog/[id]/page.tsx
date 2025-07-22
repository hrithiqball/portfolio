export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/post/${encodeURIComponent(id)}`, {
    method: 'GET'
  })
  const data = await res.json()
  const post: Blog = data?.post

  return (
    <div>
      {post.title}
      {post.markdown}
    </div>
  )
}
