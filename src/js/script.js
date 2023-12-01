
let myChart;


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

function loadData(selectedContinent, selectedCountry, dataUrl) {
    console.log(selectedContinent, selectedCountry, dataUrl);
    if (selectedContinent == "Europe") {
        dataUrl = "http://localhost/R5.04/Projet_JS/data" + "/survey_results_WE.json";
    } else if (selectedContinent == "Amérique du Nord") {
        dataUrl = "http://localhost/R5.04/Projet_JS/data" + "/survey_results_NA.json";
    } else {
        console.error("Continent non pris en charge");
        return;
    }

    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            processData(data, selectedCountry);
        })
        .catch(error => {
            console.error("Erreur lors du chargement des données:", error);
        });
}

function processData(data, selectedCountry) {
    const filteredData = data.filter(entry =>
        entry.MainBranch === "I am a developer by profession" &&
        entry.Currency !== 'NA' &&
        entry.YearsCodePro > 0 &&
        entry.Country === selectedCountry
    );
    console.log(filteredData);
    const experienceSalariesMap = new Map();

    filteredData.forEach(entry => {
        const experience = entry.YearsCodePro;
        if (!experienceSalariesMap.has(experience)) {
            experienceSalariesMap.set(experience, []);
        }

        const convertedSalary = convertToEuros(parseInt(entry.CompTotal) || 0, entry.Currency);
        experienceSalariesMap.get(experience).push(convertedSalary);
    });

    const averageSalariesByExperience = [];
    experienceSalariesMap.forEach((salaries, experience) => {
        const nonZeroSalaries = salaries.filter(salary => salary !== 0);
        if (nonZeroSalaries.length > 0) {
            const sortedSalaries = nonZeroSalaries.sort((a, b) => a - b);
            const numToRemove = Math.ceil(0.05 * sortedSalaries.length);
            const trimmedSalaries = sortedSalaries.slice(numToRemove, sortedSalaries.length - numToRemove);
    
            const averageSalary = Math.round((trimmedSalaries.reduce((a, b) => a + b, 0) / trimmedSalaries.length) / 12);
    
            averageSalariesByExperience.push({
                experience: parseExperience(experience),
                averageSalary: averageSalary
            });
        }
    });

    averageSalariesByExperience.sort((a, b) => a.experience - b.experience);

    const chartCanvas = document.getElementById('chart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: averageSalariesByExperience.map(item => item.experience),
                datasets: [
                    {
                        label: 'Salaire moyen',
                        data: averageSalariesByExperience.map(item => item.averageSalary),
                        fill: false,
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tranche d\'expérience (années)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Salaire moyen en euros'
                        }
                    }
                }
            }
        });
    } else {
        console.error("Canvas non trouvé. Impossible de créer le graphique.");
    }
}

function parseExperience(experience) {
    const experienceRange = experience.split('-').map(Number);
    return experienceRange.reduce((a, b) => a + b) / experienceRange.length;
}
    