function processData6(data, selectedDevType, topCount) {
    const filteredData = data.filter(entry =>
      entry.MainBranch === "I am a developer by profession" &&
      (selectedDevType === "All" || entry.DevType.includes(selectedDevType))
    );
  
    const communicationUsage = new Map();
  
    filteredData.forEach(entry => {
      const communicationList = entry.OfficeStackSyncHaveWorkedWith.split(';');
  
      communicationList.forEach(communication => {
        const trimmedCommunication = communication.trim();
        if (trimmedCommunication !== '') {
          if (!communicationUsage.has(trimmedCommunication)) {
            communicationUsage.set(trimmedCommunication, 0);
          }
          communicationUsage.set(trimmedCommunication, communicationUsage.get(trimmedCommunication) + 1);
        }
      });
    });
  
    // Convertir la Map en tableau d'objets
    const communicationUsageArray = Array.from(communicationUsage, ([communication, count]) => ({ communication, count }));
  
    // Tri des données par nombre d'utilisation (ordre décroissant)
    communicationUsageArray.sort((a, b) => b.count - a.count);
  
    // Sélectionner le nombre d'outils de communication à afficher
    const topCommunication = communicationUsageArray.slice(0, topCount);
  
    createCommunicationChart(
      topCommunication.map(item => item.communication),
      topCommunication.map(item => item.count)
    );
}