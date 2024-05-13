export const printMovieDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const remainingMinutes = duration % 60;

    if (hours === 0) {
        return remainingMinutes === 0 ? "0 мин" : remainingMinutes + " мин";
    } else {
        return remainingMinutes === 0 ? hours + " ч" : hours + " ч " + remainingMinutes + " мин";
    }
}