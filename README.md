# BeTheNarrator

This project implements a multi-agent interactive text-based RPG game where the player interacts with a narrator driven by AI models. The goal of the game is to become the next narrator of the game (the chosen one, the only that has all the universe knowledge). To win you simply have to find the right word. This word will be a word that the narrator says in the game that will be randomly chosen. And you loose if you get too old (time flows faster in the game) and if you choose the wrong word. Clues will be given throughout the story so pay attention to details .A key feature is the integration of multi-agent functionality to manage narrative generation and cipher-based puzzles. Updates to do : the ciphers and puzzles aren't generated as I want so generally there aren't any clues integrated in the text as intended moreover sometimes the three choices aren't generated as well as the precise first question "choose context" so you need to enter the context in the first input even if not requested.

---

## Features

- **AI-Driven Narration locally**: The game uses AI (Phi-2 model) and llama-cpp-wasm (for browser based inference) to dynamically generate story content and respond to player input locally on your machine.
- **Multi-Agent System**: Two agents handle different tasks:
  - **Narrative Generation Agent**: Creates the storyline and choices based on player input.
  - **Cipher Generation Agent**: Creates hidden puzzles (ciphers) embedded in the narrative.
- **Dynamic Updates**: The story evolves with player input, integrating new context and summaries.

---

## Demo

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MailiTruong/BeTheNarrator.git
   cd BeTheNarrator
   python server.py
   ```
2. Access the game at http://localhost:8000.
