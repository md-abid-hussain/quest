

# Quest

## Video Demo
[<img src="https://img.freepik.com/free-vector/minimal-white-style-video-player-template-design_1017-25481.jpg?size=626&ext=jpg&ga=GA1.1.1819120589.1728086400&semt=ais_hybrid" width="50%">](https://youtu.be/_QYxTYlVMmY)


Quest is a RAG (Retrieval-Augmented Generation) application built using CopilotKit and CoAgent. It allows users to upload documents and chat with them. This README provides an overview of the project, how to set it up, and how to contribute.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with Quest, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/quest.git
cd quest
npm install
```

## Scripts

The following scripts are available in the `package.json` file:

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code quality issues.

You can run these scripts using npm:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Dependencies

Quest uses a variety of dependencies to provide functionality. Here are some of the key dependencies:

- `@clerk/nextjs`: Authentication and user management.
- `@copilotkit/react-core`, `@copilotkit/react-ui`, `@copilotkit/runtime`: Core components and runtime for the application.
- `@google/generative-ai`: Integration with Google Generative AI.
- `@langchain/*`: Various packages for language processing and AI integration.
- `@prisma/client`: Database client for Prisma.
- `@radix-ui/*`: UI components.
- `@react-pdf-viewer/*`: PDF viewing capabilities.
- `next`: The Next.js framework.
- `react`, `react-dom`: React library and DOM bindings.
- `@vercel/storage`: Vercel storage solutions.
- `openai`: Integration with OpenAI for language models.
- `gemini`: Used for embeddings.
- `fastapi`: FastAPI framework for backend services.

For a full list of dependencies, see the `package.json` file.

## Development

To start developing Quest, run the development server:

```bash
cd backend
fastapi dev main
```

```bash
npm run dev
```

This will start the application at `http://localhost:3000`.

## Contributing

We welcome contributions to Quest! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
