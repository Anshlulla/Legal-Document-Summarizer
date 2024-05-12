import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyComponent from './MyComponent';
import SummaryPage from './SummaryPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MyComponent />} />
                <Route path="/summary" element={<SummaryPage />} />
            </Routes>
        </Router>
    );
}

export default App;
