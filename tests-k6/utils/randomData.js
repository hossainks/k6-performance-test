
const books = ['Ocean', 'City', 'Forest', 'Mountain', 'Beach', 'Light', 'Night', 'Fire', 'Water', 'Sky', 'Dark', "Dream", "Shadow", "Journey", "Empire", "Secret"];

const authors = ['John', 'Jane', 'Mark', 'Emily', 'David', 'Sarah', 'Michael', 'Jessica', 'James', 'Olivia', 'William', 'Mia', "Liam", "Emma", "Noah", "Ava"];

function getElements(element) {
    return element[Math.floor(Math.random() * element.length)];
}

const getFullWords = (words = 2, items) => {
    let chossen = [];
    for (let i = 0; i < words; i++) {
        let word;
        do {
            word = getElements(items);
        } while (chossen.includes(word))
        chossen.push(word);
    }
    return chossen.join(' ');
}
const getYears = () => {
    return (Math.floor(Math.random() * (2025 - 1900))) + 1900;
}

export { getFullWords , getYears, books, authors };