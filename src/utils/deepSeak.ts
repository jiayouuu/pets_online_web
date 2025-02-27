import OpenAI from 'openai';


const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-5dea5f300fd04ca49b50bfdcd4dc0860'
});

async function main() {
const completion = await openai.chat.completions.create({
messages: [{ role: "system", content: "You are a helpful assistant." }],
model: "deepseek-chat",
});

console.log(completion.choices[0].message.content);
}

main();