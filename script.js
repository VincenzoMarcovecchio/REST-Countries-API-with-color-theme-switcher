//TODOS:
//Api call
//Theme Toggle
//Search
//Filter
//Modal

const countriesEl = document.getElementById("countries");

const toggleBtn = document.getElementById("toggle");

const filterBtn = document.getElementById("filter");

const regionFilters = filterBtn.querySelectorAll("li");

const searchEl = document.getElementById("search");

const modal = document.getElementById("modal");

const closeBtn = document.getElementById("close");

getCountries();

async function getCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");

  const countries = await res.json();

  displayCountries(countries);
}

function displayCountries(countries) {
  countriesEl.innerHTML = "";

  countries.forEach(country => {
    const countryEl = document.createElement("div");
    countryEl.classList.add("card");

    countryEl.innerHTML = `       
     <div>
        <img src="${country.flag}" alt="Nation Flag" />
        </div>
        <div class="card-body">
          <h3 class="country-name">${country.name}</h3>
          <p>
            <strong>Population:</strong>
            ${country.population}
          </p>
          <p class="country-region">
            <strong>Region:</strong>
            ${country.region}
          </p>
          <p>
            <strong>Capital:</strong>
            ${country.capital}
          </p>
        </div>
    `;

    //Show Modal
    countryEl.addEventListener("click", () => {
      modal.style.display = "flex";
      showCountryDetails(country);
    });

    countriesEl.appendChild(countryEl);
  });
}

function showCountryDetails(country) {
  const modalImg = modal.querySelector("img");
  modalImg.src = country.flag;
  const modalBody = modal.querySelector(".modal-body");
  modalBody.innerHTML = `


  <div class="left-on-desktop">
          <h2 class="modal-country">
          ${country.name}
          </h2>
          <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
          </p>
          <p>
            <strong>Population:</strong>
            ${country.population}
          </p>
           <p>
            <strong>Region:</strong>
            ${country.region}
          </p>
          <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
          </p>
          <p>
            <strong>Capital:</strong>
            ${country.capital}
          </p>
          </div>

          <div class="right-on-desktop">
          <p>
            <strong>Level Domain:</strong>
            ${country.topLevelDomain[0]}
          </p>
          <p>
            <strong>Currencies:</strong>
            ${country.currencies.map(currency => currency.code)}
          </p>
          <p>
            <strong>Languages:</strong>
            ${country.languages.map(language => language.name)}
          </p>
         </div>
         <p class="border-countries">
         <strong> Border Countries: </strong>
          ${country.borders}
  </p>
  `;
}
/*
const countryBorderFullNmae = forEach((border) => {
  let border = country.borders ;

 )} */

//toggle theme dark and light
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

//close the modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

//show and hide the filters (li tags)
filterBtn.addEventListener("click", () => {
  filterBtn.classList.toggle("open");
});

searchEl.addEventListener("input", e => {
  const { value } = e.target;
  const countryName = document.querySelectorAll(".country-name");
  countryName.forEach(name => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      // .card => .card-body => .country-name
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

//add filter on li's inside dropdown
regionFilters.forEach(filter => {
  filter.addEventListener("click", () => {
    const value = filter.innerText;

    const countryRegion = document.querySelectorAll(".country-region");

    countryRegion.forEach(region => {
      if (region.innerText.includes(value) || value === "All") {
        // .card => .card-body => .country-name
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
