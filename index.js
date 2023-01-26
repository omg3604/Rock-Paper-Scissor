// create all elements for the DOM
const body = document.querySelector(`body`);
const mainContainer = document.createElement(`div`);
const result = document.createElement(`div`);
const title = document.createElement(`h1`);
const totalPlays = document.createElement(`div`);
const playsForPlayer = document.createElement(`div`);
const iconRockPlayer = document.createElement(`div`);
const iconPaperPlayer = document.createElement(`div`);
const iconScissorsPlayer = document.createElement(`div`);
const playsForComputer = document.createElement(`div`);
const iconRockComputer = document.createElement(`div`);
const iconPaperComputer = document.createElement(`div`);
const iconScissorsComputer = document.createElement(`div`);
const score = document.createElement(`h2`);
const buttons = document.createElement(`div`);
const rockBtn = document.createElement(`button`);
const paperBtn = document.createElement(`button`);
const scissorsBtn = document.createElement(`button`);
const clearBtn = document.createElement(`button`);
const note = document.createElement(`p`);
const footer = document.createElement(`footer`);
const footerText = document.createElement(`a`);
const githubIcon = document.createElement(`i`);

const tieResponses = [`Phew, a tie!`, `A tie, good save!`, `You tied, lucky!`];
const winResponses = [
	`Great! You win`,
	`Another win, nice one!`,
	`Well done!`,
	`Goodjob! One more win left`,
];
const lossResponses = [
	`You lose, unlucky :(`,
	`You lose. Good try, though`,
	`Another loss, close one!`,
	`You lose, last chance!`,
];
const iconsPlayer = [iconRockPlayer, iconPaperPlayer, iconScissorsPlayer];
const iconsComputer = [
	iconRockComputer,
	iconPaperComputer,
	iconScissorsComputer,
];
const playButtons = [rockBtn, paperBtn, scissorsBtn];
const keyCodes = {
	82: `rock`,
	80: `paper`,
	83: `scissors`,
};
const options = [`rock`, `paper`, `scissors`];

let computerPlay = () => options[Math.floor(Math.random() * 3)];
let playerScore = 0;
let computerScore = 0;
let i = 0;

// Add text to the elements
title.textContent = `You think you can win?`;
rockBtn.textContent = `Rock`;
paperBtn.textContent = `Paper`;
scissorsBtn.textContent = `Scissors`;
clearBtn.textContent = `Restart`;
note.textContent = `Press R on your (physical) keyboard to play Rock. 'P' & 'S' also work.`;
footerText.textContent = `By Om_Golhani `;
//footerText.href = `https://github.com/omg3604/rock-paper-scisor`;

// Style elements
body.style.cssText = `position: relative;
    background-color: #071E3D;
    min-height: 100vh;
    width: 100%`;

title.style.maxWidth = `350px`;
title.style.padding = `0.4rem 0.8rem`;

iconsPlayer.forEach((icon) => {
	icon.style.cssText = `color: #21E6C1;
        font-size: 2rem`;
});
iconsComputer.forEach((icon) => {
	icon.style.cssText = `color: #21E6C1;
        font-size: 2rem`;
});

note.style.cssText = `color: #21E6C1;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.08rem;
    margin-top: 2rem;
    opacity: 0.55;
    max-width: 321px;
    text-align: center;
    width: 75%`;

footer.style.cssText = `align-items: center;
    bottom: 0;
    display: flex;
    height: 50px;
    justify-content: center;
    position: absolute;
    width: 100%;
    box-shadow: 0 -0.5px 3px #278EA5`;

footerText.style.cssText = `color: #21E6C1;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    text-decoration: none;
    text-transform: capitalize`;

githubIcon.style.cssText = `color: #21E6C1;
    font-size: 0.9rem`;

// add css classes for all elements
mainContainer.classList.add(`main-container`);
result.classList.add(`result`);
totalPlays.classList.add(`total-plays`);
playsForPlayer.classList.add(`plays`, `player`);
playsForComputer.classList.add(`plays`, `computer`);
githubIcon.classList.add(`icon-github`);

