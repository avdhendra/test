import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import{useRef} from 'react'

import { useState } from "react";
import { uploadFileInFirebase } from "../utils/firebaseUtils";


const UploadComponent = () => {
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    

    const handleUpload = () => {
       inputRef.current?.click()
    }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile: File | undefined = event.target.files?.[0];

  if (selectedFile) {
    setFileList([selectedFile]);
    setFileName(selectedFile.name);
  }
};

  const SubmitFile = () => {
    setLoading(true);
    if (fileList.length > 0) {
      uploadFileInFirebase(fileList);
      setLoading(false);
      setFileList([]);
    } else {
        alert("please insert a file");
         setLoading(false);
    }
  };

 

  return (
    <>
      <h2> Upload Excel File </h2>
      <div className="upload-div">
        <div>
          <div className="card">
            <h3>Upload Files</h3>
            <div className="drop_box">
                          {fileName.length > 0 ? (     
                          <h4>{fileName}</h4>
                          ) : (
                                  <>
                <header>
                <h4>Select File here</h4>
              </header>
              <p>Files Supported: XLS</p>
              <input type="file" hidden accept=".xlsx, .xls, .csv"  id="fileSelect" ref={inputRef} style={{ display: 'none' }}  onChange={handleFileChange}/>
              <button className="btn" onClick={handleUpload}>Choose File</button> </>    
             )}
            </div>
          </div>
        </div>

        <div>
          <Button
            type="primary"
            loading={loading}
            onClick={() => SubmitFile()}
                      style={{ backgroundColor: "#005af0" }}
                      size="large"
          >
            Upload File
          </Button>
        </div>
      </div>
    </>
  );
};

export default UploadComponent;
