import { LlamaCpp } from "./llama-mt/llama.js";
import { drawScene } from "./graphics.js";

let app;
var textareaResult = "";
var prompt = "";
var user_input = "";
var input = document.getElementById("user-input");
const model = "https://huggingface.co/TheBloke/phi-2-GGUF/resolve/main/phi-2.Q3_K_M.gguf";

const onModelLoaded = () => {
        console.debug("model: loaded");

        app.run({
                prompt: prompt,
                ctx_size: 1024,
                temp: 0.3,
                top_k: 40,
                no_display_prompt: true,
        });
}

const onMessageChunk = (text) => {
        console.log("onMessageChunk called");
        input.placeholder = "Narrator is thinking...";
        drawScene(textareaResult += text, user_input);
        if (textareaResult.length > 45)
        {
                textareaResult = "";
        }
        console.log(textareaResult);
};

const onComplete = () => {
        console.debug("model: completed");
        input.placeholder = "Type your answer...";
};

export function answer(instruction, input)
{
        user_input = input;
        prompt = `Instruct: ${instruction}\nOutput: `;
        console.log(prompt);

        if (app && app.url == model) {
                onModelLoaded();
                return;
        }

        app = new LlamaCpp(
                model,
                onModelLoaded,          
                onMessageChunk,       
                onComplete,
        );
}

