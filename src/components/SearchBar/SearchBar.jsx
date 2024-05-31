import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';

const SearchBar = ({ stockData, addToFavorites, userId }) => {
    const history = useHistory();
    const dispatch = useDispatch(); 

    const [searchQuery, setSearchQuery] = useState('');

    // Stock Details
    const handlePush = (stockData) => {
        dispatch({ type: 'SET_CURRENT_STOCK', payload: stockData });
        console.log("in push function: ", stockData);
        history.push('./stockDetails')
    }

    // Sets the search query
    const handleSearch = (query) => {
        console.log("searching query.")
        setSearchQuery(query);
    };

    // Sets what the search query searches on
    const filteredData = stockData.filter(item =>
        item.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search Stocks..."
                onChange={(event) => handleSearch(event.target.value)}
            />
            {searchQuery && (
                <ul className="search-results">
                    {filteredData.map((item, index) => (
                        <li key={index} className="search-result-item">
                            <h3>{item.ticker}</h3> - {item.name}
                            <br />
                            <button onClick={() => handlePush(item)}>See Details</button>
                            <br />
                            <button onClick={() => addToFavorites(userId, item.ticker)}>Add To Favorites</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;