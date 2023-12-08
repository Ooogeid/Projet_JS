function chartNbParticipantsParPays(data){ 

    const participantsByCountry = new Map();

    data.forEach(entry => {
        const country = entry.country;
        const participants = entry.participants;

        if (!participantsByCountry.has(country)) {
            participantsByCountry.set(country, []);
        }

        participantsByCountry.get(country).push(participants);
    });

    const averageParticipantsByCountry = [];

    participantsByCountry.forEach((participants, country) => {
        const averageParticipants = Math.round(participants.reduce((a, b) => a + b, 0) / participants.length);
        averageParticipantsByCountry.push({
            country,
            averageParticipants
        });
    });

    // Tri des données par nombre moyen de participants (ordre décroissant)
    averageParticipantsByCountry.sort((a, b) => {
        return b.averageParticipants - a.averageParticipants;
    });

    createNbParticipantsParPays(
        averageParticipantsByCountry.map(item => item.country),
        averageParticipantsByCountry.map(item => item.averageParticipants)
    );
    
}
