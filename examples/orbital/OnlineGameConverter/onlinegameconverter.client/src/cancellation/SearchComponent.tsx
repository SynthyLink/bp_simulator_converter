// SearchComponent.jsx
import React, { useState, useEffect } from 'react';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 1. Create a new AbortController instance
        const controller = new AbortController();
        const signal = controller.signal;

        // We only want to run the fetch if the query is not empty
        if (query === '') {
            setData(null);
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/search?q=${query}`, { signal });
                const result = await response.json();
                setData(result);
                setIsLoading(false);
            } catch (err) {
                // 2. Check if the error is due to an aborted request
                if (err.name === 'AbortError') {
                    console.log('Fetch request was aborted.');
                } else {
                    setError(err);
                    setIsLoading(false);
                }
            }
        };

        // Use a debounce to avoid sending a request on every keystroke
        const debounceTimeout = setTimeout(() => {
            fetchData();
        }, 500);

        // 3. Cleanup function: This runs when the component unmounts or
        // when the dependencies ([query]) change.
        return () => {
            // Clear the debounce timeout to prevent the old fetch from running
            clearTimeout(debounceTimeout);
            // Abort the ongoing fetch request
            controller.abort();
        };
    }, [query]); // The effect re-runs whenever 'query' changes

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            {data && (
                <ul>
                    {data.map(item => <li key={item.id}>{item.name}</li>)}
                </ul>
            )}
        </div>
    );
};

export default SearchComponent;
