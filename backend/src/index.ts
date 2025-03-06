import dotenv from 'dotenv';
dotenv.config();
import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from './prompts';

// const ANTHROPIC_API_KEY = process.env.CLAUDE_API_KEY;

const anthropic = new Anthropic();

async function main() {
    anthropic.messages.stream({
        messages: [{
            role: 'user', content: "Create a todo application"
        }],
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 1024,
        system: getSystemPrompt()
    }).on('text', (text) => {
        console.log(text);
    });
}

main()