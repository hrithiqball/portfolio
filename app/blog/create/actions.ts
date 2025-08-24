'use server'

export type ActionState = {
  success?: boolean
  error?: string
  message?: string
}

export type ImageUploadResult = {
  success: boolean
  key?: string
  error?: string
}

export async function uploadImageAction(formData: FormData): Promise<ImageUploadResult> {
  const file = formData.get('file') as File

  if (!file) {
    return { success: false, error: 'No file provided' }
  }

  // Use environment variable for the token - this stays on the server
  const token = process.env.UPLOAD_TOKEN

  if (!token) {
    console.error('UPLOAD_TOKEN environment variable is not set')
    return { success: false, error: 'Server configuration error' }
  }

  const uploadFormData = new FormData()
  uploadFormData.append('file', file)
  uploadFormData.append('token', token)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/upload-img`, {
      method: 'POST',
      body: uploadFormData
    })

    if (!response.ok) {
      return { success: false, error: `Upload failed: ${response.statusText}` }
    }

    const result = await response.json()
    return { success: true, key: result.key }
  } catch (error) {
    console.error('Image upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export async function createPostAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const markdown = formData.get('markdown') as string
  const header = formData.get('header') as File
  const token = formData.get('token') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const tags = formData.get('tags') as string

  // Validate required fields
  if (!markdown) {
    return { success: false, error: 'No markdown content provided' }
  }

  if (!header) {
    return { success: false, error: 'No header image provided' }
  }

  if (!token || !title || !description || !category || !tags) {
    return { success: false, error: 'All fields are required' }
  }

  const uploadFormData = new FormData()
  uploadFormData.append('markdown', markdown)
  uploadFormData.append('header', header)
  uploadFormData.append('token', token)
  uploadFormData.append('title', title)
  uploadFormData.append('description', description)
  uploadFormData.append('category', category)
  uploadFormData.append('tags', tags)

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

    return { success: true, message: 'Blog created successfully!' }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