iconRockPlayer.classList.add(`icon-rock`);
iconPaperPlayer.classList.add(`icon-paper`);
iconScissorsPlayer.classList.add(`icon-scissors`);

iconRockComputer.classList.add(`icon-rock`);
iconPaperComputer.classList.add(`icon-paper`);
iconScissorsComputer.classList.add(`icon-scissors`);

score.classList.add(`score`);
buttons.classList.add(`buttons`);
rockBtn.classList.add(`rock`);
paperBtn.classList.add(`paper`);
scissorsBtn.classList.add(`scissors`);
clearBtn.classList.add(`clear`);

// place some elements into the DOM
body.appendChild(mainContainer);
mainContainer.appendChild(result);
result.appendChild(title);
result.appendChild(totalPlays);
totalPlays.appendChild(playsForPlayer);
totalPlays.appendChild(playsForComputer);
iconsPlayer.forEach((icon) => {
	playsForPlayer.appendChild(icon);
	icon.style.transform = `scaleX(-1)`;
});
iconsComputer.forEach((icon) => playsForComputer.appendChild(icon));
mainContainer.appendChild(score);
mainContainer.appendChild(buttons);
mainContainer.appendChild(note);
mainContainer.appendChild(footer);
footer.appendChild(footerText);
footerText.appendChild(githubIcon);
playButtons.forEach((playButton) => {
	playButton.setAttribute(`type`, `button`);
	buttons.appendChild(playButton);
});

clearBtn.setAttribute(`type`, `reset`);
buttons.appendChild(clearBtn);

// Event listeners
playButtons.forEach((playButton) =>
	playButton.addEventListener(`click`, getPlayerInputViaClick)
);
document.addEventListener(`keydown`, getPlayerInputViaKeys);
clearBtn.addEventListener(`click`, restartGame);

// Default behavior (on load)
displayScore(playerScore, computerScore);
hideNonPlaysIcons();
showPlaysIcons();

function getPlayerInputViaClick(e) {
	playRound(e.target.classList[0]);
}
function getPlayerInputViaKeys(e) {
	if (e.keyCode in keyCodes) {
		playButtons.forEach((playButton) => playButton.classList.remove(`hover`));
		playRound(keyCodes[e.keyCode]);
		document
			.querySelector(`button.${keyCodes[e.keyCode]}`)
			.classList.add(`hover`);
	}
}
// show the icons of the chosen plays
function showPlaysIcons(player = 0, computer = 0) {
	iconsPlayer[player].style.display = `flex`;
	iconsComputer[computer].style.display = `flex`;
}
// hide the rest of icons
function hideNonPlaysIcons() {
	iconsPlayer.forEach((icon) => (icon.style.display = `none`));
	iconsComputer.forEach((icon) => (icon.style.display = `none`));
}
// play one round of rock-paper-scissors
function playRound(playerSelection, computerSelection = computerPlay()) {
	hideNonPlaysIcons();
	showPlaysIcons(
		options.indexOf(playerSelection),
		options.indexOf(computerSelection)
	);
	if (playerSelection === computerSelection) {
		title.textContent = tieResponses[Math.floor(Math.random() * 3)];
	} else if (
		(playerSelection === options[0] && computerSelection === options[2]) ||
		(playerSelection === options[1] && computerSelection === options[0]) ||
		(playerSelection === options[2] && computerSelection === options[1])
	) {
		title.textContent = winResponses[playerScore];
		displayScore(++playerScore, computerScore);
	} else {
		title.textContent = lossResponses[computerScore];
		displayScore(playerScore, ++computerScore);
	}
	endGame();
}
// display the score
function displayScore(playerScore, computerScore) {
	score.textContent = playerScore + ` : ` + computerScore;
}
// check if the game ended
function endGame() {
	if (playerScore !== 5 && computerScore !== 5) return;

	playButtons.forEach((playButton) =>
		playButton.removeEventListener(`click`, getPlayerInputViaClick)
	);
	document.removeEventListener(`keydown`, getPlayerInputViaKeys);

	title.style.borderRadius = `4px`;
	title.style.boxShadow = `0px 0px 2px 0.5px #278EA5`;
	title.textContent = `Game Over : You ${playerScore === 5 ? 'won' : 'lost'}!`;
}
// restart game
function restartGame() {
	playerScore = 0;
	computerScore = 0;
	title.textContent = `You think you can win?`;
	title.style.boxShadow = `none`;
	displayScore(0, 0);
	hideNonPlaysIcons();
	showPlaysIcons();
	playButtons.forEach((playButton) =>
		playButton.addEventListener(`click`, getPlayerInputViaClick)
	);
	document.addEventListener(`keydown`, getPlayerInputViaKeys);
}


