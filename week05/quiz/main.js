const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
    { name: "The Hulk",realName: "Bruce Banner" },
    { name: "Spider-man",realName: "Peter Parker" },
    { name: "Cyclops",realName: "Scott Summers" },
    {name: "Flash", realName: "Barry Allen"}
];

// Utility functions
function random(a,b=1) {
    // if only 1 argument is provided, we need to swap the values of a and b
      if (b === 1) {
          [a,b] = [b,a];
      }
      return Math.floor((b-a+1) * Math.random()) + a;
    }
    
    function shuffle(array) {
      for (let i = array.length; i; i--) {
          let j = random(i)-1;
          [array[i - 1], array[j]] = [array[j], array[i - 1]];
      }
    }

const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    start: document.getElementById('start'),
    response: document.querySelector('#response'),
    timer: document.querySelector('#timer strong'),
    render(target,content,attributes) {
        for(const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    }, 
    show(element){
        element.style.display = 'block';
    },
    hide(element){
        element.style.display = 'none';
    },
    setup(){
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score,game.score);
        this.render(this.result,'');
        this.render(this.info,'');
        
    },
    //this is deleted
    /*resetForm(){
        this.response.answer.value = '';
        this.response.answer.focus();
    },*/
    
    teardown(){
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    },
    buttons(array){
        return array.map(value => `<button>${value}</button>`).join('');
    }
};

const game = {
    start(quiz){
        console.log('start() invoked');
        this.score = 0;
        this.questions = [...quiz];
        view.setup();
        this.secondsRemaining = 20;
        this.timer = setInterval( this.countdown , 1000 );
        this.ask();
        //view.hide(view.start);

        // main game loop
       /*for(const question of this.questions){
        this.question = question;
        this.ask();
        }
        // end of main game loop
        this.gameOver();*/
        
    },

    countdown() {
        game.secondsRemaining--;
        view.render(view.timer,game.secondsRemaining);
          if(game.secondsRemaining <= 0) {
            game.gameOver();
          }
      },

    ask(name){
        //this belongs to week 3
        /*const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question, question);
        const response =  prompt(question);
        this.check(response);*/
        //this if statement below belongs to the section 8 Ninja Quiz
        /*if(this.questions.length > 0) {
            this.question = this.questions.pop();
            const question = `What is ${this.question.name}'s real name?`;
            view.render(view.question,question);
        }
        else {
            this.gameOver();
        }*/
        console.log('ask() invoked');
        if(this.questions.length > 2) {
            shuffle(this.questions);
            this.question = this.questions.pop();
            const options = [this.questions[0].realName, this.questions[1].realName, this.question.realName];
            shuffle(options);
            const question = `What is ${this.question.name}'s real name?`;
            view.render(view.question,question);
            view.render(view.response,view.buttons(options));
    }
        else {
            this.gameOver();
    }
    },
    check(event){
        //event.preventDefault();
        console.log('check(event) invoked');
        //const response = view.response.answer.value;
        const response = event.target.textContent;
        const answer = this.question.realName;
        if(response === answer){
            view.render(view.result,'Correct!',{'class':'correct'});
            //alert('Correct!');
            this.score++;
            view.render(view.score, this.score);
        } else {
            view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
            //alert(`Wrong! The correct answer was ${answer}`);
        }
        //view.resetForm();
        this.ask();
    },
    gameOver(){
        console.log('gameOver() invoked');
        /*alert(`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);*/
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
        //view.show(view.start);
        view.teardown();
        clearInterval(this.timer);
    }
}
//game.start(quiz);
view.start.addEventListener('click', () => game.start(quiz), false);
view.response.addEventListener('click', (event) => game.check(event), false);
//remove this line of code below as we don't need to hide the form at the start of the game anymore
//view.hide(view.response);
