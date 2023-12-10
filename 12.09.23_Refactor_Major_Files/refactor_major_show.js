//TO DO
//Figure out how to await the execution of the intro before the openAI api call is done. The event loop is causing the API call to be resolved before it has dom content to populate?
//Have announcement fade out and disappear before first joke appears.


//Object to house info on each comic and text for introducing each comic. For the first iteration, I don't want ChatGPT to create the comic intros.
const comicContent = {
    'Anthony Jeselnik': {
        name: 'Anthony Jeselnik',
        headshot: 'https://www.inquirer.com/resizer/z5H1_s5XVkY0BliLYH6pHhgMCXI=/760x507/smart/filters:format(webp)/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/JNU76P5V6FFPJJIZL3DIMLU6GE.jpg',
        intro: "He has recorded three hour-long specials - \"Shakespeare,\" \"Caligula,\" \"Thoughts and Prayers,\" and \"Fire in the Maternity Ward.\" He was the host of \"The Jeselnik Offensive\" on Comedy Central, until they fired him for celebrating a shark attack. Please welcome to the page... Anthony Jeselnik!",
        jokes: [
            {0/*NEED TO INVESTIGATE THIS AGAIN TO MAKE SURE IT WORKS*/: 'I\'ve lived in New York for 5 years. New York is the best city in the world. Not only do I want to record my first album there, I wanna bury my kids there.'},
            {1: 'Who do you think is smarter: Jesus or Buddha? I mean, just in terms of not getting themselves crucified. Maybe the request to ChatGPT should be to keep these jokes under a certain word count in order to make them easier to consume? This is a test to figure out how long a joke can be while keeping it short enough and still be short enough to be pleasant. This text is about 80 word long now.'},
            {2: 'My sister just had a baby, but she won\'t let me hold it. She\'s afraid I\'m gonna dropt it. Like I\'m some kind of idiot. Like I don\'t have a million other ways.. to hurt that baby.'},
            {3: 'This is not yet connected to ChatGPT and is only working off of sample jokes. No more jokes available right now.'}
        ]
    },
    'Norm MacDonald': {
        name: 'Norm MacDonald',
        headshot: 'https://imagez.tmz.com/image/a9/1by1/2021/09/14/a9f0bff08c8b40949bac75319542e643_xl.jpg',
        intro: "He was the best host of Weekend Update on SNL and is well known for always doing important comedy. He recorded 3 comedy albums - \"Ridiculous,\" \"Me Doing Stand-Up,\", \"Hitler's Dog, Gossip & Trickery,\" and \"Norm MacDonald: Nothing Special.\". Please welcome the old chunk of coal... Norm MacDonald!",
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    },
    'Michelle Wolf': {
        name: 'Michelle Wolf',
        headshot: 'https://images.squarespace-cdn.com/content/v1/55695205e4b0b0ed5ed23665/1629120664899-IK4KXUBNIGBJ6IEHIXLU/Michelle+Wolf.jpg?format=2500w',
        intro: 'She\'s been a writer and contributor for \"The Late Show\" with Seth Myers and \"The Daily Show\" with Trevor Noah. She\'s recorded three specials and was the host of the White House Press Correspondents dinner in 2018. Please welcome to the page... Michelle Wolf!',
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    },
    'Hannibal Buress': {
        name: 'Hannibal Buress',
        headshot: 'https://i.guim.co.uk/img/media/ebfd8cd9e6e7eeca744e77f19ede9686ebdfcdf1/201_461_2502_1501/master/2502.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=81dd5734c30399d1744d3383a68ff44e',
        intro: 'He\'s a writer, rapper, and comedian. In a 2014 performance in Philadelphia, he told jokes about Bill Cosby\'s history with sexual assault, which kicked off the public\'s awareness of Cosby being a major asshole and hypocrite. Please welcome to the page... Hannibal Buress!',
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    },
    'Maria Bamford': {
        name: 'Maria Bamford',
        headshot: 'https://media.gq.com/photos/64f7525d949fa60bcaf85cb6/1:1/w_1125,h_1125,c_limit/bamford.jpg',
        intro: 'She\'s recorded 9 specials, and her material has focused on family issues, depression, anxiety, and suicide since before it was cool to be so forthcoming about those struggles. Please welcome the old baby to the page... Maria Bamford!',
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    },
    'Ricky Gervais': {
        name: 'Ricky Gervais',
        headshot: 'https://media.gq.com/photos/5893b170fa95131655778529/1:1/w_1330,h_1330,c_limit/gq-ricky-gervais.jpg',
        intro: 'You can thank him for giving us \"The Office\" and being an intelligent critic of organized religion. He\'s recorded multiple specials and was included in Time\'s list of 100 most influential people in the world. Please welcome to the page... Ricky Gervais!',
        jokes: [
            {0: 'Joke 0'},
            {1: 'Joke 1'},
            {2: 'Joke 2'}
        ]
    }
};


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
};

