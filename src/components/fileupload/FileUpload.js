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
        Amount: ["Amount", "Transaction Amount", "Credit Amount", "Debit Amount"],
        Ignore: ["Ignore"]
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
            relevantData[key] = matchedHeader ? row[matchedHeader] : false;
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
                <div {...getRootProps({ role: 'button', 'aria-label': 'Upload a CSV or Excel transaction file' })} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    <span className={styles.uploadIcon} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    {loading ? (
                        <div>
                            <h3>Reading your file…</h3>
                            <p>We’ll build your dashboard in a moment.</p>
                        </div>
                    ) : (
                        <div>
                            <h3>Drop your transaction file here</h3>
                            <p>or <span className={styles.browseText}>browse your files</span> · CSV or Excel</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.uploadStatus}>
                    <span className={styles.successIcon} aria-hidden="true">✓</span>
                    <div>
                        <h3>Your data is ready</h3>
                        <p>The dashboard has been updated with your transactions.</p>
                    </div>
                    <button className="button button-secondary" onClick={resetUpload}>Choose another file</button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
