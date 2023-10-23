/*
10/19 near-term things to add:
-USE SAME APPROACH AS CREATEARRAYOFCOMICS WITH THE FEEDBACK BUTTONS. ITERATING WITH A SIMPLE HTML COLLECTION ISN'T WORKING? REFERENCE LINES 13, 45, 61, 86
-write more on the About page
-add a disclaimer in the footer about how the user is agreeing to be shown content from chatGPT, which is unpredictable and based on prompts provided by this program in the context of available documentation on each of the comics
-change joke feedback button design so that the feedback chosen persists and isn't available to be clicked anymore
-make the page auto-scroll down so that the entirety of the next joke is exposed without scrolling
-update darkenFeedbackButtons func to remove hover pseudo class styling
*/

const sectionHero = document.getElementById('hero-section');
const buttonReady = document.getElementById('ready');
const containerChooseAComic = document.getElementById('choose-a-comic-container');
const choiceComic = document.getElementsByClassName('comic-choice'); /* May need to come back to this and change to getQuerySelectorAll?? */
const startShow = document.getElementById('start-show');
const completeSet = document.getElementById('complete-set');
/*Just to test the initial js logic as a starting point*/
//const testLMAO = document.getElementsByClassName(`feedback-button-${jokeNumber}`);


const showChooseAComic = () => {
    sectionHero.style.display = 'none';
    containerChooseAComic.style.display = 'block';
}

buttonReady.addEventListener('click', showChooseAComic);

/*
Thoughts on what to do next:
-- Want to be able to click on a comic's head, have all the other heads grayed out with an overlay.
----How to accomplish this?
    1. have an array of all the comic names (the id of the children of id='comic-container')
    2. on click, detect the id of the event target
    3. create a new array (filter method?) of all the comics that weren't clicked
    4. apply a dark overlay to all of those comics
-- After a delay, have all the headshots disappear, and then after a delay, have a message that says something like 
"Your next comic got fired from SNL, recorded 4 hour-long specials, hosted the best video podcast ever created, and had
memorable roles in Billy Madison and Dirty Work. The last thing he ever did was battle cancer, and the battle ended in a draw.
Give it up for Norm MacDonald!"
-- After text is displayed, display the first joke text box
*/

const containerOfComics = document.getElementById('comic-container');
const elementsOfComics = containerOfComics.children;

const createArrayOfComics = () => {
    const comicArray = [];
    for (let i = 0; i < elementsOfComics.length; i++) {
        comicArray.push(elementsOfComics[i].id);
    }
    return comicArray;
};

const identifySelectedComic = (e) => {
    const clickedComic = e.currentTarget.id;
    return clickedComic;
    //code testing that the function works ... document.getElementById('logo').innerHTML = clickedComic;
}

//code testing that the event listener works with commented out code above... document.getElementById('norm-macdonald').addEventListener('click', identifySelectedComic);

const createUnclickedComicArray = (e) => {
    const comicClicked = identifySelectedComic(e);
    const arrayComics = createArrayOfComics();
    const filteredComicArray = arrayComics.filter(comic => comicClicked !== comic);
    return filteredComicArray;
    //document.getElementById('logo').innerHTML = filteredComicArray;
}

const darkenComics = (e) => {
    const selectedComic = identifySelectedComic(e);
    const unclickedComicArray = createUnclickedComicArray(e);
    //document.getElementById('logo').innerHTML = unclickedComicArray;
    for (i = 0; i < unclickedComicArray.length; i++) {
        //document.getElementById('logo').innerHTML = i;
        document.getElementById(unclickedComicArray[i]).style.color = 'rgb(57, 57, 57)';
        document.getElementById(unclickedComicArray[i]).style.border = '1px solid transparent';
    };
    document.getElementById(selectedComic).style.color = 'gold';
    document.getElementById(selectedComic).style.border = '1px solid gold';
    startShow.style.display = 'block';
    completeSet.setAttribute('data-comic', selectedComic);
}

