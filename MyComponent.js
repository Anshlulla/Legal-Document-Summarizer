import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import backgroundImage from './gavel.jpg';

function MyComponent() {
    const [textInput, setTextInput] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [buttonVisible, setButtonVisible] = useState(true);
    const [textVisible, setTextVisible] = useState(false);

    const containerStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh', // Adjust as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111116',
        minHeight: '100vh',
        flexDirection: 'column',
        paddingTop: '0vh',
        textAlign: 'center'
    };


    const handleChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleButtonClick = () => {
        setButtonVisible(false);
        setTextVisible(true);
    };

    const handleBackButtonClick = () => {
        setButtonVisible(true);
        setTextVisible(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/process_text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: textInput }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            //setProcessedText(data.processedText);
            const summary = data.processedText;
            //const f1_score = data.f1_score;
            navigate('/summary', { state: { textInput, summary}});

        }
        catch (error)
        {
            console.error('There was an error!', error);
        }
        finally
        {
            setLoading(false);
        }
    };

    return (
        <div style = {containerStyle}>
            <Button variant="contained" style={{
                width: '300px',
                height: '50px',
                position: 'absolute',
                top: '4px', left: '4px',
                backgroundColor: '#0D3F76',
                fontFamily: 'Circular',
                fontSize: '32px'
            }}>
                THINKLAW
            </Button>

            <div>
                <h1 style={{
                    color: '#BBBBBB',
                    fontSize: '40px'
                }}>
                    The Pioneer of Legal Summarization
                </h1>
            </div>

            <div>
                <p style={{fontSize: '24px', color: '#BBBBBB', maxWidth: '650px'}}>
                    Enhance your legal document understanding, unveil critical trends, streamline expenses, and identify authoritative sources with advanced analytics.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <TextField
                    id="standard-basic"
                    label="Input"
                    variant="standard"
                    value={textInput}
                    onChange={handleChange}
                    style={{
                        marginBottom: '10px',
                        width: '400px',
                        maxWidth: '400px',
                    }}
                    InputProps={{
                        style: {color: '#888888', fontSize: '25px'}
                    }}
                    InputLabelProps={{
                        style: {color: '#CCCCCC', textAlign: 'center', fontSize: '21px'}
                    }}
                />

                <div>
                    <Button variant="outlined" color="primary" type="submit"
                            style={{color: '#BBBBBB', height: '40px', width: '150px', fontSize: '17px'}}>
                        {loading && <CircularProgress size={24} style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px'
                        }}/>} {/* Display CircularProgress when loading */}
                        {!loading ? 'Summarize' : 'Processing...'}
                    </Button>

                </div>

            </form>
            <div style={{marginTop: '30px'}}>

                {buttonVisible && (
                    <Button variant="outlined" onClick={handleButtonClick} style={{color: '#BBBBBB', height: '40px', width: '300px', marginTop: '30px', fontSize: '17px'}}>View Model Performance</Button>
                )}

                {textVisible && (
                    <div>
                        <table style={{color: '#BBBBBB', borderCollapse: 'collapse', marginBottom: '30px'}}>
                            <tr>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>
                                    Data
                                </td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>
                                    Cosine Similarity
                                </td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>
                                    Rouge-1
                                </td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>
                                    Rouge-2
                                </td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>
                                    Rouge-L
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>
                                    Train
                                </td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>0.5127</td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>0.3476</td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>0.1292</td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>0.2657</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>
                                    Validation
                                </td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>0.5828</td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>0.3795</td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>0.1553</td>
                                <td style={{ border: '1px solid #BBBBBB', padding: '5px'}}>0.3027</td>
                            </tr>
                        </table>
                        <Button variant="contained" onClick={handleBackButtonClick}>Back</Button>
                    </div>
                )}

            </div>

        </div>
    );
}

export default MyComponent;
