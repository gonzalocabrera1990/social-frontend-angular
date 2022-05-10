export const  measure = (timestamp) => {
    let inicio = new Date(timestamp).getTime();
    let now = Date.now();
    let res = now - inicio;
    const hours = (Math.floor((res)/1000))/3600;
    return hours;
}