//choiceComic.addEventListener('click', darkenComics(e));

for (let i = 0; i < choiceComic.length; i ++) {
    choiceComic[i].addEventListener('click', darkenComics);
}

const comicContent = {
    'Anthony Jeselnik': {
        name: 'Anthony Jeselnik',
        headshot: 'https://www.inquirer.com/resizer/z5H1_s5XVkY0BliLYH6pHhgMCXI=/760x507/smart/filters:format(webp)/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/JNU76P5V6FFPJJIZL3DIMLU6GE.jpg',
        intro: "He haHe has recorded three hour-long specials - Shakespeare, Caligula, and Fire in the Maternity Ward. He was the host of The Jeselnik Offensive on Comedy Central, until they fired him for celebrating a shark attack. Please welcome to the page... Anthony Jeselnik!",
        jokes: [
            {0/*NEED TO INVESTIGATE THIS AGAIN TO MAKE SURE IT WORKS*/: 'I\'ve lived in New York for 5 years. New York is the best city in the world. Not only do I want to record my first album there, I wanna bury my kids there.'},
            {1: 'Who do you think is smarter: Jesus or Buddha? I mean, just in terms of not getting themselves crucified. Who do you think is smarter: Jesus or Buddha? I mean, just in terms of not getting themselves crucified. Who do you think is smarter: Jesus or Buddha? I mean, just in terms of not getting themselves crucified. Who do you think is smarter: Jesus or Buddha? I mean, just in terms of not getting themselves crucified. Who do you think is smarter: Jesus or Buddha? I mean, just in terms of not getting themselves crucified. Who do you think is smarter: Jesus or Buddha? I mean, just in terms of not getting themselves crucified.'},
            {2: 'My ex-girlfriend had a lot of, like, really annoying habits. I think the worst was that she loved to read women’s magazines, like Cosmo or, uh… or things like Cosmo. And she would flip straight to the relationship quiz. And not only would she present that to me as if it was, like, a fun activity for us to do together — even though every question is designed to fuck my entire world up. But even worse is she would get mad at my answers and make me change them so we’d get the best score. Like, I’ll never forget the last time we played that game. She was like, “Anthony, if you could have lunch with anyone in the world, living or dead, who would it be?” And I said, “I don’t know. Caligula.” And she goes, “Really? Caligula? That’s your answer? That’s what you’re gonna say to me, your girlfriend? Are you sure?” I said, “Oh, I’m sorry, baby. Let me change that. I’d have lunch with you. And you’d be dead.'} 
        ]
    },
    'Norm MacDonald': {
        headshot: 'https://imagez.tmz.com/image/a9/1by1/2021/09/14/a9f0bff08c8b40949bac75319542e643_xl.jpg',
        intro: "Many people consider him the best host of Weekend Update. Along with Adam Egret, he hosted Norm MacDonald Live, the funniest podcast ever. He was an old soul and an old chunk of coal. Please welcome to the page... Norm MacDonald!",
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    }
};

/*const createIntroElements = () => {
    const introDiv = completeSet.appendChild('div')
    introDiv.setAttribute('id', 'intro-placeholder');
}*/
//ElementById('complete-set').getAttribute('data-comic');//Not sure this will work yet
let i = 0;
const speed = 25;
//Will need to move this code so it executes in the proper order
const animateHostIntro = () /*Later on will likely need to pass in argument of comic's name*/ => {
    //createIntroElements();
    const introDiv = document.createElement('div');
    completeSet.appendChild(introDiv);
    introDiv.setAttribute('id', 'host-intro');
    const introTextDiv = document.getElementById('host-intro');
    const comicID = completeSet.dataset.comic;
    const hostText = comicContent[comicID].intro;
    if (i < hostText.length) {
        introTextDiv.innerHTML += hostText.charAt(i); //NEED TO FIND OUT WHY THIS IS STARTING AT CHARAT(5)!!!
        i++;
        setTimeout(animateHostIntro, speed);
    };
}

