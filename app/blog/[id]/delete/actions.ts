'use server'

export type DeleteActionState = {
  success?: boolean
  error?: string
  message?: string
}

export async function deletePostAction(
  id: string,
  _prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> {
  const token = formData.get('token') as string

  if (!token) {
    return { success: false, error: 'No token provided' }
  }

  const deleteFormData = new FormData()
  deleteFormData.append('token', token)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/post/${id}`, {
      method: 'DELETE',
      body: deleteFormData
    })

    if (!response.ok) {
      return { success: false, error: `Delete failed: ${response.statusText}` }
    }

    const result = await response.json()
    console.log('Delete successful:', result)

    return { success: true, message: 'Blog post deleted successfully!' }
  } catch (error) {
    console.error('Delete error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
