#!/usr/bin/env npx tsx
/* eslint-disable no-console */

/** A simple CLI script to run development tasks. */

// look for tasks with the pattern "UI: {tag} - {description}" in a comment block near the top of the file

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

const tasksDir = path.resolve('./.scripts/tasks');

const tasks: { [key: string]: { description: string; filePath: string } } = {};

fs.readdirSync(tasksDir).forEach((file) => {
    if (file.endsWith('.ts')) {
        const filePath = path.join(tasksDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const match = content.match(/UI:\s*(\S+)\s*-\s*(.+)/);
        if (match) {
            const [, tag, description] = match;
            tasks[tag] = { description, filePath };
        }
    }
});

const [taskTag, ...args] = process.argv.slice(2);

function runTask(taskKey?: string) {
    const task = taskKey && tasks[taskKey];
    if (!task) return;

    console.log(`Running task: ${taskKey} - ${task.description}`);
    try {
        execSync(`npx tsx ${task.filePath} ${args.join(' ')}`, { stdio: 'inherit' });
        process.exit(0);
    } catch (error) {
        console.error(`Task "${taskKey}" failed:`, error);
        process.exit(1);
    }
}

runTask(taskTag);
// List available tasks if no valid task is provided make it a arrow navigable menu

async function createArrowKeyMenu() {
    const questions = [
        {
            type: 'list',
            name: 'selectedOption',
            message: 'Choose an task:',
            choices: [
                ...Object.keys(tasks),
                new inquirer.Separator(), // Optional separator
                'Exit',
            ],
        },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const answers = await inquirer.prompt(questions as any);
    console.log('You selected:', answers.selectedOption);
    runTask(answers.selectedOption);

    if (answers.selectedOption === 'Exit') {
        process.exit(); // Exit the process if 'Exit' is chosen
    }
    // You can add logic here based on the selected option
}

createArrowKeyMenu();
