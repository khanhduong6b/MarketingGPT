import {
  Configuration,
  OpenAIApi,
  CreateChatCompletionRequest,
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";
import * as dotenv from "dotenv";
import axios from "axios";
import TelegramBot = require("node-telegram-bot-api");
import invariant from "tiny-invariant";
import { isDataView } from "util/types";
import * as cron from "node-cron";
dotenv.config({ override: true });

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("OpenAI API key not found in environment variables.");
}

const configuration = new Configuration({
  apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

async function contentGPT(question: String) {
  const object: CreateChatCompletionRequest = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content:
          "Act as a Project marketing person for speaking people. I will provide you information about the project and you will only answer their questions and nothing else. The replies must relate to the information I provided. Do not write explanations in replies.",
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content:
          "\n\nProject Name: Defily.io\nProject Token: DFL (ERC-20)\nProject Purpose: Defily.io is a decentralized exchange protocol built on the Ethereum blockchain, designed to provide individual traders and institutional investors with a simple and efficient way to trade ERC-20 tokens directly from their wallets.\n\nKey Features:\n\nAutomated Market Maker (AMM): Defily.io utilizes an AMM model, eliminating the need for traditional order books. This ensures continuous liquidity and efficient token swaps.\nDecentralization: Defily.io operates in a fully decentralized manner, empowering users with direct control over their funds. All transactions occur directly on the Ethereum blockchain without intermediaries or centralized authorities.\nPermissionless: Defily.io offers an open and inclusive platform, enabling anyone to create or list tokens without gatekeepers or restrictions. This fosters a diverse ecosystem of tokens available for trading.\nEnhanced Security: Defily.io employs rigorous security measures, including smart contract audits and bug bounties, to ensure the safety of user funds and protect against potential vulnerabilities.\nDFL Token Utility: The DFL token serves as the native utility token within the Defily ecosystem. Holders may benefit from governance participation, staking rewards, fee discounts, or other utility features within the platform.\n\nAdditional Information: Defily.io introduced the concept of liquidity pools, allowing users to contribute tokens to provide liquidity and earn fees. It has gained significant popularity and played a pivotal role in driving the growth of decentralized finance (DeFi) on the Ethereum blockchain.\n\nRoadmap: Defily.io has an ambitious roadmap, including plans to expand its offerings to other blockchain ecosystems, integrate advanced trading features, and foster strategic partnerships within the DeFi space.\n\nJoin Defily.io today and experience the future of decentralized trading on Ethereum!",
      },
    ],
  };
  if (question == "") {
    object.messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content:
        "Create a caption telegram for picture marketing this project. Add icon into post",
    });
  } else {
    object.messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: question.toString(),
    });
  }
  const completion = await openai.createChatCompletion(object);
  return completion.data.choices[0].message?.content!;
}

const token = process.env.TOKEN;

async function sendTelegramMessage(chatId: string) {
  const text = await contentGPT("");
  const data = {
    chat_id: chatId,
    photo: "https://imgur.com/a/5jW8T0h",
    caption: text,
  };
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${token}/sendPhoto`,
      { params: data }
    );
    // Handle the response if needed
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}

// Example usage:
const chatId = "@testingMKT";

sendTelegramMessage(chatId);

cron.schedule("0 0 * * *", () => {
  sendTelegramMessage("@testingMKT");
  console.log("Marketing!");
});

invariant(token, "TELEGRAM_BOT_TOKEN is not defined");

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg: any) => {
  const completion = await contentGPT(msg.text);

  if (!completion) {
    bot.sendMessage("@testingMKT", "I don't know what to say");
  }

  bot.sendMessage("@testingMKT", completion || "");
});