// function computerPlay(){
//     var myarray=['rock' , 'paper' , 'scissor'];
//     var item = myarray[Math.floor(Math.random()* myarray.length)];
//     return item;
// }
// function playRound(playerSelection, computerSelection, x) {
//     if(playerSelection.toLowerCase()=="rock" && computerSelection.toLowerCase()=="paper"){
//         console.log("Round "+x+": You lose! Paper beats Rock");
//         return 0;
//     }
//     else if(playerSelection.toLowerCase()=="rock" && computerSelection.toLowerCase()=="scissor"){
//         console.log("Round "+x+": You won! rock beats scissor");
//         return 1;
//     }
//     else if(playerSelection.toLowerCase()=="scissor" && computerSelection.toLowerCase()=="paper"){
//         console.log("Round "+x+": You won! Scissor beats Paper");
//         return 1;
//     }
//     else if(playerSelection.toLowerCase()=="scissor" && computerSelection.toLowerCase()=="rock"){
//         console.log("Round "+x+": You lose! Rock beats Scissors");
//         return 0;
//     }
//     else if(playerSelection.toLowerCase()=="paper" && computerSelection.toLowerCase()=="scissor"){
//         console.log("Round "+x+": You lose! Scissor beats paper");
//         return 0;
//     }
//     else if(playerSelection.toLowerCase()=="paper" && computerSelection.toLowerCase()=="rock"){
//         console.log("Round "+x+": You won! Paper beats Rock");
//         return 1;
//     }else if((playerSelection.toLowerCase()=="paper" && computerSelection.toLowerCase()=="paper") || (playerSelection.toLowerCase()=="rock" && computerSelection.toLowerCase()=="rock")|| (playerSelection.toLowerCase()=="scissor" && computerSelection.toLowerCase()=="scissor")){
//         console.log("Round "+x+": there is a tie");
//         return -1;
//     }
//     else{
//         console.log("Round "+x+": Invalid Round!")
//         let playerSelect = prompt("Round "+(x)+" : Select one : Rock or Paper or Scissor !");
//         const computerSelect = computerPlay();
//         let y = playRound(playerSelect, computerSelect , x);
//         return y;
//     }
// }

// function game(){
//     let playercount=0;
//     let computercount=0;
//     let n = Number(prompt("Enter the number of rounds you want to play in the game! "))
//     console.log("Results of all rounds : ");
//     for (let i = 0; i < n; i++) {
//         let playerSelection = prompt("Round "+(i+1)+" : Select one : Rock or Paper or Scissor !");
//         const computerSelection = computerPlay();
//         let res=playRound(playerSelection, computerSelection, i+1 );
//         if(res==1){
//             playercount++;
//         }else if(res==0){
//             computercount++;
//         }
//         else{
//             continue;
//         }
//     }
//     console.log("the Final Result : ");
//     if(computercount > playercount){
//         console.log("oh! You lose the game.");
//         console.log("Your points are: "+playercount);
//         console.log("Computer's points are: "+computercount);
//     }
//     else if(computercount < playercount){
//         console.log("hurray! you won the game.");
//         console.log("Your points are: "+playercount);
//         console.log("Computer's points are: "+computercount);
//     }else {
//         console.log("Noone won! there is a tie in the game.")
//         console.log("Your points are: "+playercount);
//         console.log("Computer's points are: "+computercount);
//     }
// }

