function processData4(data, selectedExperience, selectedCountry) {
  const filteredData = data.filter(entry =>
    entry.MainBranch === "I am a developer by profession" &&
    isYearsCodeProInRange(entry.YearsCodePro, selectedExperience) &&
    entry.Country === selectedCountry
  );  
    
  const webFrameworks = new Map();

  filteredData.forEach(entry => {
    const frameworks = entry.WebframeHaveWorkedWith.split(';');
    const convertedSalary = convertToEuros(parseInt(entry.CompTotal) || 0, entry.Currency);

    frameworks.forEach(framework => {
      if (!webFrameworks.has(framework)) {
        webFrameworks.set(framework, []);
      }

      webFrameworks.get(framework).push(convertedSalary);
    });
  });

  const averageIncomeByFramework = [];

  webFrameworks.forEach((salaries, framework) => {
    const nonZeroSalaries = salaries.filter(salary => salary !== 0);

    if (nonZeroSalaries.length > 0) {
      const averageSalary = Math.round((nonZeroSalaries.reduce((a, b) => a + b, 0) / nonZeroSalaries.length) / 12);
      averageIncomeByFramework.push({
        framework,
        averageSalary
      });
    }
  });

  // Tri des données par revenu moyen (ordre décroissant)
  averageIncomeByFramework.sort((a, b) => {
    return b.averageSalary - a.averageSalary;
  });

  createFrameworkChart(
    averageIncomeByFramework.map(item => item.framework),
    averageIncomeByFramework.map(item => item.averageSalary)
  );
}