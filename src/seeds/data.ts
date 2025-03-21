const names = [
    'John',
    'Aaron',
    'Clark',
    'Jill',
    'James',
    'Zhong',
    'Parker',
    'Jocelyn',
    'Grace',
    'Kelsey',
    'Mark',
];

const thoughts = [
    'I love to code!',
    'I am a full-stack developer!',
    'I am a software engineer!',
    'I am a software developer!',
    'I am a web developer!',
    'I am a front-end developer!',
    'I am a back-end developer!',
    'I am a junior developer!',
    'I am a senior developer!',
    'I am a lead developer!',
    'I am a principal developer!',
];

const domains = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'example.com',
];

const reactions = [
    '👍',
    '❤️',
    '😂',
    '😮',
    '😢',
    '👏',
    '🔥',
    '🎉',
];

export const getRandomArrItem = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomName = () =>
    `${getRandomArrItem(names)}`;

export const getRandomEmail = (name: string) => {
    const domain = getRandomArrItem(domains);
    const sanitizedName = name.toLowerCase().replace(/\s+/g, '');
    return `${sanitizedName}@${domain}`;
};

export const getRandomThought = () => {
    return getRandomArrItem(thoughts);
};

export const getRandomReactions = (numReactions: number) => {
    const randomReactions = [];
    for (let i = 0; i < numReactions; i++) {
        randomReactions.push(getRandomArrItem(reactions));
    }
    return randomReactions;
};

// Function to seed data
export const seedData = () => {
    const users = [];
    const thoughtsData = [];

    for (let i = 0; i < 10; i++) {
        const name = getRandomName();
        const email = getRandomEmail(name);
        const username = name.toLowerCase().replace(/\s+/g, '');
        users.push({ name, email, username });

        const thought = getRandomThought();
        const thoughtReactions = getRandomReactions(Math.floor(Math.random() * 5) + 1); // 1-5 reactions
        thoughtsData.push({ thought, reactions: thoughtReactions, username });
    }

    console.log('Seeded Users:', users);
    console.log('Seeded Thoughts:', thoughtsData);
};

// Call the seedData function to generate and log the data
seedData();