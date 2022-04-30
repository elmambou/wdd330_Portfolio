// This Quiz Ninja project uses functions to describe the main parts of the program
const quiz = [
    ["What is the Capital of the State of Montana?","Helena"],
    ["What is the Capital of the State of California?","Sacramento"],
    ["What is the Capital of the State of Salt Lake City?","Utah"],
    ["What is the Capital of the State of Ohio?","Columbus"],
    ["What is the Capital of the State of Texas?","Austin"],
    ["What is the Capital of the State of Georgia?","Atlanta"],
    ["What is the Capital of the State of Indiana?","Indianapolis"],
];
function start(quiz){
    let score = 0;
    // main game loop
    for(const [question,answer] of quiz){
        const response = ask(question);
        check(response,answer);
    }
    // end of main game loop
    gameOver();
    // function declarations
    function ask(question){
        return prompt(question);
    }
    function check(response,answer){
        if(response === answer){
        alert('Correct!');
        score++;
        } else {
        alert(`Wrong! The correct answer was ${answer}`);
        }
    }
    function gameOver(){
        alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
    }
}
start(quiz);
