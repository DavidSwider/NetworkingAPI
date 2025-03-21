import { User, Thought } from '../models/index.js';
import db from '../config/Connection.js';
import cleanDB from './cleanDB.js';
import { getRandomName, getRandomThought, getRandomArrItem, getRandomEmail, getRandomReactions } from './data.js';

try {
    await db(); // Connect to the database
    await cleanDB(); // Clean the database
    console.log('problem.');
    // Seed users
    const users = [];
    const usedUsernames = new Set(); // Track unique usernames
    const usedEmails = new Set(); // Track unique emails
    console.log('problem1.');
    for (let i = 0; i < 20; i++) {
        let name = getRandomName();
        let username = name.toLowerCase().replace(/\s+/g, '');
        let counter = 1;

        // Ensure unique username
        while (usedUsernames.has(username)) {
            username = `${name.toLowerCase().replace(/\s+/g, '')}${counter}`;
            counter++;
        }

        usedUsernames.add(username); // Mark username as used

        // Ensure unique email
        let email = getRandomEmail(name);
        while (usedEmails.has(email)) {
            email = getRandomEmail(name); // Generate a new email if duplicate
        }

        usedEmails.add(email); // Mark email as used

        const user = new User({ name, email, username });
        console.log(`Generated user: ${JSON.stringify(user)}`);
        users.push(user);
    }
    console.log('problem3.');
    const userData = await User.create(users);
    console.log('Users seeded.');

    // Update or create users
    for (const user of users) {
        await User.findOneAndUpdate(
            { username: user.username }, // Use `username` instead of `name`
            { email: user.email }, // Update email
            { upsert: true, new: true } // Create if not found
        );
    }
    console.log('Users updated or created.');

    // Seed thoughts
    const thoughts = [];
    for (let i = 0; i < 20; i++) {
        const thoughtText = getRandomThought(); // Use `thoughtText` instead of `thought`
        const user = getRandomArrItem(userData); // Assign a random user for the thought
        const reactions = getRandomReactions(Math.floor(Math.random() * 8)).map((reaction) => ({
            reactionBody: reaction,
            username: getRandomArrItem(userData).username, // Assign a random username for each reaction
        })); // Format reactions as objects with `reactionBody` and `username`
        thoughts.push({ thoughtText, reactions, username: user.username }); // Include `username` and `thoughtText`
    }

    await Thought.create(thoughts);
    console.log('Thoughts seeded.');

    // Update or create thoughts
    for (const thought of thoughts) {
        await Thought.findOneAndUpdate(
            { thoughtText: thought.thoughtText }, // Find thought by content
            { $push: { reactions: { $each: thought.reactions } } }, // Add reactions
            { upsert: true, new: true } // Create if not found
        );
    }
    console.log('Thoughts updated or created.');

    // Close the database connection
    console.log('Seeding complete. Closing database connection.');
    const connection = await db(); // Get the database connection
    await connection.close(); // Close the connection
} catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1); // Exit with failure code
}

