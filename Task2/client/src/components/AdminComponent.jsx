import React, { useEffect, useState } from 'react'
// import { read, utils } from 'xlsx';
import { getFiles } from '../utils/appwriteUtils';
import { Card,Result } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useNavigate } from 'react-router-dom';
const AdminComponent = () => {

  const [excelData, setExcelList] = useState();
const navigate=useNavigate()
 const role=localStorage.getItem('role')
  
  //list the file
  useEffect(() => {
    const fetchFilesList = async () => {
      try {
        const response = await getFiles();
       
        setExcelList(response.files)
      } catch (error) {
        console.log('Error retrieving the files list:', error);
      }
    };

    fetchFilesList();
  }, [])
 


  const handleNavigation = (id) => {
    // const modifiedId = id.replace(/\.csv$/, "");
    navigate(`/main/admin/${id}`)
  }
  
  return (
  role === "admin" ? (
    <div className='display-card'>
      {excelData?.map((data) => (
        <Card
          key={data["$id"]}
          hoverable
          style={{ width: 150 }}
          cover={<img alt="example" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Microsoft_Excel_2013-2019_logo.svg/2170px-Microsoft_Excel_2013-2019_logo.svg.png" />}
          onClick={() => handleNavigation(data['$id'])}
        >
          <Meta title={data?.name} />
        </Card>
      ))}
    </div>
  ) : (
    <Result
    title="Not Have Permission only for admin"
   />
  )
);
}

export default AdminComponent
