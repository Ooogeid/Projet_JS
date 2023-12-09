
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

    // trier les données par salaire croissant
    averageSalariesByEducation.sort((a, b) => {
        return a.averageSalary - b.averageSalary;
    });

    createHistogram2(
        averageSalariesByEducation.map(item => getEducationLabel(item.educationLevel)),
        averageSalariesByEducation.map(item => item.averageSalary)
    );
}

function getEducationLabel(educationLevel) {
    const shortenedLabel = educationLevel.replace(/\s*\(.*?\)\s*/g, "");
    return shortenedLabel;
}
