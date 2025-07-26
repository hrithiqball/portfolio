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
  const activeTab = formData.get('activeTab') as string
  const file = formData.get('file') as File
  const header = formData.get('header') as File

  if (activeTab === 'upload' && !file) {
    return { success: false, error: 'No file provided for upload' }
  }

  if (activeTab === 'create') {
    const markdown = formData.get('markdown') as string
    if (!markdown) {
      return { success: false, error: 'No markdown content provided' }
    }
  }

  const uploadFormData = new FormData()

  if (file) {
    uploadFormData.append('file', file)
  }

  const markdown = formData.get('markdown') as string
  if (markdown) {
    uploadFormData.append('markdown', markdown)
  }

  uploadFormData.append('token', formData.get('token') as string)
  uploadFormData.append('title', formData.get('title') as string)
  uploadFormData.append('description', formData.get('description') as string)
  uploadFormData.append('category', formData.get('category') as string)
  uploadFormData.append('tags', formData.get('tags') as string)
  uploadFormData.append('header', header)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/create-blog`, {
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
