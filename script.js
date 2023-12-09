/*
10/23 near-term things to add:
-udpate readme on github
-make design of about page better
-update background image so there is parallax scrolling(?) over it and it stays in place?
-anything accessibility-related. add alt tags and Aria labels. what else?
-make the page auto-scroll down so that the entirety of the next joke is exposed without scrolling
-update darkenFeedbackButtons func to remove hover pseudo class styling
-come up with a Jeselnik path where the jokes are pre-written in a js object, and the punchline is blurred (so it doesn't get spoiled) and you click to expose it
-figure out how to anchor the footer to the bottom of the html doc, even when dom elements are being injected - have js that controls "if main height < vh, make footer sticky to bottom? IF NOT, make footer relative????"
*/

const sectionHero = document.getElementById('hero-section');
const buttonReady = document.getElementById('ready');
const containerChooseAComic = document.getElementById('choose-a-comic-container');
const choiceComic = document.getElementsByClassName('comic-choice'); /* May need to come back to this and change to getQuerySelectorAll?? */
const startShow = document.getElementById('start-show');
const completeSet = document.getElementById('complete-set');
/*Just to test the initial js logic as a starting point*/
//const testLMAO = document.getElementsByClassName(`feedback-button-${jokeNumber}`);


/*Function used when this was initially a single HTML file:
const showChooseAComic = () => {
    sectionHero.style.display = 'none';
    containerChooseAComic.style.display = 'block';
}

buttonReady.addEventListener('click', showChooseAComic);
*/

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
//const elementsOfComics = containerOfComics.children;

