'use server'

export type ActionState = {
  success?: boolean
  error?: string
  message?: string
}

export async function createPostAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const file = formData.get('file') as File

  if (!file) {
    return { success: false, error: 'No file provided' }
  }

  const uploadFormData = new FormData()
  uploadFormData.append('file', file)
  uploadFormData.append('token', formData.get('token') as string)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/upload`, {
      method: 'POST',
      body: uploadFormData
    })

    if (!response.ok) {
      return { success: false, error: `Upload failed: ${response.statusText}` }
    }

    const result = await response.json()
    console.log('Upload successful:', result)

    return { success: true, message: 'Blog uploaded successfully!' }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
