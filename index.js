import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import express from 'express';
import { z } from 'zod';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';
import { DynamicStructuredTool } from '@langchain/core/tools';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Model LLM
const model = new ChatGoogleGenerativeAI({
  model: "models/gemini-2.5-flash",
  maxOutputTokens: 2048,
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

// Custom Tool
const getMenuTool = new DynamicStructuredTool({
  name: "getMenu",
  description:
    "Returns the final answer for today's menu for the given category (breakfast, lunch, or dinner).",
  schema: z.object({
    category: z.string().describe("Type of food. Example: breakfast, lunch, dinner"),
  }),
  func: async ({ category }) => {
    const menus = {
      breakfast: "Aloo Paratha, Poha, Masala Chai",
      lunch: "Paneer Butter Masala, Dal Fry, Jeera Rice, Roti",
      dinner: "Veg Biryani, Raita, Salad, Gulab Jamun",
    };
    return menus[category.toLowerCase()] || "No menu found for that category.";
  },
});

// Prompt
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant that uses tools when needed."],
  ["human", "{input}"],
  ["ai", "{agent_scratchpad}"],
]);

// ✅ Global executor (fix)
let executor;

// Agent/Executor initialization in async wrapper
async function initAgent() {
  const agent = await createToolCallingAgent({
    llm: model,
    tools: [getMenuTool],
    prompt,
  });

  executor = await AgentExecutor.fromAgentAndTools({
    agent,
    tools: [getMenuTool],
    verbose: true,
    maxIterations: 1,
    returnIntermediateSteps: true,
  });

  // Example route to test agent
  app.post("/ask", async (req, res) => {
    try {
      const { input } = req.body;
      const result = await executor.invoke({ input });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
}

aapp.post("/api/chat", async (req, res) => {
  const userInput = req.body.input;
  console.log('userInput : ', userInput);
  try {
  const response = await executor.invoke({ input: userInput });
  console.log('Response : ', response);
  res.json({ output: response.output });
  } catch (err) {
  console.error(err);
  res.status(500).json({ output: "Sorry, something went wrong. Please try again." });
  }
  });
initAgent();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started at Port : ${process.env.PORT}`);
});
