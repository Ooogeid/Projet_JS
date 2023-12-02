function processData3(data, selectedExperience, selectedCountry) {
    const filteredData = data.filter(entry =>
        entry.MainBranch === "I am a developer by profession" &&
        isYearsCodeProInRange(entry.YearsCodePro, selectedExperience) &&
        entry.Country === selectedCountry
    );

    const cloudPlatforms = new Map();

    filteredData.forEach(entry => {
        const platforms = entry.PlatformHaveWorkedWith.split(";");
        const convertedSalary = convertToEuros(parseInt(entry.CompTotal) || 0, entry.Currency);

        platforms.forEach(platform => {
            if (!cloudPlatforms.has(platform)) {
                cloudPlatforms.set(platform, []);
            }

            cloudPlatforms.get(platform).push(convertedSalary);
        });
    });

    const averageIncomeByPlatform = [];

    cloudPlatforms.forEach((salaries, platform) => {
        const nonZeroSalaries = salaries.filter(salary => salary !== 0);

        if (nonZeroSalaries.length > 0) {
            const averageSalary = Math.round((nonZeroSalaries.reduce((a, b) => a + b, 0) / nonZeroSalaries.length) / 12);
            averageIncomeByPlatform.push({
                platform,
                averageSalary
            });
        }
    });

    // Tri des données par revenu moyen (ordre décroissant)
    averageIncomeByPlatform.sort((a, b) => {
        return b.averageSalary - a.averageSalary;
    });
    console.log(averageIncomeByPlatform);
    createBarChart(
        averageIncomeByPlatform.map(item => item.platform),
        averageIncomeByPlatform.map(item => item.averageSalary)
    );
}

function isYearsCodeProInRange(yearsCodePro, selectedExperience) {
    if (selectedExperience === "0-5") {
        return yearsCodePro >= 0 && yearsCodePro <= 5;
    } else if (selectedExperience === "5-10") {
        return yearsCodePro >= 5 && yearsCodePro <= 10;
    } else if (selectedExperience === "10-20") {
        return yearsCodePro >= 10 && yearsCodePro <= 20;
    } else if (selectedExperience === "20+") {
        return yearsCodePro >= 20;
    } else {
        return false;
    }
}

updateCharts();