/* Is it worth it or possible to create async functions in order to have the animated host intro finish populating before running createJokeHTML?
function delayIntro () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(animateHostIntro)
        }, 2000);
    });
};*/

/* Now the written joke page is visible */





//This won't be useful until you use the chatGPT api or build in some kind of order in the initial JS object
let jokeNumber = 0

const createJokeHTML = (e/*check to make sure this is being used correctly*/) => {
    const comicID = completeSet.getAttribute('data-comic');

    const bitContainer = document.createElement('div');
    bitContainer.setAttribute('class', 'bit-container');
    completeSet.appendChild(bitContainer);
    const comicOutputContainer = document.createElement('div');
    comicOutputContainer.setAttribute('class', 'comic-output-container');
    bitContainer.appendChild(comicOutputContainer);
    const comicHeadshot = document.createElement('img');
    comicHeadshot.setAttribute('class', 'comic-headshot-for-bit');
    comicHeadshot.setAttribute('src', comicContent[comicID].headshot);//Not sure this will work yet
    comicOutputContainer.appendChild(comicHeadshot);
    const comicBitContainer = document.createElement('p');
    comicBitContainer.setAttribute('class', 'comic-bit-container');
    comicBitContainer.setAttribute('id', `comic-bit-${jokeNumber}`);
    comicOutputContainer.appendChild(comicBitContainer);
    comicBitContainer.innerHTML = comicContent[comicID].jokes[jokeNumber][jokeNumber];//IS THERE A WAY TO MAKE THIS TEXT LIKE `JOKE${JOKENUMBER}`?

    //NEED TO CREATE 2 DIFFERENT JS FUNCTION FOR ALL OF THIS (OR MORE) SO IT'S MORE CLEAN?
    const audienceFeedbackContainer = document.createElement('div');
    audienceFeedbackContainer.setAttribute('class', 'audience-feedback-container');
    audienceFeedbackContainer.setAttribute('id', `feedback-joke-${jokeNumber}`);//IS THIS NECESSARY? NEED TO KEEP TRACK OF JOKENUM ON EACH FEEDBACK CONTAINER?
    bitContainer.appendChild(audienceFeedbackContainer);
    const buttonLMAO = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonLMAO);
    buttonLMAO.setAttribute('id', `lmao-${jokeNumber}`);
    buttonLMAO.setAttribute('class', `feedback-button-${jokeNumber}`);
    
    buttonLMAO.innerHTML = 'LMAO';
    const buttonLOL = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonLOL);
    buttonLOL.setAttribute('id', `lol-${jokeNumber}`);
    buttonLOL.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonLOL.innerHTML = 'LOL';
    const buttonChuckle = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonChuckle);
    buttonChuckle.setAttribute('id', `chuckle-${jokeNumber}`);
    buttonChuckle.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonChuckle.innerHTML = 'Chuckle';
    const buttonMeh = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonMeh);
    buttonMeh.setAttribute('id', `meh-${jokeNumber}`);
    buttonMeh.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonMeh.innerHTML = 'Meh';
    const buttonCrickets = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonCrickets);
    buttonCrickets.setAttribute('id', `crickets-${jokeNumber}`);
    buttonCrickets.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonCrickets.innerHTML = 'Crickets';
    const buttonHeckle = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonHeckle);
    buttonHeckle.setAttribute('id', `heckle-${jokeNumber}`);
    buttonHeckle.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonHeckle.innerHTML = 'Heckle';
    const buttonLeave = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonLeave);
    buttonLeave.setAttribute('id', `leave-${jokeNumber}`);
    buttonLeave.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonLeave.innerHTML = 'Leave the Club';

