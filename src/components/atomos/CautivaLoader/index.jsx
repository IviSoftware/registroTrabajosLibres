import React from 'react';
import './CautivaLoader.css';

function CautivaLoader() {
    return (
        <div className="loader-container">
            <div className="cautiva-loader">
                <div className="inner-ring"></div>
                <div className="outer-ring"></div>
            </div>
            <p className="loader-text">Enviando información...</p>
        </div>
    );
}

export default CautivaLoader;
