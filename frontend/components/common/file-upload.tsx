'use client'

import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, File, Image, FileText, FileArchive, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface FileWithPreview extends File {
    preview?: string
}

interface FileUploadProps {
    onFilesChange?: (files: FileWithPreview[]) => void
    onUpload?: (files: FileWithPreview[]) => Promise<void>
    accept?: Record<string, string[]>
    maxFiles?: number
    maxSize?: number // in bytes
    multiple?: boolean
    disabled?: boolean
    showPreview?: boolean
    className?: string
}

function FileUpload({
    onFilesChange,
    onUpload,
    accept,
    maxFiles = 5,
    maxSize = 10 * 1024 * 1024, // 10MB
    multiple = true,
    disabled = false,
    showPreview = true,
    className,
}: FileUploadProps) {
    const [files, setFiles] = React.useState<FileWithPreview[]>([])
    const [uploading, setUploading] = React.useState(false)
    const [uploadProgress, setUploadProgress] = React.useState(0)

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
                })
            )
            const updatedFiles = multiple ? [...files, ...newFiles].slice(0, maxFiles) : newFiles.slice(0, 1)
            setFiles(updatedFiles)
            onFilesChange?.(updatedFiles)
        },
        [files, maxFiles, multiple, onFilesChange]
    )

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        accept,
        maxFiles: multiple ? maxFiles : 1,
        maxSize,
        multiple,
        disabled: disabled || uploading,
    })

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index)
        // Revoke the preview URL to avoid memory leaks
        if (files[index].preview) {
            URL.revokeObjectURL(files[index].preview!)
        }
        setFiles(newFiles)
        onFilesChange?.(newFiles)
    }

    const handleUpload = async () => {
        if (!onUpload || files.length === 0) return

        try {
            setUploading(true)
            setUploadProgress(0)

            // Simulate progress for demo (in real app, use actual upload progress)
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => Math.min(prev + 10, 90))
            }, 200)

            await onUpload(files)

            clearInterval(progressInterval)
            setUploadProgress(100)

            // Clear files after successful upload
            files.forEach((file) => {
                if (file.preview) URL.revokeObjectURL(file.preview)
            })
            setFiles([])
            onFilesChange?.([])
        } finally {
            setUploading(false)
            setUploadProgress(0)
        }
    }

    const getFileIcon = (file: File) => {
        if (file.type.startsWith('image/')) return <Image className="h-6 w-6" />
        if (file.type.includes('pdf')) return <FileText className="h-6 w-6" />
        if (file.type.includes('zip') || file.type.includes('archive')) return <FileArchive className="h-6 w-6" />
        return <File className="h-6 w-6" />
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    // Store files ref for cleanup
    const filesRef = React.useRef<FileWithPreview[]>(files)
    filesRef.current = files

    // Cleanup previews on unmount
    React.useEffect(() => {
        return () => {
            filesRef.current.forEach((file) => {
                if (file.preview) URL.revokeObjectURL(file.preview)
            })
        }
    }, [])

    return (
        <div className={cn('space-y-4', className)}>
            <div
                {...getRootProps()}
                className={cn(
                    'relative rounded-lg border-2 border-dashed p-8 text-center transition-colors',
                    isDragActive && 'border-primary bg-primary/5',
                    !isDragActive && 'border-muted-foreground/25 hover:border-muted-foreground/50',
                    (disabled || uploading) && 'cursor-not-allowed opacity-50'
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-muted p-3">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium">
                            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            or click to browse
                        </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Max {formatFileSize(maxSize)} per file
                        {multiple && ` • Up to ${maxFiles} files`}
                    </p>
                </div>
            </div>

            {fileRejections.length > 0 && (
                <div className="text-sm text-destructive">
                    {fileRejections.map(({ file, errors }) => (
                        <p key={file.name}>
                            {file.name}: {errors.map((e) => e.message).join(', ')}
                        </p>
                    ))}
                </div>
            )}

            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="flex items-center gap-3 rounded-lg border p-3"
                        >
                            {showPreview && file.preview ? (
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    className="h-10 w-10 rounded object-cover"
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded bg-muted text-muted-foreground">
                                    {getFileIcon(file)}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => removeFile(index)}
                                disabled={uploading}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}

                    {uploading && (
                        <div className="space-y-2">
                            <Progress value={uploadProgress} />
                            <p className="text-xs text-center text-muted-foreground">
                                Uploading... {uploadProgress}%
                            </p>
                        </div>
                    )}

                    {onUpload && files.length > 0 && (
                        <Button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="w-full"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload {files.length} file{files.length > 1 ? 's' : ''}
                                </>
                            )}
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export { FileUpload }
