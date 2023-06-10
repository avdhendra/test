import { Storage } from "appwrite";
import client from "./appwrite.config";
import { message } from "antd";
const storage = new Storage(client);

export const uploadFile = (file) => {
   
    const promise = storage.createFile("excel1", file.name, file);
    promise.then(function (response) {
    message.success("fileUploaded succesfull"); // Success
}, function (error) {
    message.error("File Not Uploaded !") // Failure
});
};

export const getFiles = async () => {

    try {
        const response = await storage.listFiles('excel1');
        
            return response
    
    } catch (error) {
        throw error
}

}

export const getFileFromAppWrite = async (fileId) => {
  try {
    const response = await storage.getFileView("excel1",fileId);
    return response // Returns the file data
  } catch (error) {
    console.log('Error retrieving the file from Appwrite:', error);
    throw error;
  }
};