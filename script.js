let amountid = document.getElementById('amount');
let areaInput = document.getElementById('area');
let totalAmount = document.getElementById('totalamount');
let estamp = document.getElementById('estamp');
let ktax = document.getElementById('ktax');
let ctax = document.getElementById('ctax');
let filer = document.getElementById('filer');
let amount;
let area;

document.addEventListener("DOMContentLoaded", function() {
  // Fetch data from data.json
  fetch('data.json')
      .then(response => response.json())
      .then(data => {
        // Sorting Data
        data.sort((a, b) => a.Deh.localeCompare(b.Deh));
          // Get the select element
          const selectElement = document.getElementById('dehSelect');

          // Iterate over the data and create an option element for each deh
          data.forEach(entry => {
              const optionElement = document.createElement('option');
              optionElement.value = entry.Deh;
              optionElement.textContent = entry.Deh;
              selectElement.appendChild(optionElement);
          });

          // Add event listener to the select element
          selectElement.addEventListener('change', function() {
              const selectedDeh = selectElement.value;
              const selectedEntry = data.find(entry => entry.Deh === selectedDeh);
              amount = selectedEntry.Ghunta;

              // Update the element displaying Ghunta value
              amountid.textContent = `Rs.${amount}`;

              // Update the total amount based on Ghunta and area
              updateTotalAmount();
          });

          // Add event listener to the area input
          areaInput.addEventListener('input', function() {
              area = parseFloat(areaInput.value) || 0;

              // Update the total amount based on Ghunta and area
              updateTotalAmount();
          });
      })
      .catch(error => console.error('Error fetching data:', error));
});

function updateTotalAmount() {
  totalvalue = amount * area;
  totalAmount.innerText = `Rs.${totalvalue}`;
  estamp.innerText = `Rs.${(totalvalue / 100) * 2}`;
  ktax.innerText = `Rs.${(totalvalue / 100 ) * 12}`;
  ctax.innerText = `Rs.${(totalvalue / 100) * 10}`;
  filer.innerText = `Rs.${(totalvalue / 100) * 3}`;
}
