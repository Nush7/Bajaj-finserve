// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('http://localhost:3000/bfhl', parsedInput);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON input or API request failed');
      setResponse(null);
      console.error(err);
    }
  };

  const handleMultiSelectChange = (e) => {
    const { value } = e.target;
    setSelectedOptions((prevOptions) => {
      if (e.target.checked) {
        return [...prevOptions, value];
      } else {
        return prevOptions.filter((opt) => opt !== value);
      }
    });
  };

  return (
    <div className="App">
      <h1>REST API Frontend</h1>
      <textarea
        rows="6"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON input here'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <div>
            <label>
              <input type="checkbox" value="alphabets" onChange={handleMultiSelectChange} />
              Alphabets
            </label>
            <label>
              <input type="checkbox" value="numbers" onChange={handleMultiSelectChange} />
              Numbers
            </label>
            <label>
              <input type="checkbox" value="highest_lowercase_alphabet" onChange={handleMultiSelectChange} />
              Highest Lowercase Alphabet
            </label>
          </div>
          <div>
            {selectedOptions.includes('alphabets') && (
              <div>
                <h3>Alphabets:</h3>
                <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
              </div>
            )}
            {selectedOptions.includes('numbers') && (
              <div>
                <h3>Numbers:</h3>
                <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
              </div>
            )}
            {selectedOptions.includes('highest_lowercase_alphabet') && (
              <div>
                <h3>Highest Lowercase Alphabet:</h3>
                <pre>{JSON.stringify(response.highest_lowercase_alphabet, null, 2)}</pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