// game();
// while(confirm("do you want to play another game? ")){
//     game();
// }

// // function computerplay(){
// //     var arr= ["snake" , "water" , "gun"]
// //     let item = arr[Math.floor(Math.random()*arr.length)]
// //     return item
// // }

// // function playgame(playerselect , computerselect ,x){
// //     if(playerselect.toLowerCase()=="snake" && computerselect.toLowerCase()=="water"){
// //         console.log("Round "+x+": Tum jeete! Saap Pani pee gya .");
// //         return 1;
// //     }
// //     else if(playerselect.toLowerCase()=="snake" && computerselect.toLowerCase()=="gun"){
// //         console.log("Round "+x+": Tum hare! Gun se saap lo uda diya.");
// //         return 0;
// //     }
// //     else if(playerselect.toLowerCase()=="water" && computerselect.toLowerCase()=="snake"){
// //         console.log("Round "+x+": Tum hare! Saap tumhara paani pi gya.");
// //         return 0;
// //     }
// //     else if(playerselect.toLowerCase()=="water" && computerselect.toLowerCase()=="gun"){
// //         console.log("Round "+x+": Tum jeete! gun paani me kharab ho gayi.");
// //         return 1;
// //     }
// //     else if(playerselect.toLowerCase()=="gun" && computerselect.toLowerCase()=="water"){
// //         console.log("Round "+x+": Tum hare! Gun paani me kharab ho gayi.");
// //         return 0;
// //     }
// //     else if(playerselect.toLowerCase()=="gun" && computerselect.toLowerCase()=="snake"){
// //         console.log("Round "+x+": Tum jeete! Gun se saap lo uda diya.");
// //         return 1;
// //     }else{
// //         console.log("Round "+x+": koi nahi jeeta! ");
// //         return -1;
// //     }
// // }

// // function game(){
// //     let n = +prompt("enter the number of rounds you want to play");
// //     let playercount=0;
// //     let computercount=0;
// //     console.log("Results of all rounds : ");
// //     for(let i=0 ; i<n ; i++){
// //         let playerselect = prompt("Round:"+(i+1)+" Select any one: Snake , Water , Gun !")
// //         let computerselect = computerplay();
// //         let res = playgame(playerselect , computerselect , i+1);
// //         if(res == 1){
// //             playercount++;
// //         }else if(res==0){
// //             computercount++;
// //         }
// //         else{
// //             continue;
// //         }
// //     }
// //     if(computercount < playercount){
// //         console.log("aapke points hai : "+playercount)
// //         console.log("computer ke points hai : "+computercount)
// //         console.log("WAHHH! Aaap ye game jeet chuke hai, Apko milte hai 10000000 ruppee.")
// //     }else if(computercount < playercount){
// //         console.log("aapke points hai : "+playercount)
// //         console.log("computer ke points hai : "+computercount)
// //         console.log("BSDK! Tum ye game haar chuke hai, ab tumhe milti hai hamari tatti! ")
// //     }else{
// //         console.log("aapke points hai : "+playercount)
// //         console.log("computer ke points hai : "+computercount)
// //         console.log("Bach gaye beta ! tie ho gaya match! ")
// //     }
// // }
// // game()

// /* video 32 DOM walk

// document.getElementsByClassName("foot")[0].style.backgroundColor="blue";

// */

// /* video 33
// console.log(document.body.firstChild)
// console.log(document.body.lastChild)
// console.log(document.body.childNodes)
// console.log(document.body.childNodes[1])
// console.log(document.body.hasChildNodes())
// let arr = Array.from(document.body.childNodes)
// console.log(arr)
// console.log(typeof arr)
// */

// /* video 34
// Silblings are the children of the same parent.
// */

// // console.log(document.documentElement.parentElement)
// // console.log(document.documentElement.parentNode)
// // a = (document.body.firstChild)
// // console.log(a.parentElement)
// // console.log(a.parentNode)
// // console.log(a.firstChild.nextSibling)


