import styles from '../../styles/fileupload.module.css';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const FileUpload = ({ onFileUploaded }) => {
    const [loading, setLoading] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);

    // Define a mapping for relevant headers and their possible variations
    const headerMapping = {
        Date: ["Date", "Posting Date", "Transaction Date", "Transaction DateTime"],
        Description: ["Description", "Details", "Memo", "Narrative"],
        Amount: ["Amount", "Transaction Amount", "Credit Amount", "Debit Amount"]
    };

    const handleCSVFile = (file) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) => {
                const parsedData = results.data.map(row => {
                    return extractRelevantData(row);
                });
                onFileUploaded(parsedData);
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

    const extractRelevantData = (row) => {
        const relevantData = {};
        Object.keys(headerMapping).forEach(key => {
            const matchedHeader = headerMapping[key].find(header => row.hasOwnProperty(header));
            relevantData[key] = matchedHeader ? row[matchedHeader] : null;
        });
        return relevantData;
    };

    const handleExcelFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const firstSheet = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheet];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const [header, ...rows] = data;
            const parsedData = rows.map(row => {
                let rowObject = {};
                Object.keys(headerMapping).forEach(key => {
                    const matchedHeader = headerMapping[key].find(h => header.includes(h));
                    rowObject[key] = matchedHeader ? row[header.indexOf(matchedHeader)] : null;
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
                <div {...getRootProps()} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    {loading ? (
                        <h1>Uploading...</h1>
                    ) : (
                        <h1>Drag 'n' drop some files here, or click to select files</h1>
                    )}
                </div>
            ) : (
                <div className={styles.uploadStatus}>
                    <h1>File uploaded successfully.</h1>
                    <button onClick={resetUpload}>Clear data</button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;