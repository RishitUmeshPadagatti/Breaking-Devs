import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import Anthropic from "@anthropic-ai/sdk";
import { BASE_PROMPT, getSystemPrompt } from './prompts';
import { TextBlock } from '@anthropic-ai/sdk/resources';
import { basePrompt as nodeBasePrompt } from './defaults/node';
import { basePrompt as reactBasePrompt } from './defaults/react';
import cors from "cors"
import OpenAI from 'openai';
import { tempResponse } from './temp';

const anthropic = new Anthropic();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(cors())
app.use(express.json())

app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;

    const response = await anthropic.messages.create({
        messages: [{
            role: 'user', content: prompt
        }],
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 200,
        system: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
    })

    const answer = (response.content[0] as TextBlock).text; // 'react' or 'node'
    if (answer == "react") {
        res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        })
        return;
    }

    if (answer === "node") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        })
        return;
    }

    res.status(403).json({message: "You cant access this"});
    return;
})


// const blockedKeywords = ["porn", "gambling", "casino", "betting", "sex", "nude", "xxx", "drugs"];
// app.post("/template", async (req, res) => {
//     const prompt: string = req.body.prompt;

//     if (blockedKeywords.some(keyword => prompt.toLowerCase().includes(keyword))) {
//         res.status(400).json({ message: "Explicit content is not allowed." });
//         return;
//     }

//     const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//             { role: "system", content: "Return either node or react based on what you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra." },
//             { role: "user", content: prompt }
//         ],
//         max_tokens: 10
//     });

//     const answer: string = response.choices[0]?.message?.content?.trim().toLowerCase() ?? ''; // 'react' or 'node'

//     if (answer === "react") {
//         res.json({
//             prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
//             uiPrompts: [reactBasePrompt],
//             react: true
//         });
//         return;
//     }

//     if (answer === "node") {
//         res.json({
//             prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
//             uiPrompts: [nodeBasePrompt],
//             node: true
//         });
//         return;
//     }

//     res.status(403).json({ message: "You can't access this" });
//     return;
// });


app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    const response = await anthropic.messages.create({
        messages: messages,
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 8000,
        system: getSystemPrompt()
    })

    console.log(response)

    res.json({
        response: (response.content[0] as TextBlock)?.text
    })
})

// app.post("/chat", async (req, res) => {
//     const messages = req.body.messages;
//     const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: messages,
//         max_tokens: 8000,
//         temperature: 0.4
//     });
//     console.log(response)
//     res.json({
//         response: response.choices[0]?.message?.content?.trim() || ""
//     });
// })

// app.post("/chat", async (req, res) => {
//     const messages = req.body.messages;
//     const response = tempResponse

//     res.json({
//         response: (response.content[0] as TextBlock)?.text
//     })
// })

app.listen(3000);