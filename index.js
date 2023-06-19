"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = require("openai");
var dotenv = require("dotenv");
var axios_1 = require("axios");
var TelegramBot = require("node-telegram-bot-api");
var tiny_invariant_1 = require("tiny-invariant");
var cron = require("node-cron");
dotenv.config({ override: true });
var openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
    throw new Error("OpenAI API key not found in environment variables.");
}
var configuration = new openai_1.Configuration({
    apiKey: openaiApiKey,
});
var openai = new openai_1.OpenAIApi(configuration);
var object = {
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: openai_1.ChatCompletionRequestMessageRoleEnum.System,
            content: "Act as a Project marketing person for speaking people. I will provide you information about the project and you will only answer their questions and nothing else. The replies must relate to the information I provided. Do not write explanations in replies.",
        },
        {
            role: openai_1.ChatCompletionRequestMessageRoleEnum.Assistant,
            content: "\n\nProject Name: Defily.io\nProject Token: DFL (ERC-20)\nProject Purpose: Defily.io is a decentralized exchange protocol built on the Ethereum blockchain, designed to provide individual traders and institutional investors with a simple and efficient way to trade ERC-20 tokens directly from their wallets.\n\nKey Features:\n\nAutomated Market Maker (AMM): Defily.io utilizes an AMM model, eliminating the need for traditional order books. This ensures continuous liquidity and efficient token swaps.\nDecentralization: Defily.io operates in a fully decentralized manner, empowering users with direct control over their funds. All transactions occur directly on the Ethereum blockchain without intermediaries or centralized authorities.\nPermissionless: Defily.io offers an open and inclusive platform, enabling anyone to create or list tokens without gatekeepers or restrictions. This fosters a diverse ecosystem of tokens available for trading.\nEnhanced Security: Defily.io employs rigorous security measures, including smart contract audits and bug bounties, to ensure the safety of user funds and protect against potential vulnerabilities.\nDFL Token Utility: The DFL token serves as the native utility token within the Defily ecosystem. Holders may benefit from governance participation, staking rewards, fee discounts, or other utility features within the platform.\n\nAdditional Information: Defily.io introduced the concept of liquidity pools, allowing users to contribute tokens to provide liquidity and earn fees. It has gained significant popularity and played a pivotal role in driving the growth of decentralized finance (DeFi) on the Ethereum blockchain.\n\nRoadmap: Defily.io has an ambitious roadmap, including plans to expand its offerings to other blockchain ecosystems, integrate advanced trading features, and foster strategic partnerships within the DeFi space.\n\nJoin Defily.io today and experience the future of decentralized trading on Ethereum!",
        },
    ],
};
object.messages.push({
    role: openai_1.ChatCompletionRequestMessageRoleEnum.User,
    content: "Create a post telegram for marketing this project. Add icon into post",
});
function contentGPT() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var completion;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, openai.createChatCompletion(object)];
                case 1:
                    completion = _b.sent();
                    return [2 /*return*/, (_a = completion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content];
            }
        });
    });
}
var token = "6234234744:AAGMZzpMbnvu85Z7uENWYn2EvNY0RChj57Y";
function sendTelegramMessage(chatId) {
    return __awaiter(this, void 0, void 0, function () {
        var text, data, query, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contentGPT()];
                case 1:
                    text = _a.sent();
                    data = {
                        chat_id: chatId,
                        photo: "https://imgur.com/a/5jW8T0h",
                        caption: text,
                    };
                    query = new URLSearchParams(data).toString();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get("https://api.telegram.org/bot".concat(token, "/sendPhoto"), { params: data })];
                case 3:
                    response = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error sending Telegram message:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Example usage:
var chatId = "@MaketingGPT";
cron.schedule("0 0 * * *", function () {
    sendTelegramMessage(chatId);
    console.log("Marketing!");
});
(0, tiny_invariant_1.default)(token, "TELEGRAM_BOT_TOKEN is not defined");
var bot = new TelegramBot(token, { polling: true });
bot.on("message", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var completion, basePromptOutput;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openai.createCompletion(object)];
            case 1:
                completion = _a.sent();
                console.log(completion.data.choices);
                basePromptOutput = completion.data.choices.pop();
                if (!basePromptOutput) {
                    bot.sendMessage(msg.chat.id, "I don't know what to say");
                }
                bot.sendMessage(msg.chat.id, (basePromptOutput === null || basePromptOutput === void 0 ? void 0 : basePromptOutput.text) || "");
                return [2 /*return*/];
        }
    });
}); });
