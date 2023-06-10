
import { Button } from "antd";
import{useRef} from 'react'

import { useState } from "react";

import { uploadFile } from "../utils/appwriteUtils";


const UploadComponent = () => {
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState();
    const inputRef = useRef(null);
    

    const handleUpload = () => {
       inputRef.current?.click()
    }
  const handleFileChange = (event) => {
  
    if (!event.target.files) {
    return
  }
    const selectedFile = event.target.files[0];

  if (selectedFile) {
    setFileList(selectedFile);
    setFileName(selectedFile.name);
    }
    
};

  const SubmitFile = () => {
 if (!fileList) {
      return;
    }

    setLoading(true);
    uploadFile(fileList)
   
    console.log("ass", fileList)
    setLoading(false)
    // uploadExcelFile(inputRef.current?)
   
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
