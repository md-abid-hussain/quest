import { NextRequest } from "next/server";
import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import OpenAI from "openai";
// import { GoogleGenerativeAI } from "@googl e/generative-ai";

const token = process.env["OPENAI_API_KEY"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";
const openai = new OpenAI({ baseURL: endpoint, apiKey: token });
const serviceAdapter = new OpenAIAdapter({ openai, model: "gpt-4o-mini" });

const BASE_URL = process.env.REMOTE_ACTION_URL || "http://127.0.0.1:8000";

console.log("BASE_URL", BASE_URL);

const runtime = new CopilotRuntime({
  remoteActions: [
    {
      url: `${BASE_URL}/copilotkit`,
    },
  ],
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter: serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};

// import {
//   CopilotRuntime,
//   copilotRuntimeNextJSAppRouterEndpoint,
//   GoogleGenerativeAIAdapter,
// } from "@copilotkit/runtime";
// import { NextRequest } from "next/server";
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const BASE_URL = process.env.REMOTE_ACTION_URL || "http://127.0.0.1:8000";

// console.log("BASE_URL", BASE_URL);

// const runtime = new CopilotRuntime({
//   remoteActions: [
//     {
//       url: `${BASE_URL}/copilotkit`,
//     },
//   ],
// });

// const serviceAdapter = new GoogleGenerativeAIAdapter({ model });

// export const POST = async (req: NextRequest) => {
//   const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
//     runtime,
//     serviceAdapter,
//     endpoint: "/api/copilotkit",
//   });

//   return handleRequest(req);
// };