//The variables (jokeNumber + jokeOrder), createJokeOrder function, and reactionPromptObj exist to help engineer structurally similar but dynamic prompts to OpenAI's API
let jokeNumber = 0;
let jokeOrder;

const createJokeOrder = () => {
    const jokeOrderOptions = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
    jokeOrder = jokeOrderOptions[jokeNumber];
    return jokeOrder;
};

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

//Functions to construct HTML framework for each joke and to have ChatGPT create each joke
const completeSet = document.getElementById('complete-set');//Should I include this in a function instead? How many times and where is it used?

//Function to create the HTML that will house the comic's headshot and the joke
const createBitHTML = () => {
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
};

//Function to create the HTML that will house the feedback options for the audience
const createFeedbackHTML = () => {//When this function is invoked, should it be delayed (setTimeout) by ~10 seconds to give time for user to read the joke? Or will that be a distration to see it pop up?
    //const bitContainer = document.createElement('div');
    const bitContainer = document.getElementById(  `bit-${jokeNumber}`);
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
};

//WRAPPER FOR BUTTON STYLING AND LISTENERS

//Why do I have to declare these variables outside of the createFeedbackButtonArray function?
const containerOfFeedbackButtons = document.getElementById(`feedback-joke-${jokeNumber}`);
//const feedbackButtonElements = containerOfFeedbackButtons.children;

const createFeedbackButtonArray = () => {
    const feedbackButtonElements = containerOfFeedbackButtons.children;
    const feedbackButtonArray = [];
    //Including these variables within the function doesn't work, why? ...const containerOfFeedbackButtons = document.getElementById(`feedback-joke-${jokeNumber}`);
    //const feedbackButtonElements = containerOfFeedbackButtons.children;
    for (let i = 0; i < feedbackButtonElements.length; i++) {
        feedbackButtonArray.push(feedbackButtonElements[i].id);
    }
    return feedbackButtonArray;
};

const createUnclickedFeedbackButtonArray = (e) => {
    //should i remove identifyselectedfeedbackbutton func and place it above the first use of it?
    const identifySelectedFeedbackButton = (e) => {
        const clickedFeedbackButton = e.target.id;
        return clickedFeedbackButton;
    };
    const feedbackButtonClicked = identifySelectedFeedbackButton(e);
    const feedbackButtonsArray = createFeedbackButtonArray();
    const unclickedFeedbackButtonArray = feedbackButtonsArray.filter(buttonID => buttonID !== feedbackButtonClicked);
    return unclickedFeedbackButtonArray;
}

const styleClickedFeedbackButtonSection /*MUST REMEMBER TO EXECUTE THIS SOMEWHERE*/ = (e/*check to make sure this is used correctly*/) => {
    //should i remove identifyselectedfeedbackbutton func and place it above the first use of it?
    const identifySelectedFeedbackButton = (e) => {
        const clickedFeedbackButton = e.target.id;
        return clickedFeedbackButton;
    };
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
};

//END WRAPPER FOR BUTTON STYLING AND LISTENERS


//Function to engineer the prompt to OpenAI to request the opening joke of the "performance"
createOpeningJokeOpenAIPrompt = () => {//Seems like this doesn't need to be a function
    const comicName = sessionStorage.getItem('comic-name');
    return `Tell the first joke of a stand-up performance as if you're ${comicName} and the audience is excited to see you perform.`;
};

//Function to engineer the prompts to OpenAI to request any joke after the opening joke
createFollowingJokeOpenAIPrompt = (e) => {
    const nextJoke = createJokeOrder();
    const identifySelectedFeedbackButton = (e) => {
        const clickedFeedbackButton = e.target.id;
        return clickedFeedbackButton;
    };
    const selectedFeedback = identifySelectedFeedbackButton(e);
    const lastReaction = reactionPromptObj[selectedFeedback]; //need to remove joke number from reaction button id value
    const comicName = sessionStorage.getItem('comic-name'); //completeSet.dataset.comic;
    return `Tell the ${nextJoke} joke of a stand-up performance as if you're ${comicName} and the audience ${lastReaction}.`;
};

