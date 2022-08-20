import React from 'react';
import { useState } from 'react';
import MainPageLayout from '../layouts/MainPageLayout';

const Home = () => {
    const [input, setInput] = useState('');

    const onInputChange = (event) => {
        setInput(event.target.value)
    }

    const onSearch = () => {
        // https://api.tvmaze.com/search/shows?q=girls
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
        .then(response => response.json())
        .then(resultJson => console.log(resultJson))
    }

    const onKeyDown = (event) => {
        if(event.keyCode === 13){
            onSearch(input)
        }
    }

    return ( 
        <MainPageLayout>
            <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
            <button type='button' onClick={onSearch}>Search</button>
        </MainPageLayout>
    );
}
 
export default Home;