# MarketingGPT

MarketingGPT is a project that utilizes OpenAI's natural language processing capabilities to generate marketing posts based on user prompts. The generated posts can be sent to users on Telegram via a bot integrated with the Telegram Bot API.

## How It Works

1. The project leverages OpenAI's GPT-3.5 model to generate marketing content. Users provide prompts or descriptions about the content they require, and the model generates creative and engaging marketing posts based on the input.

2. To interact with users on Telegram, the project integrates with the Telegram Bot API. It listens for events in groups or channels and responds by sending the generated marketing posts to the appropriate recipients.

## Tech Stack

- Typescript: The project is built using Typescript, a statically typed superset of JavaScript that offers improved tooling and developer experience.

- OpenAI: The natural language processing capabilities of OpenAI's GPT-3.5 model are utilized to generate marketing content based on user prompts.

- Telegram Bot API: The project integrates with the Telegram Bot API to send generated marketing posts to users in Telegram groups or channels.

## Installation

To install and set up the project, follow these steps:

1. Make sure you have Node.js installed on your machine.

2. Clone the project repository:

```
  git clone https://github.com/your-username/MarketingGPT.git
```

3. Navigate to the project directory:

```
   cd MarketingGPT
```

4. Install the required dependencies using npm:

```
   npm install
```

5. Set up your Telegram bot by creating a new bot and obtaining an API token. Refer to the Telegram Bot API documentation for detailed instructions.

6. Update the `index.ts` file with your Telegram bot API token and customize any additional settings or configurations as needed.

7. Start the project:

```
   npm start
```

You are now ready to use MarketingGPT to generate marketing posts and send them to users on Telegram.

## Contact

For any questions or feedback regarding the project, feel free to contact [khanhduong6b@gmail.com].

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
