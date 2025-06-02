import { supabase } from './supabase'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
  path?: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

/**
 * Upload a file to Supabase storage
 * @param file - The file to upload
 * @param userId - The user ID (for folder organization)
 * @param category - File category (credit-reports, documents, etc.)
 * @param onProgress - Optional progress callback
 * @returns Upload result with URL or error
 */
export async function uploadFile(
  file: File,
  userId: string,
  category: 'credit-reports' | 'documents' | 'id-verification' = 'documents',
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  try {
    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'File type not allowed. Please upload PDF, Word documents, or images only.'
      }
    }
    
    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size too large. Maximum size is 50MB.'
      }
    }
    
    // Generate unique filename
    const timestamp = Date.now()
    const fileExt = file.name.split('.').pop()
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filePath = `${userId}/${category}/${fileName}`
    
    // Upload file
    const { data, error } = await supabase.storage
      .from('client_uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      return {
        success: false,
        error: error.message
      }
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('client_uploads')
      .getPublicUrl(filePath)
    
    return {
      success: true,
      url: urlData.publicUrl,
      path: filePath
    }
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    }
  }
}

/**
 * Delete a file from Supabase storage
 * @param filePath - The path of the file to delete
 * @returns Success status
 */
export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('client_uploads')
      .remove([filePath])
    
    return !error
  } catch (error) {
    console.error('Delete file error:', error)
    return false
  }
}

/**
 * Get a signed URL for a private file
 * @param filePath - The path of the file
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 * @returns Signed URL or null if error
 */
export async function getSignedUrl(filePath: string, expiresIn: number = 3600): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from('client_uploads')
      .createSignedUrl(filePath, expiresIn)
    
    if (error) {
      console.error('Signed URL error:', error)
      return null
    }
    
    return data.signedUrl
  } catch (error) {
    console.error('Signed URL error:', error)
    return null
  }
}

/**
 * List files for a user
 * @param userId - The user ID
 * @param category - Optional category filter
 * @returns Array of file objects
 */
export async function listUserFiles(userId: string, category?: string) {
  try {
    const path = category ? `${userId}/${category}` : userId
    
    const { data, error } = await supabase.storage
      .from('client_uploads')
      .list(path, {
        limit: 100,
        offset: 0
      })
    
    if (error) {
      console.error('List files error:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('List files error:', error)
    return []
  }
}

