
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleBtn() {
    button.disabled = !button.disabled;
}

// passing joke to voice api
function tellMejoke(joke) { 

  VoiceRSS.speech({
    key: '0340e15f51864f9eba15cb35519bc87a',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,  
})
}

async function getJokes() {

    let joke = '';

    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json(); 
        
        if(data.setup) {
            joke = `${data.setup} ...${data.delivery}`;
        } else {
            joke = data.joke; 
        }

        // Text to speech
        tellMejoke(joke);

        // Disable Button
        toggleBtn();
    }

    catch (err){
        console.log(err);
    }
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleBtn);

