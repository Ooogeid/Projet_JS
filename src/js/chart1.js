let myChart;
// Variable globale pour stocker les données une fois récupérées
let globalData = null;

function updateCountryOptions(selectedContinent) {
    const countrySelect = document.getElementById('country');
    countrySelect.innerHTML = '';
    let countries = [];
    if (selectedContinent === 'Europe') {
        countries = [
            { value: 'France', title: 'France' },
            { value: 'Germany', title: 'Allemagne' },
            { value: 'United Kingdom of Great Britain and Northern Ireland', title: 'Royaume-Uni' },
            { value: 'Portugal', title: 'Portugal' },
            { value: 'Switzerland', title: 'Suisse' },
            { value: 'Netherlands', title: 'Pays-Bas' },
            { value: 'Belgium', title: 'Belgique' },
            { value: 'Spain', title: 'Espagne' },
            { value: 'Italy', title: 'Italie' },
            { value: 'Poland', title: 'Pologne' }
        ];
    } else if (selectedContinent === 'Amérique du Nord') {
        countries = [
            { value: 'United States of America', title: 'États-Unis' },
            { value: 'Canada', title: 'Canada' }
        ];
    }

    countries.forEach(function (country) {
        const option = document.createElement('option');
        option.text = country.title;
        option.value = country.value;
        countrySelect.appendChild(option);
    });

    // Mettre à jour les graphiques avec les nouvelles données sélectionnées
    updateCharts();
}

// Fonction pour convertir le salaire en euros
function convertToEuros(salary, currency) {
    // Convertir le code de devise en majuscules et supprimer les espaces inutiles
    const upperCaseCurrency = currency.toUpperCase().trim();

    // Vérifier si le code de devise est "NA" ou vide
    if (upperCaseCurrency === "NA" || upperCaseCurrency === "") {
        // Gérer le cas spécial (peut-être fournir une valeur par défaut ou signaler une erreur)
        console.error("Code de devise non valide :", currency);
        return salary;
    }

    // Vérifier si le code de devise est trouvé dans le taux de change
    const matchingCurrency = Object.keys(exchange_rate).find(key => upperCaseCurrency.includes(key));

    if (matchingCurrency) {
        const exchangeRate = exchange_rate[matchingCurrency];
        return Math.round(salary / exchangeRate);
    } else {
        // Gérer le cas où le code de devise n'est pas trouvé dans le taux de change
        console.error("Taux de change non trouvé pour la devise :", currency);
        return salary;
    }
}

function updateCharts() {
    const selectedContinent = document.getElementById('continent').value;
    const selectedCountry = document.getElementById('country').value;
    const selectedExperience = document.getElementById('experienceSelect').value;
    const selectedDevType = document.getElementById('devTypeSelect').value;
    const topCount = document.getElementById('topCountSelect').value;
    loadData(selectedContinent, selectedCountry, selectedExperience, selectedDevType, topCount);
}


function loadData(selectedContinent, selectedCountry, selectedExperience, selectedDevType, topCount) {
    let dataUrl;

    if (selectedContinent == "Europe") {
        dataUrl = dataWE;
    } else if (selectedContinent == "Amérique du Nord") {
        dataUrl = dataNA;
    } else {
        console.error("Continent non pris en charge");
        return;
    }

    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            // Stocker les données pour une utilisation ultérieure
            globalData = data;
            // Utiliser les données fraîchement chargées
            processData(data, selectedCountry);
            processData2(data, selectedCountry);
            processData3(data, selectedExperience, selectedCountry);
            processData4(data, selectedExperience, selectedCountry);
            processData5(data, selectedDevType, topCount, selectedCountry);
            processData6(data, selectedDevType, topCount, selectedCountry);
        })
        .catch(error => {
            console.error("Erreur lors du chargement des données:", error);
        });
}


function processData(data, selectedCountry) {
    // console.log(data);
    const filteredData = data.filter(entry =>
        entry.MainBranch === "I am a developer by profession" &&
        entry.Currency !== 'NA' &&
        entry.Country === selectedCountry
    );
    const experienceSalariesMap = new Map();

    filteredData.forEach(entry => {
        const experience = entry.YearsCodePro;
        const ageRange = calculateAgeRange(experience);

        if (!experienceSalariesMap.has(ageRange)) {
            experienceSalariesMap.set(ageRange, []);
        }

        const convertedSalary = convertToEuros(parseInt(entry.CompTotal) || 0, entry.Currency);
        experienceSalariesMap.get(ageRange).push(convertedSalary);
    });

    const averageSalariesByExperience = [];
    
    experienceSalariesMap.forEach((salaries, ageRange) => {
        const nonZeroSalaries = salaries.filter(salary => salary !== 0);

        if (nonZeroSalaries.length > 0) {
            // Supprimer 5% des valeurs extrêmes
            const sortedSalaries = nonZeroSalaries.sort((a, b) => a - b);
            const numToRemove = Math.ceil(0.05 * sortedSalaries.length);
            const trimmedSalaries = sortedSalaries.slice(numToRemove, sortedSalaries.length - numToRemove);
    
            const averageSalary = Math.round((trimmedSalaries.reduce((a, b) => a + b, 0) / trimmedSalaries.length) / 12);
            averageSalariesByExperience.push({
                ageRange,
                averageSalary
            });
        }
    });

    // trier les données par tranche d'âge
    averageSalariesByExperience.sort((a, b) => a.ageRange - b.ageRange);
    // Créer l'histogramme
    createHistogram1(
        averageSalariesByExperience.map(item => getAgeLabel(item.ageRange)),
        averageSalariesByExperience.map(item => item.averageSalary)
    );

    
}

function calculateAgeRange(experience) {
    if (experience === "Less than 1 year") {
        return 0;
    }
    const experienceRange = experience.split('-').map(Number).reduce((a, b) => a + b);
    if (experienceRange <= 5) {
        return 0;
    } else if (experienceRange <= 10) {
        return 5;
    } else if (experienceRange <= 20) {
        return 10;
    } else {
        return 20;
    }
}


// Permet de renvoyer les tranches d'ages dans le chart
function getAgeLabel(ageRange) {
    switch (ageRange) {
        case 0:
            return '0-5';
        case 5:
            return '5-10';
        case 10:
            return '10-20';
        case 20:
            return '20+';
        default:
            return '';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateCharts();
});