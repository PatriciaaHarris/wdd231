const urlParams = new URLSearchParams(window.location.search);

const first = urlParams.get('first');
const last = urlParams.get('last');
const phone = urlParams.get('phone');
const email = urlParams.get('email');
const ordinance = urlParams.get('ordinance');
const date = urlParams.get('date');
const templeLocation = urlParams.get('location');

document.querySelector('#results').innerHTML = `
    <p>First Name: ${first}</p>
    <p>Last Name: ${last}</p>
    <p>Phone: ${phone}</p>
    <p>Email: ${email}</p>
    <p>Ordinance: ${ordinance}</p>
    <p>Date: ${date}</p>
    <p>Location: ${templeLocation}</p>
`;
