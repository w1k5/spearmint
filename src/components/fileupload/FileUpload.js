// FileUpload.js
import './fileupload.css';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const FileUpload = ({ onFileUploaded }) => {
    const [loading, setLoading] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);

    const handleCSVFile = (file) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                console.log("Parsed CSV Data:", results.data);
                if (results.errors.length > 0) {
                    console.error("CSV parsing errors:", results.errors);
                    alert("Error parsing CSV file. Please check the file format.");
                    setLoading(false);
                    return;
                }
                onFileUploaded(results.data);
                setLoading(false);
                setFileUploaded(true);
            },
            error: (error) => {
                console.error(`CSV parsing error: ${error.message}`);
                alert("Error parsing CSV file.");
                setLoading(false);
            }
        });
    };

    const handleExcelFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const firstSheet = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheet];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            console.log("Parsed Excel Data:", data);

            const [header, ...rows] = data;
            const parsedData = rows.map(row => {
                let rowObject = {};
                header.forEach((key, index) => {
                    rowObject[key] = row[index];
                });
                return rowObject;
            });

            onFileUploaded(parsedData);
            setLoading(false);
            setFileUploaded(true);
        };
        reader.onerror = (error) => {
            console.error(`Excel parsing error: ${error.message}`);
            alert("Error parsing Excel file.");
            setLoading(false);
        };
        reader.readAsBinaryString(file);
    };

    const onDrop = useCallback((acceptedFiles) => {
        setLoading(true);
        setFileUploaded(false);
        acceptedFiles.forEach(file => {
            if (file.type === 'text/csv') {
                handleCSVFile(file);
            } else if (file.type.includes('spreadsheetml')) {
                handleExcelFile(file);
            } else {
                console.error(`Unsupported file type: ${file.type}`);
                alert("Unsupported file type. Please upload a CSV or Excel file.");
                setLoading(false);
            }
        });
    }, [onFileUploaded]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const resetUpload = () => {
        setFileUploaded(false);
        onFileUploaded([]);
    };

    return (
        <div>
            {!fileUploaded ? (
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    {loading ? (
                        <h1>Uploading...</h1>
                    ) : (
                        <h1>Drag 'n' drop some files here, or click to select files</h1>
                    )}
                </div>
            ) : (
                <div className="upload-status">
                    <h1>File uploaded successfully.</h1>
                    <button onClick={resetUpload}>Clear data</button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;