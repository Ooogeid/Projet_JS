function loadData(dataUrl) {
    // Chargement des données pour l'Amérique du Nord
    fetch(dataUrl + "/survey_results_NA.json")
      .then(response => response.json())
      .then(dataNA => {
        // Charger les données pour l'Europe de l'Ouest
        fetch(dataUrl + "/survey_results_WE.json")
          .then(response => response.json())
          .then(dataWE => {
            // Appeler la fonction pour traiter les données
            processData(dataNA, dataWE);
          })
          .catch(error => {
            console.error("Erreur lors du chargement des données pour l'Europe de l'Ouest:", error);
          });
      })
      .catch(error => {
        console.error("Erreur lors du chargement des données pour l'Amérique du Nord:", error);
      });
  }
  
  function processData(dataNA, dataWE) {
    // Filtrer les données pour les développeurs professionnels en Europe de l'Ouest
    const filteredDataWE = dataWE.filter(entry => entry.MainBranch === "I am a developer by profession");
  
    // Calculer l'âge moyen des développeurs en Europe de l'Ouest
    const agesWE = filteredDataWE.map(entry => entry.Age);
    const averageAgeWE = calculateAverage(agesWE);
  
    // Calculer le revenu moyen des développeurs en Europe de l'Ouest
    const incomesWE = filteredDataWE.map(entry => parseInt(entry.CompTotal) || 0);
    const averageIncomeWE = calculateAverage(incomesWE);
  
    // Afficher le graphique
    const chartCanvas = document.createElement('canvas');
    chartCanvas.setAttribute('id', 'chart');
    document.body.appendChild(chartCanvas);
  
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Moyenne d\'âge', 'Revenu moyen'],
        datasets: [
          {
            label: 'Europe de l\'Ouest',
            data: [averageAgeWE, averageIncomeWE],
            backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
            borderColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
function calculateAverage(values) {
    if (values.length === 0) {
        return 0;
    }

    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
    }
  
  // Charger les données en utilisant l'URL spécifiée
  const dataUrl = "../data";
  loadData(dataUrl);