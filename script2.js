let areaInput = document.getElementById('area');
let areaSelect = document.getElementById('areaSelect');
let typeSelect = document.getElementById('typeSelect');
let totalAmount = document.getElementById('totalamount');
let printvalue = document.getElementById('value');
let estamp = document.getElementById('estamp');
let ktax = document.getElementById('ktax');
let ctax = document.getElementById('ctax');
let filer = document.getElementById('filer');

let area;
let selectedType;
let selectedArea;
let data;

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from data.json
  fetch('./data2.json')
    .then(response => response.json())
    .then(dataResponse => {
      data = dataResponse; // Assign data to the global variable
      console.log(data)
      // Populate the area select
      const uniqueAreas = [...new Set(data.map(item => item.area))];
      populateSelect(areaSelect, uniqueAreas);

      // Populate the type select
      const uniqueTypes = [...new Set(data.map(item => item.type))];
      populateSelect(typeSelect, uniqueTypes);

      // Add event listener to the area select
      areaSelect.addEventListener('change', function () {
        selectedArea = areaSelect.value;
        updateTotalAmount();
      });

      // Add event listener to the type select
      typeSelect.addEventListener('change', function () {
        selectedType = typeSelect.value;
        updateTotalAmount();
      });

      // Add event listener to the area input
      areaInput.addEventListener('input', function () {
        area = parseFloat(areaInput.value) || 0;
        updateTotalAmount();
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

function populateSelect(selectElement, options) {
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });
}

function updateTotalAmount() {
  if (selectedArea && selectedType && data) {
    const selectedEntry = data.find(entry => entry.area === selectedArea && entry.type === selectedType);

    if (selectedEntry) {
      const totalvalue = selectedEntry.value.toFixed();
      printvalue.innerText = `Rs.${totalvalue}`;
      let valuation = totalvalue * area;
      totalAmount.innerText = `Rs.${valuation}`;
      estamp.innerText = `Rs.${valuation / 100}`;
      ktax.innerText = `Rs.${(valuation / 100) * 10.5}`;
      ctax.innerText = `Rs.${(valuation / 100) * 6}`;
      filer.innerText = `Rs.${(valuation / 100) * 3}`;
    } else {
      totalAmount.innerText = 'N/A';
    }
  } else {
    totalAmount.innerText = 'N/A';
  }
}
