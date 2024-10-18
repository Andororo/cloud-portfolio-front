 // Function to send data to the Lambda function (POST request)
 function sendVisitData() {
    let hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
        console.log('First time visitor');
        localStorage.setItem('hasVisited', false);
        hasVisited = false;
    }else {
        console.log('Welcome back, visitor!');
        localStorage.setItem('hasVisited', true);
        hasVisited = true;
    }

    fetch(`${config.API_URL}/update_table`, { // Replace with your actual POST endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hasVisited) // Send the data as JSON
        
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const visitCount = data.total_visits;
        document.getElementById('visit-count').textContent = visitCount;
    })
    .then(jsonResponse => {
        console.log('Data sent successfully:', jsonResponse);
        console.log('updated visit-count')

    })
    .catch(error => {
        console.error('Error: ', error);
    });
    console.log(hasVisited);
}
sendVisitData();