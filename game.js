import { generate_cipher, generate_text } from "./inference.js";
import { drawScene, drawDoc } from "./graphics.js";

var input = document.getElementById("user-input");

const summarize_output = (output) => {
        return output.split(' ').slice(-50).join(' ');
};

class Player {
        constructor() {
                this.age = new Date();
                this.attempt = false;
        }

        get_age()
        {
                return Date.now() - this.age; 
        }

}

export class Game {
        constructor() {
                this.player = new Player();
                this.input = '';
                this.instruction = '';
                this.magic_word = '';
                this.context = ''; 
                this.is_first_input = true;
                this.book_open = false;
                this.game_over = false;
        }

        generate_word()
        {
                const words = generate_text.output.split(/\s+/); 
                const random_index = Math.floor(Math.random() * words.length); 
                this.magic_word = words[random_index];  
                console.log("the magic word is: " + this.magic_word);
        }

        guess_word()
        {
                this.instruction = "You are the narrator of an RPG game and the user chose to guess the word so tell him that he has one attempt and that he will loose if he fails."
                this.instruction = this.instruction.replace(/\n/g, ' ');
                generate_text.answer_and_draw(this.instruction, this.input);
        }

        generate_key()
        {       generate_cipher.generate_key = true;
                document.getElementById("layer").removeAttribute("hidden");
                this.instruction = `Hide the magic word: '${this.magic_word}'.In a subtle cipher within the narrative. The word should be hidden in a way that requires attention to detail, but not be too obvious. Here are some methods to hide the word:

    1. **First Letters Cipher**: The first letter of each word could spell the magic word, e.g., "She [S]ells [E]verything [T]o [T]hose [I]nterested" for "SECRET".
    
    2. **Sentence Structure**: The magic word could be hinted at through the structure of the sentence or unusual phrasing, e.g., "In the forest, shadows linger" for the word "TREES".
    
    3. **Acrostic**: The first letter of each line could form the magic word, like :
       Many secrets lie,
       In the heart of the land,
       Guarded by time and shadows.
       This spells "MIG" for "MIGI".
    
    4. **Wordplay**: Use subtle wordplay or homophones, e.g., "The key was hidden under the floor" for "FLOOR".

    The magic word: '${this.magic_word}' should be discoverable but not immediately obvious.`;
                this.instruction = this.instruction.replace(/\n/g, ' ');
                generate_cipher.answer(this.instruction);
        }

        generate_game()
        {
                this.instruction = "Introduce yourself as the narrator of this game with ultimate power, and explain that the player is chosen to replace you if they find the magic word hidden in your paragraph. Tell them they have one attempt, and the clues are that the word is in this paragraph and requires attention to detail and if they want they have a handbook to have the historic of what you said. you must ask the player to choose a context for the story.";
                this.instruction = this.instruction.replace(/\n/g, ' ');
                generate_text.answer_and_draw(this.instruction, this.input);

        }

        update_instructions()
        {
                if (this.is_first_input) 
                {
                        this.context = this.input;
                        this.is_first_input = false
                        this.instruction = `You are the narrator of an RPG game. Start a story based on this context: "${this.context}". Integrate this puzzle: "${generate_cipher.key}", in your text.You must absolutely Provide 3 choices at the end of the paragraph. The third choice must be: "C) Guess the word." The story should be in a natural, paragraph form, not a code or image cipher.`;
                }

                else {
                        this.instruction = `You are continuing the RPG story from the context: "${this.context}". The player has already seen the following summary: "${summarize_output(generate_text.output)}" and their input was: "${this.input}". Now, continue the story, but be sure to include the puzzle: "${generate_cipher.key}", to your text. Again, you must absolutely provide 3 choices at the end. The third choice must be: "C) Guess the word."`;
                }

                this.instruction = this.instruction.replace(/\n/g, ' ');
                generate_text.answer_and_draw(this.instruction, this.input);        
        }

        check_game_over()
        {
                if (this.player.get_age() > 360000)
                {
                        input.placeholder = "You died of old age, you loose. Refresh to play again.";
                        input.value = "";
                        document.getElementById("layer").removeAttribute("hidden");
                        this.game_over = true;
                }

                else if (this.player.attempt && this.input.trim().toLowerCase() == this.magic_word.trim().toLowerCase())
                {

                        input.placeholder = "You win ! You are now the narrator. Refresh to play again.";
                        input.value = "";
                        document.getElementById("layer").removeAttribute("hidden");
                        this.game_over = true;
                }

                else if (this.player.attempt && this.input.trim().toLowerCase()!= this.magic_word.trim().toLowerCase())
                {

                        input.placeholder = "You didn't guess the magic word, you loose.";
                        input.value = "";
                        document.getElementById("layer").removeAttribute("hidden");
                        this.game_over = true;
                }

        }


}

let game = new Game;

game.generate_game();

document.getElementById("submit").addEventListener("click", () => {
        game.input = input.value;
        game.generate_word();
        game.check_game_over();
        if (game.game_over)
        {
                console.log("gameover");
                return;
        }
        if (game.input == "C") 
        {
                game.player.attempt = true;
                game.guess_word();
                input.value = "";
                return;
        }
        game.generate_key();
        const checkKeyGeneration = setInterval(() => {
                if (generate_cipher.is_finished) {
                        clearInterval(checkKeyGeneration);  // Stop polling once the key generation is complete
                        game.update_instructions();
                }
        }, 100); 

        input.value = "";

});

document.getElementById("doc").addEventListener("click", () => {
        if (game.book_open) 
        {
                drawScene("","");
                game.book_open = false;
        }
        else
        {
                drawDoc(generate_text.output);
                game.book_open = true;
        }
});


