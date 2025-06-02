'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { fileUpload } from '@/lib/storage'
import { useCreditReports } from '@/hooks/useCreditReports'

interface FileUploadProps {
  type: 'credit_report' | 'supporting_doc'
  onUploadComplete?: (result: any) => void
}

export function FileUpload({ type, onUploadComplete }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { uploadReport } = useCreditReports()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)
    setSuccess(false)

    // Validate file
    const validation = fileUpload.validateFile(file, type)
    if (!validation.isValid) {
      setError(validation.errors.join(', '))
      return
    }

    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      setUploading(true)
      setUploadProgress(0)
      setError(null)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      let result
      if (type === 'credit_report') {
        result = await uploadReport(selectedFile, 'manual_upload')
      } else {
        // Handle supporting document upload
        // This would use a different function for supporting docs
        throw new Error('Supporting document upload not implemented yet')
      }

      clearInterval(progressInterval)
      setUploadProgress(100)
      setSuccess(true)
      setSelectedFile(null)
      
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      onUploadComplete?.(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as React.ChangeEvent<HTMLInputElement>
      handleFileSelect(fakeEvent)
    }
  }

  const getTitle = () => {
    return type === 'credit_report' ? 'Upload Credit Report' : 'Upload Supporting Document'
  }

  const getDescription = () => {
    return type === 'credit_report' 
      ? 'Upload your credit report PDF (max 10MB)'
      : 'Upload supporting documents - PDF, JPG, or PNG (max 5MB)'
  }

  const getAcceptedTypes = () => {
    return type === 'credit_report' ? '.pdf' : '.pdf,.jpg,.jpeg,.png'
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {getTitle()}
        </CardTitle>
        <CardDescription>
          {getDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Drop Zone */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop your file here, or click to browse
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptedTypes()}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            Choose File
          </Button>
        </div>

        {/* Selected File Info */}
        {selectedFile && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {fileUpload.formatFileSize(selectedFile.size)}
                </p>
              </div>
              <span className="text-lg">
                {fileUpload.getFileIcon(selectedFile.type)}
              </span>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-center text-gray-600">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              File uploaded successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </Button>
      </CardContent>
    </Card>
  )
}

