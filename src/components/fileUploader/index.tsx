import { useState, useRef, useEffect, useCallback } from "react";
import { FileUploaderRegular, OutputFileEntry, UploadCtxProvider } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

import { FileEntry } from '@/types';
interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
  // theme: 'light' | 'dark';

}
const localeDefinitionOverride = {
  en: {
    "upload-file": "Upload photo",
    "upload-files": 'Upload photos',
    "choose-file": 'Choose photo',
    "choose-files": 'Choose photos',
    "drop-files-here": 'Drop photos here',
    "select-file-source": 'Select photo source',
    "edit-image": 'Edit photo',
    "no-files": 'No photos selected',
    "caption-edit-file": 'Edit photo',
    "files-count-allowed": 'Only {{count}} {{plural:photo(count)}} allowed',
    "files-max-size-limit-error": 'Photo is too big. Max photo size is {{maxFileSize}}.',
    "header-uploading": 'Uploading {{count}} {{plural:photo(count)}}',
    "header-succeed": '{{count}} {{plural:photo(count)}} uploaded',
    "header-total": '{{count}} {{plural:photo(count)}} selected',
    "photo__one": 'photo',
    "photo__many": 'photos',
    "photo__other": 'photos',
  }
}
const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({ fileEntry, onChange }) => {

  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry<'success'>[]>([]);

  const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);

  const handleRemoveClick = useCallback(
    (uuid: OutputFileEntry["uuid"]) =>
      onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
    [fileEntry.files, onChange]
  );

  const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();

  const handleModalCloseEvent = () => {
    resetUploaderState()
    onChange({ files: [...uploadedFiles] });
    setUploadedFiles([]);
  }
  const handleChangeEvent = (files: { allEntries: any[]; }) => {
    setUploadedFiles([...files.allEntries.filter(f => f.status === 'success')] as OutputFileEntry<'success'>[]);
  }

  return (
    <div>
      <FileUploaderRegular
        imgOnly
        multiple
        removeCopyright
        confirmUpload={false}
        localeDefinitionOverride={localeDefinitionOverride}
        apiRef={ctxProviderRef}
        onModalClose={handleModalCloseEvent}
        onChange={handleChangeEvent}
        pubkey="a6ca334c3520777c0045"
      // className={cs(uploaderClassName)}
      // classNameUploader={cs(cssOverrides.fileUploader, { [st.darkModeEnabled]: theme === 'dark' })}
      />
      <div className="grid grid-cols-2 gap-4 mt-8">
        {fileEntry.files.map((file) => (
          <div key={file.uuid} className="relative">
            <img
              key={file.uuid}
              src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/
              `}
            />

            <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800  rounded-full w-7 h-7">
              <button
                className="text-slate-800 text-center"
                type="button"
                onClick={() => handleRemoveClick(file.uuid)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;


