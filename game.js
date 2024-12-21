import { answer } from "./inference.js";
import { output } from "./inference.js";
import { drawScene } from "./graphics.js";
import { drawDoc } from "./graphics.js";

var input = document.getElementById("user-input");

class Player {
        constructor() {
                this.health = 100;
                this.age = 15;
                this.attempt = false;
                this.firstText = true;
        }

        //get_older()
        //{

        //}

        //get_damage()
        //{

        //}




}

export class Game {
        constructor() {
                this.player = new Player();
                this.input = '';
                this.instruction = '';
                this.instructions = '';
                this.answers = '';
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
                this.instruction = "You are the narrator of an RPG game so introduce yourself by saying that you are the narrator and you have all powers on this universe and that the player is the chosen one to take your place if he is clever enough.Tell him the rules: that he simply have to find the magic word. This word will be a word that the you say during this paragraph but that he has only one attempt. The only two clues you can give him on the word is that it is said in this paragraph and that he has to pay close attention to details of what you say. Then ask in which context he wants to be.";

                answer(this.instruction, this.input);

        }

        update_instructions()
        {
                if (this.is_first_input) 
                {
                        this.context = this.input;
                        this.is_first_input = false;
                }

                this.instruction = `So now generate the the story of an RPG game based on this context : ${this.context}. And generate three choices for the player to make. If you have already made a setting of the story continue the story with again 3 other choices to make, based on what you said previously : ${output} and what the player chose which is: ${this.input}. The magic word is : ${this.magic_word}. Make sure to stop at the three choices because you will tell the rest of the story after.`;

                this.instruction = this.instruction.replace(/\n/g, ' ');
                answer(this.instruction, this.input);        
        }

        //check_game_over()
        //{

        //}


}

let game = new Game;
game.generate_game();
// game.generate_word();
document.getElementById("submit").addEventListener("click", () => {
        //game.check_game_over();
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


