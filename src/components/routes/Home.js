import React from 'react';
import { useState } from 'react';
import { apiGet } from '../../api/tv-maze-api';
import MainPageLayout from '../layouts/MainPageLayout';

const Home = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);

    const onInputChange = (event) => {
        setInput(event.target.value)
    }

    const onSearch = () => {
        apiGet(`/search/shows?q=${input}`)
         .then(results => setResults(results));
    }

    const onKeyDown = (event) => {
        if(event.keyCode === 13){
            onSearch(input)
        }
    }

    const renderResults = () => {
        if(results && results.length === 0){
            return <div>No results</div>
        }

        if(results && results.length > 0){
            return (
                <div>
                    {results.map(item => <div key={item.show.id}>{item.show.name}</div>)}
                </div>
            );
        }

    }

    return ( 
        <MainPageLayout>
            <input 
                type="text" 
                onChange={onInputChange} 
                onKeyDown={onKeyDown} 
                value={input}
            />
            <button type='button' onClick={onSearch}>
                Search
            </button>
            {renderResults()}

        </MainPageLayout>
    );
}
 
export default Home;