const createArrayOfComics = () => {
    const elementsOfComics = containerOfComics.children; //Seeing if this works here instead of line 48
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
    //Updating session storage with comic name to persist to the next page
    sessionStorage.setItem('comic-name', selectedComic);
    //End session storage section
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
        intro: "12345He has recorded three hour-long specials - \"Shakespeare,\" \"Caligula,\" \"Thoughts and Prayers,\" and \"Fire in the Maternity Ward.\" He was the host of \"The Jeselnik Offensive\" on Comedy Central, until they fired him for celebrating a shark attack. Please welcome to the page... Anthony Jeselnik!",
        jokes: [
            {0/*NEED TO INVESTIGATE THIS AGAIN TO MAKE SURE IT WORKS*/: 'I\'ve lived in New York for 5 years. New York is the best city in the world. Not only do I want to record my first album there, I wanna bury my kids there.'},
            {1: 'Who do you think is smarter: Jesus or Buddha? I mean, just in terms of not getting themselves crucified. Maybe the request to ChatGPT should be to keep these jokes under a certain word count in order to make them easier to consume? This is a test to figure out how long a joke can be while keeping it short enough and still be short enough to be pleasant. This text is about 80 word long now.'},
            {2: 'My sister just had a baby, but she won\'t let me hold it. She\'s afraid I\'m gonna dropt it. Like I\'m some kind of idiot. Like I don\'t have a million other ways.. to hurt that baby.'},
            {3: 'This is not yet connected to ChatGPT and is only working off of sample jokes. No more jokes available right now.'}
        ]
    },
    'Norm MacDonald': {
        headshot: 'https://imagez.tmz.com/image/a9/1by1/2021/09/14/a9f0bff08c8b40949bac75319542e643_xl.jpg',
        intro: "12345Smart people consider him the best host of Weekend Update on SNL. He recorded 3 comedy albums - \"Ridiculous,\" \"Me Doing Stand-Up,\", \"Hitler's Dog, Gossip & Trickery,\" and \"Norm MacDonald: Nothing Special.\". Please welcome the old chunk of coal... Norm MacDonald!",
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    },
    'Michelle Wolf': {
        headshot: 'https://images.squarespace-cdn.com/content/v1/55695205e4b0b0ed5ed23665/1629120664899-IK4KXUBNIGBJ6IEHIXLU/Michelle+Wolf.jpg?format=2500w',
        intro: '12345She\'s been a writer and contributor for \"The Late Show\" with Seth Myers and \"The Daily Show\" with Trevor Noah. She\'s recorded three specials and was the host of the White House Press Correspondents dinner in 2018. Please welcome to the page... Michelle Wolf!',
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    },
    'Hannibal Buress': {
        headshot: 'https://i.guim.co.uk/img/media/ebfd8cd9e6e7eeca744e77f19ede9686ebdfcdf1/201_461_2502_1501/master/2502.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=81dd5734c30399d1744d3383a68ff44e',
        intro: '12345He\'s a writer, rapper, and comedian. In a 2014 performance in Philadelphia, he told jokes about Bill Cosby\'s history with sexual assault, which kicked off the public\'s awareness of Cosby being a major asshole and hypocrite. Please welcome to the page... Hannibal Buress!',
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    },
    'Maria Bamford': {
        headshot: 'https://media.gq.com/photos/64f7525d949fa60bcaf85cb6/1:1/w_1125,h_1125,c_limit/bamford.jpg',
        intro: '12345She\'s recorded 9 specials, and her material has focused on family issues, depression, anxiety, and suicide since before it was cool to be so forthcoming about those struggles. Please welcome the old baby to the page... Maria Bamford!',
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    },
    'Ricky Gervais': {
        headshot: 'https://media.gq.com/photos/5893b170fa95131655778529/1:1/w_1330,h_1330,c_limit/gq-ricky-gervais.jpg',
        intro: '12345You can thank him for giving us \"The Office\" and being an intelligent critic of organized religion. He\'s recorded multiple specials and was included in Time\'s list of 100 most influential people in the world. Please welcome to the page... Ricky Gervais!',
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
    const comicID = sessionStorage.getItem('comic-name'); //completeSet.dataset.comic;
    //completeSet.innerHTML = comicID;
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
let jokeNumber = 0;
let jokeOrder;

const createJokeOrder = () => {
    const jokeOrderOptions = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
    jokeOrder = jokeOrderOptions[jokeNumber];
    return jokeOrder;
}

let reactionPromptObj = {
    lmao: 'laughed their asses off at your last joke',
    lol: 'laughed loudly at your last joke',
    chuckle: 'laughed audibly but not loudly at your last joke',
    smile: 'thought your last joke was amusing but didn\'t laugh out loud',
    meh: 'didn\'t laugh at your last joke but also didn\'t hate it',
    crickets: 'didn\'t laugh at your last joke and wasn\'t amused by it at all',
    heckle: 'verbally heckled you after your last joke',
    leave: 'hated your last joke so much that they\'re walking out of the club' //Will need to transform the innerHTML of the corresponding button so it can access the object property
};

/*
const constructOpenAIPrompt = () => {
    const nextJoke = createJokeOrder();
    const selectedFeedback = identifySelectedFeedbackButton(e);
    const lastReaction = reactionPromptObj[selectedFeedback]; //need to remove joke number from reaction button id value
    const comicName = sessionStorage.getItem('comic-name'); //completeSet.dataset.comic;
    return `Tell the ${nextJoke} joke of a stand-up performance as if you're ${comicName} and the audience ${lastReaction}.`;
}

const openAIRequest = async () => {
    const apiURL = 'https://api.openai.com/v1/chat/completions';
    const apiKey = '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';
    const nextPrompt = constructOpenAIPrompt();
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: `${nextPrompt}`}]
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.log(error);
        console.log(`Technology issues aren't funny.`)
    };
};
*/


//Function close to finished but incomplete?
/*const createReactionPrompt = feedbackClicked => {
    let reaction = feedbackClicked.innerHTML;
    const reactionPrompt = reactionPromptObj.[reaction];
    return `Be aware that the audience ${reactionPrompt}.`
}*/

//OpenAI api key: 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


const createJokeHTML = (e/*check to make sure this is being used correctly*/) => {
    
    const comicID = sessionStorage.getItem('comic-name'); //completeSet.getAttribute('data-comic');

    const bitContainer = document.createElement('div');
    bitContainer.setAttribute('class', 'bit-container');
    bitContainer.setAttribute('id', `bit-${jokeNumber}`);
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
    /*THIS IS WHERE YOU SET INNERHTML TO CHATGPT OUTPUT*//*comicBitContainer.innerHTML = constructJoke;*/ //comicContent[comicID].jokes[jokeNumber][jokeNumber];//IS THERE A WAY TO MAKE THIS TEXT LIKE `JOKE${JOKENUMBER}`?

    //NEED TO CREATE 2 DIFFERENT JS FUNCTION FOR ALL OF THIS (OR MORE) SO IT'S MORE CLEAN?
    const audienceFeedbackContainer = document.createElement('div');
    audienceFeedbackContainer.setAttribute('class', 'audience-feedback-container');
    audienceFeedbackContainer.setAttribute('id', `feedback-joke-${jokeNumber}`);//IS THIS NECESSARY? NEED TO KEEP TRACK OF JOKENUM ON EACH FEEDBACK CONTAINER?
    bitContainer.appendChild(audienceFeedbackContainer);
    const buttonLMAO = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonLMAO);
    buttonLMAO.setAttribute('id', `lmao`);
    buttonLMAO.setAttribute('class', `feedback-button-${jokeNumber}`);
    
    buttonLMAO.innerHTML = 'LMAO';
    const buttonLOL = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonLOL);
    buttonLOL.setAttribute('id', `lol`);
    buttonLOL.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonLOL.innerHTML = 'LOL';
    const buttonChuckle = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonChuckle);
    buttonChuckle.setAttribute('id', `chuckle`);
    buttonChuckle.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonChuckle.innerHTML = 'Chuckle';
    const buttonSmile = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonSmile);
    buttonSmile.setAttribute('id', `smile`);
    buttonSmile.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonSmile.innerHTML = 'Smile';
    const buttonMeh = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonMeh);
    buttonMeh.setAttribute('id', `meh`);
    buttonMeh.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonMeh.innerHTML = 'Meh';
    const buttonCrickets = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonCrickets);
    buttonCrickets.setAttribute('id', `crickets`);
    buttonCrickets.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonCrickets.innerHTML = 'Crickets';
    const buttonHeckle = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonHeckle);
    buttonHeckle.setAttribute('id', `heckle`);
    buttonHeckle.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonHeckle.innerHTML = 'Heckle';
    const buttonLeave = document.createElement('button');
    audienceFeedbackContainer.appendChild(buttonLeave);
    buttonLeave.setAttribute('id', `leave`);
    buttonLeave.setAttribute('class', `feedback-button-${jokeNumber}`);
    buttonLeave.innerHTML = 'Leave';

