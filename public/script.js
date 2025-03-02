document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.style.display = (navLinks.style.display === 'block') ? 'none' : 'block';
});

async function loadPredictions(type) {
    const response = await fetch('predictions.json');
    const data = await response.json();
    const filteredData = data.filter(item => item.type === type);
    
    const tableBody = document.querySelector("#predictions-table tbody");
    tableBody.innerHTML = "";
    
    filteredData.forEach(prediction => {
        const row = `<tr>
                        <td>${prediction.date}</td>
                        <td>${prediction.match}</td>
                        <td>${prediction.odds}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    });
}

async function loadFantasy() {
    const response = await fetch('fantasy.js');
    const data = await response.json();

    const tableBody = document.querySelector("#predictions-table tbody");
    tableBody.innerHTML = "";
    
    data.forEach(prediction => {
        const row = `<tr>
                        <td>${prediction.date}</td>
                        <td>${prediction.match}</td>
                        <td>${prediction.odds}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    });
}

async function loadFooter() {
    const pages = ['contact.html', 'terms.html', 'privacy.html'];
    const footer = document.getElementById('footer');

    for (const page of pages) {
        const response = await fetch(page);
        const text = await response.text();
        const div = document.createElement('div');
        div.innerHTML = text;
        footer.appendChild(div);
    }
}

loadFooter();
