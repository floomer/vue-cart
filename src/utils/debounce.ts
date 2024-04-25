export function debounce<T extends (...args: any[]) => void>(f: T, delay: number) {
    let timeoutID: number | undefined = undefined;
    return (...args: any[]) => {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => f(...args), delay)
    }
}