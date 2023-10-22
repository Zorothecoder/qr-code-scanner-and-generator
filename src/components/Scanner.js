import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import axios from 'axios'
import QrCode from 'qrcode'
import Table from '../components/Table'
import { useNavigate } from 'react-router-dom'

const Scanner = () => {
    const [scanResult, setScanResult] = useState(null)
    const [text, setText] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const generateQrCode = async () => {
        try {
            const response = await QrCode.toDataURL(text)
            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    }

    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('https://qr-scanner-jkzb.onrender.com/').then(res => {
            if (res.data.valid) { 
                setUsername(res.data.username)
            }
            else{
                navigate('/qr-code-scanner-and-generator')
            }
        }).catch(err => console.log(err))

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        })

        scanner.render(success, error)

        function success(result) {
            scanner.clear()
            setScanResult(result)

            if (result) {
                const confirmSave = window.confirm('Do you want to save the scanned content to the database?');
                if (confirmSave) {
                    window.confirm('Successfully Saved')
                    sendScannedDataToBackend(result);
                }
            }
        }

        function error(err) {
            console.warn(err)
        }

        const sendScannedDataToBackend = (data) => {
            const currentDate = new Date();
            const dateOnly = currentDate.toLocaleDateString()
            const scannedData = {
                content: data,
                scanDate: dateOnly,
            }
            axios.post('http://localhost:3001/qrcodes', scannedData).then((response) => {
                console.log('Scanned data sent successfully', response.data)
            }).catch((error) => {
                console.error('Error sending scanned data', error)
            })
        }
    }, [])
    return (
        <div className="text-light">
            <h1 className='mb-2 text-center '>Generate and Scan your QR Code Here</h1>
            <h4 style={{display:"inline"}} >Welcome</h4><h4 className="ms-2 text-success"style={{display:"inline"}}>{username}</h4>
            <div className="row mt-2 mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Enter you content here to generate QR code" onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="col">
                    <button type="button" className='btn btn-success' onClick={() => generateQrCode()}>Generate</button>
                </div>
            </div>
            <div className='text-center'>
            {imageUrl ? (<a href={imageUrl} download><img src={imageUrl} alt="img" /> <br />Click Here to download the QR Code</a>) : null}
            </div>
            {scanResult
                ? <div>Scanned Code is: <a href={"http://" + scanResult}>{scanResult}</a></div>
                : <div className="mt-4">
                    <div  id="reader" ></div>
                </div>}
            <Table />
        </div>
    )
}
export default Scanner