export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


export async function getTrivia(){
    const response = await fetch("https://opentdb.com/api.php?amount=10.json");
    if(!response.ok) {
        
    }
    const data = await response.json();
    return data;
} 