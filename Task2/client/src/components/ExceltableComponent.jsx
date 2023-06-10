import React, { useEffect, useState } from "react";
import { getFileFromAppWrite } from "../utils/appwriteUtils";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { registerLicense } from '@syncfusion/ej2-base';
import { message } from "antd"
const ExceltableComponent = () => {
  const [ExcelData, setExcelData] = useState([]);
  const { id } = useParams();

  
  registerLicense("Mgo+DSMBaFt+QHJqXE1nQ1BEaV1CX2BZell0R2lZf04BCV5EYF5SRHBeQl1lSHtRdEFmWXw=;Mgo+DSMBPh8sVXJ1S0R+VVpDaV5CQmFJfFBmQWlbfVRwdEU3HVdTRHRcQltiSX5Vd0BhW3tYcnc=;ORg4AjUWIQA/Gnt2VFhiQlhPcUBDXXxLflF1VWdTfVx6dFVWESFaRnZdQV1lSH5TcERmW31ad3FW;MjM3NTkxMUAzMjMxMmUzMDJlMzBpa3JES2lMb2FkdS81MUhXUCtRdFhwUzN0bHBMeUNnWTF3VHNacUpPVW53PQ==;MjM3NTkxMkAzMjMxMmUzMDJlMzBJK1B4QTF5WWx6Z05qNmdnVjVOT1BlRXZkMDlLV2N6RXMzWm5wcHZwSEFvPQ==;NRAiBiAaIQQuGjN/V0d+Xk9NfVhdXGNWfFN0RnNddVxyflVGcC0sT3RfQF5jT39TdkNiXH1cdXZcRQ==;MjM3NTkxNUAzMjMxMmUzMDJlMzBVOFc4OFZmR3ZIRnJLcW9tS09UQ1VNQVpqNWc2WUdxaU4zUzBTQ0YxSndRPQ==;MjM3NTkxNkAzMjMxMmUzMDJlMzBnbkxuMXVLengybFcvTjY2MjJENUl3TERHcmVBbm16Vm1EQVpLZFIvdllvPQ==;Mgo+DSMBMAY9C3t2VFhiQlhPcUBDXXxLflF1VWdTfVx6dFVWESFaRnZdQV1lSH5TcERmW31beHZW;MjM3NTkxOEAzMjMxMmUzMDJlMzBjWThrUWRhRWg3SEZ4MkwySXpnUEVXVkV6VXJhRHl1QmlIMkh4Q1BhV1NrPQ==;MjM3NTkxOUAzMjMxMmUzMDJlMzBoeHdtbXZDNHJFVjVBRHFlMmVlR1pEZ3JZc0pZNzJLYnJqbndQcDlyV1BBPQ==;MjM3NTkyMEAzMjMxMmUzMDJlMzBVOFc4OFZmR3ZIRnJLcW9tS09UQ1VNQVpqNWc2WUdxaU4zUzBTQ0YxSndRPQ==");




  const getDataInJSON = (initialData) => {
    const transformedData = initialData.map((row) => {
    return row.reduce((obj, value, index) => {
      const key = initialData[0][index]; // Assuming the first row contains the keys
      return { ...obj, [key]: value };
    }, {});
    });
      return transformedData.slice(1)
  }
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await getFileFromAppWrite(id);
      
        fetch(response)
          .then((res) => res.arrayBuffer())
          .then((ab) => {
            const wb = XLSX.read(ab, { type: "array" });
            const sheetname = wb.SheetNames[0];
            const ws = wb.Sheets[sheetname];
            const json = XLSX.utils.sheet_to_json(ws, { header: 1 });
           
           const getData= getDataInJSON(json)
            setExcelData(getData);
          });
      } catch (err) {
        message.error(err)
      }
    };
    fetchFile();
  }, [id]);
  

  return (
    <div>
  <SpreadsheetComponent >
          <SheetsDirective>
              <SheetDirective>
                  <RangesDirective>
                      <RangeDirective dataSource={ExcelData}></RangeDirective>
                  </RangesDirective>
                  <ColumnsDirective>
                      <ColumnDirective width={100}></ColumnDirective>
                      <ColumnDirective width={110}></ColumnDirective>
                      <ColumnDirective width={100}></ColumnDirective>
                      <ColumnDirective width={180}></ColumnDirective>
                      <ColumnDirective width={130}></ColumnDirective>
                      <ColumnDirective width={130}></ColumnDirective>
                  </ColumnsDirective>
              </SheetDirective>
          </SheetsDirective>
      </SpreadsheetComponent>
    </div>
  );
};

export default ExceltableComponent;
