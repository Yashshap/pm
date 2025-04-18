import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload({ selectedFile, setSelectedFile }) {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const acceptedFiles = {
    'application/pdf': ['.pdf'],
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg']
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
    }
  }, [setSelectedFile]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: acceptedFiles,
    maxSize,
    multiple: false
  });

  return (
    <div className="max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div className="text-green-600">
            <p className="font-medium">File selected:</p>
            <p>{selectedFile.name}</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">
              Drag & drop a file here, or click to select
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Accepted files: PDF, PNG, JPEG (max 10MB)
            </p>
          </div>
        )}
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-4 text-red-500 text-sm">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.path}>
              {errors.map(error => (
                <p key={error.code}>{error.message}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;