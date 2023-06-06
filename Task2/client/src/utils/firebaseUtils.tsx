import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { database, storage } from "./firebase.config"
import { UploadFile } from "antd"
import {read,utils} from "xlsx"
import {set} from "firebase/database"
const uploadExcelFile = (file:File) => {
  // Upload the file to Firebase Storage
  const storageRef = ref(storage,'excels');
    const fileRef = ref(storageRef, file.name);
     
   
uploadBytes(fileRef,file)
    .then((snapshot) => {
      console.log('File uploaded successfully');
      // Get the download URL of the uploaded file
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      // Parse the uploaded Excel file
      const fileReader = new FileReader();
       fileReader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = utils.sheet_to_json(worksheet, { header: 1 });

           // Save the Excel data to Firebase Realtime Database
          //  set(ref(database, 'excelData'), { downloadURL, excelData });
      
      console.log('Excel data saved to the database');
    };
      fileReader.readAsArrayBuffer(file);
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
    });
};


export const uploadFileInFirebase = (fileList: File[]): void => {
    // Upload the file to Firebase Storage
    fileList.forEach((file: File) => {
        uploadExcelFile(file);
    });
}

 