import { answer } from "./inference.js";
import { output } from "./inference.js";
import { drawScene } from "./graphics.js";
import { drawDoc } from "./graphics.js";

var input = document.getElementById("user-input");

const summarize_output = (output) => {
        return output.split(' ').slice(-50).join(' ');
};

class Player {
        constructor() {
                this.health = 100;
                this.age = new Date();
                this.attempt = false;
        }

        get_age()
        {
                return Date.now() - this.age; 
        }

        //get_damage()
        //{

        //}
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
                const words = output.split(/\s+/); 
                const random_index = Math.floor(Math.random() * words.length); 
                this.magic_word = words[random_index];  
                console.log("the magic word is: " + this.magic_word);
        }

        //generate_key()
        //{

        //}

        generate_game()
        {
                this.instruction = "Introduce yourself as the narrator of an RPG game with ultimate power, and explain that the player is chosen to replace you if they find the magic word hidden in your paragraph. Tell them they have one attempt, and the clues are that the word is in this paragraph and requires attention to detail and if they want they have a handbook to have the historic of what you said. Ask the player to choose a context for the story.";

                answer(this.instruction, this.input);

        }

        update_instructions()
        {
                if (this.is_first_input) 
                {
                        this.context = this.input;
                        this.is_first_input = false
                        this.instruction = `Write an RPG story based on this context: ${this.context}.Provide 3 choices and stop after the choices, the third choice must be :"C) Guess the word".`;
                }

                else {
                        this.instruction = `Write an RPG story based on this context: ${this.context}. Continue based on this summary: ${summarize_output(output)}. Player input: ${this.input}. Provide 3 choices and stop after the choices, the choice must be : "C) Guess the word".`;
                }

                this.instruction = this.instruction.replace(/\n/g, ' ');
                answer(this.instruction, this.input);        
        }

        check_game_over()
        {
                if (this.player.get_age() > 60000)
                {
                        input.placeholder = "You died of old age, you loose. Refresh to play again.";
                        document.getElementById("layer").removeAttribute("hidden");
                        this.game_over = true;
                }

                if (this.input == "C" || this.input == "Guess the word".toLowerCase())
                {
                        this.player.attempt = true;
                }

                if (this.player.health < 0)
                {
                        input.placeholder = "You died killed by monsters. You loose.";
                        document.getElementById("layer").removeAttribute("hidden");
                        this.game_over = true;

                }
                
                else if (this.player.attempt && this.input == this.magic_word)
                {
                        
                        input.placeholder = "You win ! You are now the narrator. Refresh to play again.";
                        document.getElementById("layer").removeAttribute("hidden");
                        this.game_over = true;
                }

                else if (this.player.attempt && this.input != this.magic_word)
                {

                        input.placeholder = "You didn't guess the magis word, you loose.";
                        document.getElementById("layer").removeAttribute("hidden");
                        this.game_over = true;
                }
        }


}

let game = new Game;
game.generate_game();
document.getElementById("submit").addEventListener("click", () => {
        if (game.is_first_input)
        {
                game.generate_word();
        }
        game.check_game_over();
        game.input = input.value;
        game.update_instructions();
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
                drawDoc(output);
                game.book_open = true;
        }
});


