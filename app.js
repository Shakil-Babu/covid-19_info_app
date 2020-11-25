

 



$(document).ready(function() {
  var summary;

fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
      summary = data;
      populateTable(data);
    })
    .catch(err => console.log(err))

  function populateTable(data) {
    var tbody = document.querySelector('#tbody');
    tbody.innerHTML = `
   <tr>
<td>${data.Global.NewConfirmed}</td>
<td>${data.Global.TotalConfirmed}</td>
<td>${data.Global.TotalDeaths}</td>
<td>${data.Global.TotalRecovered}</td>
   </tr>
   `;
    var countries = data.Countries;
    let content = '';
    for (var i = 0; i < countries.length; i++) {
      content += `<tr>
        <td class='bg-primary text-light '>${countries[i].Country}</td>
        <td>${countries[i].NewConfirmed}</td>
        <td>${countries[i].NewDeaths}</td>
        <td>${countries[i].NewRecovered}</td>
        <td>${countries[i].TotalConfirmed }</td>
        <td>${countries[i].TotalRecovered}</td>
        <td>${countries[i].TotalDeaths}</td>
           </tr>`;
    }
    $('#all_covid_data').html(content);
  }

  // searching or filtering data from table
  var tableRow = document.getElementById('all_covid_data');
  var inputField = document.getElementById('searchBox');

  $("#search_btn").click(() => {
    var filteredData = JSON.parse(JSON.stringify(summary));
    filteredData.Countries = filteredData.Countries.filter(c => c.Country.toLowerCase().includes(inputField.value.toLowerCase()));
    if (filteredData.Countries.length > 0) {
      $('#all_covid_data').html('');
      populateTable(filteredData);
    } else {
      alert('Country not found');
    }
  });


})