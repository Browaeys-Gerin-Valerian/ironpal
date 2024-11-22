export function convertSecondsToRest(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (remainingSeconds === 0) {
        return `${minutes}'`; // Si pas de secondes, retourne uniquement les minutes
    }

    return `${minutes}'${remainingSeconds}s`; // Sinon, inclut minutes et secondes
}