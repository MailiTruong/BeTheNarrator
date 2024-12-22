import { LlamaCpp } from "./llama-mt/llama.js";
import { drawScene } from "./graphics.js";

class Inference {
    constructor(modelUrl) {
        this.app = null;
        this.textareaResult = "";
        this.prompt = "";
        this.user_input = "";
        this.input = document.getElementById("user-input");
        this.output = "";
        this.key = "";
        this.is_finished = false;
        this.modelUrl = modelUrl;
        this.count = 0; // Bypass error that restricts to only two outputs
    }

    onModelLoaded() {
        console.debug("Model loaded");
        drawScene(this.textareaResult, this.user_input);
        this.input.placeholder = "Narrator is thinking...";
        this.app.run({
            prompt: this.prompt,
            ctx_size: 2048,
            temp: 0.4,
            top_k: 30,
            no_display_prompt: true,
        });
    }

    onMessageChunkDraw(text) {
        console.log("onMessageChunkDraw called", text);
        this.output += text;
        drawScene(this.textareaResult += text, this.user_input);
        this.input.placeholder = "Narrator is talking...";
        console.log(this.textareaResult);

        if (this.textareaResult.length > 45) {
            this.textareaResult = "";
        }
    }

    onMessageChunk(text) {
        console.log("onMessageChunk called", text);
        this.key += text;
        console.log(this.key);
    }

    onComplete() {
        this.is_finished = true;
        document.getElementById("layer").setAttribute("hidden", "hidden");
        console.debug("Model: completed");
        this.input.placeholder = "Type your answer...";
    }


    answer_and_draw(instruction, input) {
        document.getElementById("layer").removeAttribute("hidden");
        this.user_input = input;
        this.prompt = `Instruct: ${instruction}\nOutput:`;
        this.output += "\nNarrator: ";
        console.log(this.prompt);

        drawScene(this.textareaResult, this.user_input);

        if ((this.app && this.app.url === this.modelUrl) && (this.count < 2)) {
            this.textareaResult = "";
            this.onModelLoaded();
        } else {
            this.initializeApp(true); // Use onMessageChunkDraw for drawing
            this.count = 0;
        }

        this.count++;
    }

    answer(instruction) {
        this.is_finished = false;
        document.getElementById("layer").removeAttribute("hidden");
        this.prompt = `Instruct: ${instruction}\nOutput:`;
        console.log(this.prompt);

        drawScene(this.textareaResult, this.user_input);

        if ((this.app && this.app.url === this.modelUrl) && (this.count < 2)) {
            this.onModelLoaded();
        } else {
            this.initializeApp(false); // Use onMessageChunk for key processing
        }
    }


    initializeApp(useDraw = true) {
        this.app = new LlamaCpp(
            this.modelUrl,
            this.onModelLoaded.bind(this),
            useDraw ? this.onMessageChunkDraw.bind(this) : this.onMessageChunk.bind(this),
            this.onComplete.bind(this)
        );
    }

}

const modelUrl = "https://huggingface.co/TheBloke/phi-2-GGUF/resolve/main/phi-2.Q3_K_M.gguf";
export const generate_text = new Inference(modelUrl);
export const generate_cipher = new Inference(modelUrl);

