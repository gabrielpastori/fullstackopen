import React from 'react';

const Languages = ({ country }) => {
    const languages = Object.values(country.languages);
    return (
        <div>
            <h2>languages</h2>
            <ul>
                {languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
        </div>
    );
}

export default Languages;