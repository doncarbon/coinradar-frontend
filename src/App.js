import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [top10, setTop10] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
	axios.get('https://your-backend-url.herokuapp.com/api/top10')
	  .then(response => {
		setTop10(response.data.top10);
	  })
	  .catch(error => {
		console.error('Error fetching the top 10 cryptocurrencies', error);
	  });
  }, []);

  const handleSearch = (event) => {
	event.preventDefault();
	axios.get(`https://your-backend-url.herokuapp.com/api/search?query=${search}`)
	  .then(response => {
		setSearchResult(response.data);
	  })
	  .catch(error => {
		console.error('Error fetching the search result', error);
	  });
  };

  return (
	<div className="App">
	  <header className="App-header">
		<h1>CoinRadar</h1>
		<form onSubmit={handleSearch}>
		  <input
			type="text"
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			placeholder="Search for a cryptocurrency"
		  />
		  <button type="submit">Search</button>
		</form>
		{searchResult && (
		  <div className="search-result">
			<h2>{searchResult.name} ({searchResult.symbol.toUpperCase()})</h2>
			<p>Price: ${searchResult.price}</p>
			<p>Market Cap: ${searchResult.market_cap}</p>
			<p>Total Supply: {searchResult.total_supply}</p>
			<p>Circulating Supply: {searchResult.circulating_supply}</p>
		  </div>
		)}
	  </header>
	  <main>
		<h2>Top 10 Cryptocurrencies</h2>
		<ul>
		  {top10.map(coin => (
			<li key={coin.id}>
			  <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
			  <p>Price: ${coin.price}</p>
			  <p>Market Cap: ${coin.market_cap}</p>
			  <p>Total Supply: {coin.total_supply}</p>
			  <p>Circulating Supply: {coin.circulating_supply}</p>
			</li>
		  ))}
		</ul>
	  </main>
	</div>
  );
}

export default App;