//Function to make the proper call to OpenAI's API for the opening joke. This is called on the initial page load (specifically, DOMContentLoaded)
const openAIRequestOpener = async () => {
    const apiURL = 'https://api.openai.com/v1/chat/completions';
    const apiKey = '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';
    const firstPrompt = createOpeningJokeOpenAIPrompt();
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: `${firstPrompt}`}]
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.log(error);
        console.log(`Technology issues aren't funny.`)
    };
};

//Function to make the proper calls to OpenAI's API for any joke after the first one. This is called in response to a click event on a feedback button in the prior joke.
const openAIRequestFollowers = async (e) => {
    const apiURL = 'https://api.openai.com/v1/chat/completions';
    const apiKey = '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';
    const followingPrompts = createFollowingJokeOpenAIPrompt(e);
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: `${followingPrompts}`}]
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.log(error);
        console.log(`Technology issues aren't funny.`)
    };
};


//Initial attempt at creating a function for the intro and first joke
const populateAnnouncementAndFirstJoke = async () => {//Will need to edit this with timeouts and maybe creating internal func requests in separate functions
    //animateHostIntro();
    setTimeout(animateHostIntro, 1000);
    setTimeout(createBitHTML, 10000);
    setTimeout(createFeedbackHTML, 11000);//setTimeout(createFeedbackHTML, 5000);//Goal is to not display the feedback options at same time as the joke. Should it be created and hidden, then setTimeout to change display to block?
    const firstJoke = await openAIRequestOpener();
    const firstJokeContainer = document.getElementById(`comic-bit-${jokeNumber}`);
    firstJokeContainer.innerHTML = firstJoke;

    const audienceFeedbackButton = document.getElementsByClassName(`feedback-button-${jokeNumber}`);
    for (let i = 0; i < audienceFeedbackButton.length; i++) {
        audienceFeedbackButton[i].addEventListener('click', populateFollowingJokes);//Since I reference populateFollowingJokes before I write the corresponding function, do I have to move this function to below populateFollowingJokes? 
        audienceFeedbackButton[i].addEventListener('click', styleClickedFeedbackButtonSection);//Need to come back to this and remove the event listener after it's clicked. Something here is confusing me about how to structure the command.
    };

    const newestJokeContainer = document.getElementById(`bit-${jokeNumber}`);
    newestJokeContainer.scrollIntoView(); //NEED TO FIGURE OUT HOW TO ANCHOR THIS TO TOP OF ELEMENT. MAYBE MAIN ELEMENT'S OFFSET FROM TOP IS CAUSING THE PROBLEM?

    jokeNumber += 1;
};

//Initial attempt at creating a function for the following jokes
const populateFollowingJokes = (e) => {
    createBitHTML();
    createFeedbackHTML();
    const followingJoke = openAIRequestFollowers();
    const followingJokeContainer = document.getElementById(`comic-bit-${jokeNumber}`);
    followingJokeContainer.innerHTML = followingJoke;

    const audienceFeedbackButton = document.getElementsByClassName(`feedback-button-${jokeNumber}`);
    for (let i = 0; i < audienceFeedbackButton.length; i++) {
        audienceFeedbackButton[i].addEventListener('click', populateFollowingJokes);//Learn again how it works to reference a function within itself. This is conceptually confusing.
        audienceFeedbackButton[i].addEventListener('click', styleClickedFeedbackButtonSection);
    };

    const newestJokeContainer = document.getElementById(`bit-${jokeNumber}`);
    newestJokeContainer.scrollIntoView(); //NEED TO FIGURE OUT HOW TO ANCHOR THIS TO TOP OF ELEMENT. MAYBE MAIN ELEMENT'S OFFSET FROM TOP IS CAUSING THE PROBLEM?

    jokeNumber += 1;//Keep this as last line within the function
};


//JS to execute the functions as needed for show.html
document.addEventListener('DOMContentLoaded', populateAnnouncementAndFirstJoke);

//To removed clicks activating feedback button styling, have a conditional that's something like this?
//If jokeNumber >1, find all the feedback buttons of jokeNumber minus 1 and remove the ability to click and change the styling of them


//INITIAL ATTEMPT AT JS STRUCTURE BELOW - COMMENT OUT AS IT IS MIGRATED AND REFACTORED ABOVE

