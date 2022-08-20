import React from 'react';
import { useState } from 'react';
import { apiGet } from '../../api/tv-maze-api';
import MainPageLayout from '../layouts/MainPageLayout';

const Home = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowsSearch = searchOption === 'shows';

    const onInputChange = (event) => {
        setInput(event.target.value)
    }

    const onSearch = () => {
        apiGet(`/search/${searchOption}?q=${input}`)
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
            return results[0].show ? results.map(item => (
                <div key={item.show.id}>
                    {item.show.name}
                </div>
            )) : results.map(item =>(
                <div key={item.person.id}>
                    {item.person.name}
                </div>
            ));
        }

    }

    const onRadioChange = (event) => {
        setSearchOption(event.target.value)
    }

    return ( 
        <MainPageLayout>
            <input 
                type="text" 
                onChange={onInputChange} 
                onKeyDown={onKeyDown} 
                value={input}
                placeholder='Search for something'
            />

            <div>
                <label htmlFor='shows-search'>
                    Shows
                    <input 
                        id='shows-search' 
                        type = 'radio' 
                        value='shows'
                        checked={isShowsSearch} 
                        onChange={onRadioChange}
                    />
                </label>

                <label htmlFor='actors-search'>
                    Actors
                    <input 
                        id='actors-search' 
                        type = 'radio' 
                        value='people'
                        checked = {!isShowsSearch} 
                        onChange={onRadioChange}
                    />
                </label>
            </div>

            <button type='button' onClick={onSearch}>
                Search
            </button>
            {renderResults()}

        </MainPageLayout>
    );
}
 
export default Home;