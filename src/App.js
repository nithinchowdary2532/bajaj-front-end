import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [method, setMethod] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (jsonInput === "") {
      try {
        const res = await axios.get('http://localhost:5000/bfhl');
        setResponse(res.data);
        setMethod('get');
        console.log(res.data);
      } catch (error) {
        console.error('Error:', error);
        alert('Error fetching data');
      }
    } else {
      try {
        const parsedData = JSON.parse(jsonInput);
        if (!Array.isArray(parsedData.data)) {
          throw new Error('Invalid JSON format');
        }

        const res = await axios.post('http://localhost:5000/bfhl', parsedData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setResponse(res.data);
        setMethod('post');
        console.log(res.data);
      } catch (error) {
        console.error('Error:', error);
        alert('Invalid JSON input');
      }
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <textarea
        placeholder='Enter JSON like {"data": ["A", "1", "z"]}'
        value={jsonInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
    
          <div>
            {method === 'get' ? (
              Object.entries(response).map(([key, value]) => (
                <p key={key}>
                  {key}: {value === true ? 'true' : value}
                </p>
              ))
            ) : (
              <>

          <h2>Response</h2>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_alphabet"
              onChange={handleOptionChange}
            />
            Highest Alphabet
          </label>

                {selectedOptions.includes('numbers') && (
                  <p>Numbers: {response.numbers.join(', ')}</p>
                )}
                {selectedOptions.includes('alphabets') && (
                  <p>Alphabets: {response.alphabets.join(', ')}</p>
                )}
                {selectedOptions.includes('highest_alphabet') && (
                  <p>Highest Alphabet: {response.highest_alphabet}</p>
                )}
              </>
            )}
          </div>
     
      )}
    </div>
  );
}

export default App;
