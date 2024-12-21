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
                this.firstText = true;
        }
        
        get_age()
        {
               return Date.now() - this.age; 
        }

        get_damage()
        {
                
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
        }

        generate_word()
        {
                answer(`Choose one word in all the words said in ${this.instruction} and say it without any sentence, i want the word uniquely.` ,this.input);
        }

        //generate_key()
        //{

        //}

        generate_game()
        {
                this.instruction = "Introduce yourself as the narrator of an RPG game with ultimate power, and explain that the player is chosen to replace you if they find the magic word hidden in your paragraph. Tell them they have one attempt, and the clues are that the word is in this paragraph and requires attention to detail. Ask the player to choose a context for the story.";

                answer(this.instruction, this.input);

        }

        update_instructions()
        {
                if (this.is_first_input) 
                {
                        this.context = this.input;
                        this.is_first_input = false
                        this.instruction = `Write an RPG story based on this context: ${this.context}.Provide 3 choices and stop after the choices.`;
                }

                else {
                        this.instruction = `Write an RPG story based on this context: ${this.context}. Continue based on this summary: ${summarize_output(output)}. Player input: ${this.input}. Provide 3 choices and stop after the choices.`;
                }

                this.instruction = this.instruction.replace(/\n/g, ' ');
                answer(this.instruction, this.input);        
        }

        check_game_over()
        {
                if (this.player.get_age() > 1000)
                {
                        input.placeholder = "You died of old age, you loose."
                }
        }


}

let game = new Game;
game.generate_game();
// game.generate_word();
document.getElementById("submit").addEventListener("click", () => {
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


