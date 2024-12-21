import { LlamaCpp } from "./llama-mt/llama.js";
import { drawScene } from "./graphics.js";

let app;
var textareaResult = "";
var prompt = "";
var user_input = "";
var input = document.getElementById("user-input");
export var output = "";
const model = "https://huggingface.co/TheBloke/phi-2-GGUF/resolve/main/phi-2.Q3_K_M.gguf";

const onModelLoaded = () => {
        console.debug("model: loaded");
        drawScene(textareaResult, user_input);
        input.placeholder = "Narrator is thinking...";
        app.run({
                prompt: prompt,
                ctx_size: 2048,
                temp: 0.7,
                top_k: 40,
                no_display_prompt: true,
        });
}

const onMessageChunk = (text) => {
        console.log("onMessageChunk called");
        output += text;
        drawScene(textareaResult += text, user_input);
        input.placeholder = "Narrator is talking...";
        console.log(textareaResult);
        if (textareaResult.length > 45)
        {
                textareaResult = "";
        }
};

const onComplete = () => {
        console.debug("model: completed");
        input.placeholder = "Type your answer...";
};

export function answer(instruction, input)
{
        user_input = input;
        prompt = `Instruct: ${instruction}\nOutput: `;
        output += "\nNarrator: ";
        console.log(prompt);

        drawScene(textareaResult, user_input);
        if (app && app.url == model) {
                textareaResult = "";
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

