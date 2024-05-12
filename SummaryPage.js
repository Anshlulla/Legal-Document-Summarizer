import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import blue from './blue.jpg';
import { Button } from '@mui/material';


function SummaryPage() {
    const location = useLocation();
    const { textInput, summary} = location.state;
    const navigate = useNavigate();
    const [textVisible, setTextVisible] = useState(true);
    const [summaryVisible, setSummaryVisible] = useState(false);


    const blueStyle = {

        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${blue})`,
        backgroundSize: 'cover',
        justifyContent: 'center',
        border: '1px solid #CCCCCC',
        padding: '10px',
        backgroundColor: '#18118c'
    };


    const handleGoBack = () => {
        navigate('/');
    };

    const handleTextClick = () => {
        setTextVisible(true);
        setSummaryVisible(false);
    };

    const handleSummaryClick = () => {
        setSummaryVisible(true);
        setTextVisible(false);
    };


    return (
        <div style={{
            backgroundColor: '#060336',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '0vh',
            textAlign: 'center',
            color: '#FFFFFF'
        }}>
            <Button variant="contained" onClick={handleGoBack} style={{
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
            <div className="curved-div">
                <h1 style={{
                    marginTop: '60px',
                    width: '110%',
                    height: '48px',
                    fontSize: '45px'
                }}>
                    Summary Page
                </h1>
            </div>
            <div style={{
                width: '80%',
                textAlign: 'center',
                marginTop: '20px',
                marginLeft: 'auto', marginRight: 'auto'
            }}>
                {textVisible && (
                    <div style={blueStyle}>
                        <Button variant="outlined" onClick={handleTextClick} style={{color: '#BBBBBB', height: '40px', width: '250px', marginRight: '5px', marginTop: '30px', fontSize: '17px'}}>
                            Document Text
                        </Button>
                        <Button variant="outlined" onClick={handleSummaryClick} style={{color: '#BBBBBB', height: '40px', width: '200px', marginTop: '30px', fontSize: '17px'}}>
                            Summary
                        </Button>
                        <p style={{wordWrap: 'break-word', marginTop: '50px', marginBottom: '50px', textAlign: 'justify', maxWidth: '1100px', marginLeft: '35px'}}>{textInput}</p>
                    </div>

                )}

                {summaryVisible && (
                    <div style={blueStyle}>
                        <Button variant="outlined" onClick={handleTextClick} style={{color: '#BBBBBB', height: '40px', width: '250px', marginRight: '5px', marginTop: '30px', fontSize: '17px'}}>
                            Document Text
                        </Button>
                        <Button variant="outlined" onClick={handleSummaryClick} style={{color: '#BBBBBB', height: '40px', width: '200px', marginTop: '30px', fontSize: '17px'}}>
                            Summary
                        </Button>
                        <p style={{wordWrap: 'break-word', marginBottom: '50px', marginTop: '50px', textAlign: 'justify', maxWidth: '1100px', marginLeft: '35px'}}>{summary}</p>
                    </div>
                )}

            </div>
            <Button variant="contained" color="primary" onClick={handleGoBack}
                    style={{marginTop: '20px', marginBottom: '50px'}}>
                Back
            </Button>
        </div>
    );
}

export default SummaryPage;