//const createJokeHTML = (e) => {
    
    //const comicID = sessionStorage.getItem('comic-name'); //completeSet.getAttribute('data-comic');
    /*MOVED TO CREATEBITHTML FUNCTION
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
    */
    /*THIS IS WHERE YOU SET INNERHTML TO CHATGPT OUTPUT*//*comicBitContainer.innerHTML = constructJoke;*/ //comicContent[comicID].jokes[jokeNumber][jokeNumber];//IS THERE A WAY TO MAKE THIS TEXT LIKE `JOKE${JOKENUMBER}`?

    //NEED TO CREATE 2 DIFFERENT JS FUNCTION FOR ALL OF THIS (OR MORE) SO IT'S MORE CLEAN?
    /*MOVED TO CREATEFEEDBACKHTML FUNCTION
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
    */

//NEED TO ADD AN EVENT LISTENER TO THE FEEDBACK BUTTONS THEMSELVES?? THERE NEEDS TO BE A CLICK EVENT LISTENER TO GENERATE THE NEXT
//JOKE AND A SEPARATE(?) EVENT LISTENER TO CHANGE THE STYLING OF THE PREVIOUS JOKE'S BUTTONS. RIGHT?

    //const audienceFeedbackButton = document.getElementsByClassName(`feedback-button-${jokeNumber}`);
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
    /*MOVED TO CREATEOPENINGJOKEOPENAIPROMPT FUNCTION
    const constructInitialOpenAIPrompt = () => {//Created this func in order to create a conditional for creating the opener or following jokes, but one requires the 'e' as an argument and the other doesn't, so i don't think this will work
        const firstJoke = 'first';
        const comicName = sessionStorage.getItem('comic-name');
        return `Tell the ${firstJoke} joke of a stand-up performance as if you're ${comicName} and the audience is excited to see you perform.`;
    };
    */

    /*MOVED TO CREATEFOLLOWINGOPENAIPROMPT
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
    */
    
    /*MOVED TO OPENAIRREQUESTOPENER/FOLLOWERS FUNCTIONS
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

    /*MOVED const constructJoke = openAIRequest();*/
    
    /*MOVED comicBitContainer.innerHTML = constructJoke;*/

    /*MOVED BEG
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
        //should i remove identifyselectedfeedbackbutton func and place it above the first use of it?
        const identifySelectedFeedbackButton = (e) => {
            const clickedFeedbackButton = e.target.id;
            return clickedFeedbackButton;
        };
        const feedbackButtonClicked = identifySelectedFeedbackButton(e);
        const feedbackButtonsArray = createFeedbackButtonArray();
        const unclickedFeedbackButtonArray = feedbackButtonsArray.filter(buttonID => buttonID !== feedbackButtonClicked);
        return unclickedFeedbackButtonArray;
    }

    const darkenFeedbackButtons = (e) => {
        //should i remove identifyselectedfeedbackbutton func and place it above the first use of it?
        const identifySelectedFeedbackButton = (e) => {
            const clickedFeedbackButton = e.target.id;
            return clickedFeedbackButton;
        };
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
    MOVED END*/
    
    /*MOVED TO THE INSIDE OF EACH JOKE POPULATE FUNCTION
    const audienceFeedbackButton = document.getElementsByClassName(`feedback-button-${jokeNumber}`);
    for (let i = 0; i < audienceFeedbackButton.length; i++) {
        audienceFeedbackButton[i].addEventListener('click', createJokeHTML);
        audienceFeedbackButton[i].addEventListener('click', styleClickedFeedbackButtonSection);
    };

    const newestJokeContainer = document.getElementById(`bit-${jokeNumber}`);
    newestJokeContainer.scrollIntoView(); //NEED TO FIGURE OUT HOW TO ANCHOR THIS TO TOP OF ELEMENT. MAYBE MAIN ELEMENT'S OFFSET FROM TOP IS CAUSING THE PROBLEM?

    jokeNumber += 1;
};*/

//Related to line 125: Testing to try to figure out how to construct a promise and have functions timeout correctly

/* /* Is it worth it or possible to create async functions in order to have the animated host intro finish populating before running createJokeHTML?
const delayCreateJokeHTML = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(createJokeHTML);
        }, 2000);
    });
}*/

/*MOVED AND EDITED
 const startTheShow = async () => {
    //containerChooseAComic.style.display = 'none';
    //completeSet.style.display = 'block';
    //await delayIntro();
    setTimeout(animateHostIntro, 1000);
    setTimeout(createJokeHTML, 10000); //Need to await the prior function? Etiehr way, NEED TO MAKE IT ASYNC TO FUNCTION PROPERLY
    //await delayCreateJokeHTML();
}
}
document.addEventListener('DOMContentLoaded', startTheShow);
*/