//NEED TO ADD AN EVENT LISTENER TO THE FEEDBACK BUTTONS THEMSELVES?? THERE NEEDS TO BE A CLICK EVENT LISTENER TO GENERATE THE NEXT
//JOKE AND A SEPARATE(?) EVENT LISTENER TO CHANGE THE STYLING OF THE PREVIOUS JOKE'S BUTTONS. RIGHT?

    const audienceFeedbackButton = document.getElementsByClassName(`feedback-button-${jokeNumber}`);
    /*for (let i = 0; i < audienceFeedbackButton.length; i++) {
        audienceFeedbackButton[i].addEventListener('click', createJokeHTML);
    };*/
//NEED TO FIND A PLACE TO USE ALL OF THESE FUNCTIONS
    const identifySelectedFeedbackButton = (e) => {
        const clickedFeedbackButton = e.target.id;
        return clickedFeedbackButton;
    };

    //WHY DO I HAVE TO DECLARE THE FOLLOWING 2 VARIABLES OUTSIDE OF THE CREATEFEEDBACKBUTTONARRAY FUNCTION??
    const containerOfFeedbackButtons = document.getElementById(`feedback-joke-${jokeNumber}`);
    const feedbackButtonElements = containerOfFeedbackButtons.children;

    const createFeedbackButtonArray = () => {
        const feedbackButtonArray = [];
        //INCLUDING THESE VARIABLES WITHIN THE FUNC DOESN'T WORK ...const containerOfFeedbackButtons = document.getElementById(`feedback-joke-${jokeNumber}`);
        //const feedbackButtonElements = containerOfFeedbackButtons.children;
        for (let i = 0; i < feedbackButtonElements.length; i++) {
            feedbackButtonArray.push(feedbackButtonElements[i].id);
        }
        return feedbackButtonArray;
    };

    const createUnclickedFeedbackButtonArray = (e) => {
        const feedbackButtonClicked = identifySelectedFeedbackButton(e);
        const feedbackButtonsArray = createFeedbackButtonArray();
        const unclickedFeedbackButtonArray = feedbackButtonsArray.filter(buttonID => buttonID !== feedbackButtonClicked);
        return unclickedFeedbackButtonArray;
    }

    const darkenFeedbackButtons /*MUST REMEMBER TO EXECUTE THIS SOMEWHERE*/ = (e/*check to make sure this is used correctly*/) => {
        const unclickedFeedbackButtons = createUnclickedFeedbackButtonArray(e);
        const selectedButtonID = identifySelectedFeedbackButton(e);
        const selectedButton = document.getElementById(selectedButtonID);
        const feedbackButtonsIDs = createFeedbackButtonArray();

        selectedButton.style.color = 'black';
        selectedButton.style.backgroundColor = 'gold';
        selectedButton.style.borderColor = 'gold';
        selectedButton.style.cursor = 'not-allowed';
        //document.getElementById('logo').innerHTML = unclickedFeedbackButtons;
        //NEED TO REMOVE EVENT LISTENER FROM ALL BUTTONS, NOT JUST THE UNCLICKED ONES

        for (let i = 0; i < unclickedFeedbackButtons.length; i++) {
            let buttonInLoop = document.getElementById(unclickedFeedbackButtons[i]);
            buttonInLoop.style.color = 'rgb(57, 57, 57)';
            //document.getElementById(unclickedFeedbackButtons[i]).style.color = 'darkgrey';
            buttonInLoop.style.borderColor = 'rgb(57, 57, 57)';
            //THIS IS GIBBERISH - NEED TO COME BACK AND WRITE JS TO REMOVE YELLOW BG COLOR ... buttonInLoop.style.hoveColor
            buttonInLoop.style.cursor = 'not-allowed';
            
            //Add a looped remove event listener for all of the current jokeNumber buttons?
            //buttonInLoop.removeEventListener('click', createJokeHTML); //Not sure this is correct
        }

        for (let i = 0; i < feedbackButtonsIDs.length; i++) {
            let buttonInLoop = document.getElementById(feedbackButtonsIDs[i]);
            buttonInLoop.removeEventListener('click', createJokeHTML);
            buttonInLoop.removeEventListener('click', darkenFeedbackButtons);
        }
    };

    

    for (let i = 0; i < audienceFeedbackButton.length; i++) {
        audienceFeedbackButton[i].addEventListener('click', createJokeHTML);
        audienceFeedbackButton[i].addEventListener('click', darkenFeedbackButtons);
    };

    jokeNumber += 1;
};

