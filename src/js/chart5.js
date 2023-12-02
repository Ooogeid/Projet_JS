function processData5(data, selectedDevType, topCount) {
    const filteredData = data.filter(entry =>
      entry.MainBranch === "I am a developer by profession" &&
      (selectedDevType === "All" || entry.DevType.includes(selectedDevType))
    );
  
    const osUsage = new Map();
    
    filteredData.forEach(entry => {
      const osList = entry.OpSysProfessionaluse.split(';');
  
      osList.forEach(os => {
        const trimmedOS = os.trim();
        if (trimmedOS !== '') {
          if (!osUsage.has(trimmedOS)) {
            osUsage.set(trimmedOS, 0);
          }
          osUsage.set(trimmedOS, osUsage.get(trimmedOS) + 1);
        }
      });
    });
    
    // Convertir la Map en tableau d'objets
    const osUsageArray = Array.from(osUsage, ([os, count]) => ({ os, count }));

    // Tri des données par nombre d'utilisation (ordre décroissant)
    osUsageArray.sort((a, b) => b.count - a.count);

    // Sélectionner le nombre de systèmes d'exploitation à afficher
    const topOS = osUsageArray.slice(0, topCount);
    
    createMyOSChart(
      topOS.map(item => item.os),
      topOS.map(item => item.count)
    );

}
