const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
// things in local storage are stored as a string
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
// changing a string to an array object is json parse to display a list of scores.
const MAX_HIGH_SCORES = 5;


finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    console.log("Clicked the save button!");
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
        // collecting thr score and name values to add to the array
    };
    highScores.push(score);
    // pushes this to the array 

    highScores.sort((a,b) => b.score - a.score);
    //an array function to sort and returning the highest to lowest score usin if stament.

    highScores.splice(5);
// this only collects the highest score and will slice out anything after the 5th.
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
    
};