//Related to line 125: Testing to try to figure out how to construct a promise and have functions timeout correctly

/* /* Is it worth it or possible to create async functions in order to have the animated host intro finish populating before running createJokeHTML?
const delayCreateJokeHTML = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(createJokeHTML);
        }, 2000);
    });
}*/

const startTheShow = async () => {
    containerChooseAComic.style.display = 'none';
    completeSet.style.display = 'block';
    //await delayIntro();
    setTimeout(animateHostIntro, 1000);
    setTimeout(createJokeHTML, 1000); //Need to await the prior function? Etiehr way, NEED TO MAKE IT ASYNC TO FUNCTION PROPERLY
    //await delayCreateJokeHTML();
}

startShow.addEventListener('click', startTheShow);

/*const feedbackSection = document.querySelectorAll('feedback-button'); ISSUE HERE IS THAT NOT HAVING ASYNC FUNCTIONS MEANS THIS ELEMENT DOESN'T EXIST YET */
//feedbackSection.addEventListener('click', createJokeHTML);

//const aboutTest = document.getElementById('lmao');
//aboutTest.addEventListener('click', createJokeHTML);

/*
How to accomplish the next part of injecting new content/text into the page?
- use a 1 second setTimeout after clicking "let's start the show" to append a child div to "overall-bit-container"
- have the div be an "animated" announcement as if from the host of the show (styled differently from the divs of the comic's bits)
- use a 2-second(?) timeout to then call a function that includes an api call [but first using my joke js object] and appends the first joke styled correctly
- on-click of the audience feedback button, call the chatGPT api [but first the joke object] and appends the second joke styled correctly
- evolve into basing the joke on the audience feedback
*/


/*const identifySelectedFeedbackButton = (e) => {
    const clickedFeedbackButton = e.target.id;
    return clickedFeedbackButton;
};

const createUnclickedFeedbackButtonArray = (e) => {
    const feedbackButtonClicked = identifySelectedFeedbackButton(e);
    const feedbackButtonsArray = document.getElementsByClassName(`feedback-button-${jokeNumber}`);
    const unclickedFeedbackButtonArray = feedbackButtonsArray.filter(buttonID => buttonID !== feedbackButtonClicked);
    return unclickedFeedbackButtonArray;
}

const darkenFeedbackButtons /*MUST REMEMBER TO EXECUTE THIS SOMEWHERE*/ //= (e/*check to make sure this is used correctly*/) => {
    /*const unclickedFeedbackButtons = createUnclickedFeedbackButtonArray(e);
    const selectedButton = identifySelectedFeedbackButton(e);

    selectedButton.style.color = 'black';
    selectedButton.style.backgroundColor = 'gold';
    selectedButton.style.border.color = 'gold';

    for (let i = 0; i < unclickedFeedbackButtons.length; i++) {
        const eachButton = document.getElementById(unclickedFeedbackButtons[i]);
        eachButton.style.color = 'dark grey';
        eachButton.style.border.color = 'dark grey';
        eachButton.style.cursor = 'not allowed';
        //Add a looped remove event listener for all of the current jokeNumber buttons?
        eachButton.removeEventListener('click', createJokeHTML); //Not sure this is correct
    }
};
const audienceFeedbackButton = document.getElementsByClassName(`feedback-button-${jokeNumber}`);
for (let i = 0; i < audienceFeedbackButton.length; i++) {
    //audienceFeedbackButton[i].addEventListener('click', createJokeHTML);
    audienceFeedbackButton[i].addEventListener('click', darkenFeedbackButtons);
};*/