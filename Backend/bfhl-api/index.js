const express = require('express');
const app = express();
app.use(express.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = '';

    // Process each item in the data array
    data.forEach(item => {
        if (!isNaN(item)) {
            // Item is a number
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            // Item is an alphabet
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                // Update the highest lowercase alphabet
                if (item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    // Prepare the response object
    const response = {
        is_success: true,
        user_id: "anushka_singh_06032003",  // Replace with dynamic logic if needed
        email: "anushkasinghofficial2646@gmail.com",  // Replace with dynamic logic if needed
        roll_number: "21BSA10148",  // Replace with dynamic logic if needed
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    // Send the response
    res.status(200).json(response);
});

const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// The "catchall" handler: for any request that doesn't match one above, send back the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// GET endpoint for operation_code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
