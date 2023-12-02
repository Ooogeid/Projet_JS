updateCountryOptions(document.getElementById('continent').value);

function processData2(data, selectedCountry) {
    
    const filteredData = data.filter(entry =>
        entry.MainBranch === "I am a developer by profession" &&
        entry.Currency !== 'NA' &&
        entry.Country === selectedCountry
    );
    const educationSalariesMap = new Map();
  
    filteredData.forEach(entry => {
        const educationLevel = entry.EdLevel;
  
        if (!educationSalariesMap.has(educationLevel)) {
        educationSalariesMap.set(educationLevel, []);
        }
  
        const convertedSalary = convertToEuros(parseInt(entry.CompTotal) || 0, entry.Currency);
        educationSalariesMap.get(educationLevel).push(convertedSalary);
    });
  
    const averageSalariesByEducation = [];
  
    educationSalariesMap.forEach((salaries, educationLevel) => {
        const nonZeroSalaries = salaries.filter(salary => salary !== 0);
  
        if (nonZeroSalaries.length > 0) {
            // Supprimer 5% des valeurs extrêmes
            const sortedSalaries = nonZeroSalaries.sort((a, b) => a - b);
            const numToRemove = Math.ceil(0.05 * sortedSalaries.length);
            const trimmedSalaries = sortedSalaries.slice(numToRemove, sortedSalaries.length - numToRemove);

            const averageSalary = Math.round((trimmedSalaries.reduce((a, b) => a + b, 0) / trimmedSalaries.length) / 12);
            averageSalariesByEducation.push({
                educationLevel,
                averageSalary
            });
        }
    });
    console.log(averageSalariesByEducation)
    // Trier les données par niveau d'éducation
    averageSalariesByEducation.sort((a, b) => {
        const educationOrder = ['No formal education', 'Primary/elementary school', 'Secondary school', 'Some college/university study without earning a degree', 
        'Associate degree', 'Bachelor’s degree', 'Professional degree', 'Master’s degree', 
        'Other doctoral degree', 'Doctoral degree'];

        return educationOrder.indexOf(a.educationLevel) - educationOrder.indexOf(b.educationLevel);
    });

    createHistogram2(
        averageSalariesByEducation.map(item => getEducationLabel(item.educationLevel)),
        averageSalariesByEducation.map(item => item.averageSalary)
    );
}

function getEducationLabel(educationLevel) {
    return educationLevel;
}

updateCharts();