const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Note: listModels is not directly available on genAI instance in some versions, 
        // but let's try to see if we can get it or just test a few common ones.
        // Actually, the error message said: "Call ListModels to see the list of available models"
        // This implies there is a way.
        // In the node SDK, it might be different.
        // Let's try to just run a simple generation with a known model "gemini-1.0-pro" which is very standard.

        console.log("Testing gemini-1.0-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.0-pro");
        console.log(result.response.text());

    } catch (err) {
        console.error("Error:", err.message);
    }
}

listModels();
