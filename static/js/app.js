// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Update filters based on filter-btn event listener
function updateFilters() {
    let filters = {
      datetime:null
      , city:null
      , state:null
      , country:null
      , shape:null
    };

    Object.keys(filters).forEach((key) => {
      filterValue = d3.select('#'.concat(key)).property("value");
      // If a filter value is entered then add to filters object
      if(filterValue) {
        filters[key] = filterValue.toLowerCase();
      }
      else {
        delete filters[key];
      }
    });

    // Call function to apply all filters and rebuild the table
    filterTable(filters);
}

function filterTable(filters) {
    // Set the filteredData to the tableData
    let filteredData = tableData;

    // Loop through all of the filters and keep any data that matches the filter values
    Object.keys(filters).forEach((key) => {
      if(filters[key]) {
        filteredData = filteredData.filter(row => row[key] === filters[key]);
      }
    });
    // Finally, rebuild the table using the filtered Data
    buildTable(filteredData);
  }

d3.selectAll("input").on("change", updateFilters);
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);