//NEED TO ADD AN EVENT LISTENER TO THE FEEDBACK BUTTONS THEMSELVES?? THERE NEEDS TO BE A CLICK EVENT LISTENER TO GENERATE THE NEXT
//JOKE AND A SEPARATE(?) EVENT LISTENER TO CHANGE THE STYLING OF THE PREVIOUS JOKE'S BUTTONS. RIGHT?

    const audienceFeedbackButton = document.getElementsByClassName(`feedback-button-${jokeNumber}`);
    /*for (let i = 0; i < audienceFeedbackButton.length; i++) {
        audienceFeedbackButton[i].addEventListener('click', createJokeHTML);
    };*/
//NEED TO FIND A PLACE TO USE ALL OF THESE FUNCTIONS
    /*
    const identifySelectedFeedbackButton = (e) => {
        const clickedFeedbackButton = e.target.id;
        return clickedFeedbackButton;
    };
    */

    /*
    const identifySelectedFeedbackButton = (e) => {
        const clickedFeedbackButton = e.target.id;
        return clickedFeedbackButton;
    };
    */
    const constructInitialOpenAIPrompt = () => {//Created this func in order to create a conditional for creating the opener or following jokes, but one requires the 'e' as an argument and the other doesn't, so i don't think this will work
        const firstJoke = 'first';
        const comicName = sessionStorage.getItem('comic-name');
        return `Tell the ${firstJoke} joke of a stand-up performance as if you're ${comicName} and the audience is excited to see you perform.`;
    };

    const constructOpenAIPrompt = (e) => {//ADDING 'e' as func argument in order to create a conditional!!
        const nextJoke = createJokeOrder();
        const identifySelectedFeedbackButton = (e) => {
            const clickedFeedbackButton = e.target.id;
            return clickedFeedbackButton;
        };
        const selectedFeedback = identifySelectedFeedbackButton(e);
        const lastReaction = reactionPromptObj[selectedFeedback]; //need to remove joke number from reaction button id value
        const comicName = sessionStorage.getItem('comic-name'); //completeSet.dataset.comic;
        return `Tell the ${nextJoke} joke of a stand-up performance as if you're ${comicName} and the audience ${lastReaction}.`;
    }
    
    const openAIRequest = async () => {
        const apiURL = 'https://api.openai.com/v1/chat/completions';
        const apiKey = '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';
        const nextPrompt = constructOpenAIPrompt();
        try {
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{role: 'user', content: `${nextPrompt}`}]
                }),
            });
    
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.log(error);
            console.log(`Technology issues aren't funny.`)
        };
    };

    const constructJoke = openAIRequest();
    
    comicBitContainer.innerHTML = constructJoke;

    //Wrapper for OpenAI stuff
    //End wrapper for OpenAI stuff

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

    const newestJokeContainer = document.getElementById(`bit-${jokeNumber}`);
    newestJokeContainer.scrollIntoView(); //NEED TO FIGURE OUT HOW TO ANCHOR THIS TO TOP OF ELEMENT. MAYBE MAIN ELEMENT'S OFFSET FROM TOP IS CAUSING THE PROBLEM?

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
    //containerChooseAComic.style.display = 'none';
    //completeSet.style.display = 'block';
    //await delayIntro();
    setTimeout(animateHostIntro, 1000);
    setTimeout(createJokeHTML, 10000); //Need to await the prior function? Etiehr way, NEED TO MAKE IT ASYNC TO FUNCTION PROPERLY
    //await delayCreateJokeHTML();
}

document.addEventListener('DOMContentLoaded', startTheShow);
/*Code to test what's going wrong with event listener
const changeLogoText = () => {
    const logoText = document.getElementById('logo-text');
    logoText.innerHTML = 'TEST';
};

completeSet.addEventListener('click', changeLogoText);
*/
//startShow.addEventListener('click', startTheShow);

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