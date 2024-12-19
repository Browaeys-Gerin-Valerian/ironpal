export function convertSecondsToRest(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (remainingSeconds === 0) {
        return `${minutes}'`; // Si pas de secondes, retourne uniquement les minutes
    }

    return `${minutes}'${remainingSeconds}s`; // Sinon, inclut minutes et secondes
}


export function getAgeFromBirthdate(birthdate: Date) {
    const birthDate = new Date(birthdate);
    const today = new Date();

    // Calculer la différence d'années
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // Vérifier si l'anniversaire est déjà passé cette année
    if (
        month < birthDate.getMonth() ||
        (month === birthDate.getMonth() && day < birthDate.getDate())
    ) {
        age--; // Si l'anniversaire n'est pas encore passé, réduire l'âge de 1
    }

    return age;
};