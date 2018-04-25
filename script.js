function onYouTubeIframeAPIReady() {
  if(viewport().width >= 767) {
    var player;
    player = new YT.Player('ytVid', {
      videoId: '0b9iCENOZFM', // YouTube Video ID
      height: "100%",
      width: "100%",
      playerVars: {
        autoplay: 1, // Auto-play the video on load
        controls: 1, // Show pause/play buttons in player
        showinfo: 0, // Hide the video title
        modestbranding: 0, // Hide the Youtube Logo
        loop: 1, // Run the video in a loop
        fs: 0, // Hide the full screen button
        cc_load_policy: 0, // Hide closed captions
        iv_load_policy: 3, // Hide the Video Annotations
        autohide: 0 // Hide video controls when playing
      },
      events: {
        onReady: function(e) {
          e.target.mute();
        }
      }
    });
  } else {
    document.getElementById('ytVid').innerHTML = "PLOTSMUPRHY";
  }
}

//Determines dimensions of viewport for media queries in JS w/o JQuery
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}


////////WORD OF THE DAY SECTION --> SHOULD BE DEPRICATED TO SEPARATE DIR////////

let target;
let popmax;
let mutationRate;
let population;

var waitt = 0;

function altMethod() {
  var fileName = "pdocs/words.txt";
  var lines;

  var result = fetch(fileName).then((response) => {
    response.text().then(function(e) {
      lines = e.split("\n");
      var index = floor(random(lines.length));
      target = lines[index];
      console.log(target);
      
      popmax = 200;
      mutationRate = 0.01;
      population = new Population(target, mutationRate, popmax);
      waitt = 1;
    });
  });

  return target;
}

function setWord(data) {
  // BROKEN :-( data[0].substring(data[0].indexOf('>')+1, data[0].indexOf('<',2));
  //var i = floor(random(target.length));
  //target = "TFW Dictionary.com blocks your CORS requests";
  //data[i.toString()];
  //console.log(target);
  popmax = 200;
  mutationRate = 0.01;
  population = new Population(target, mutationRate, popmax);
  waitt = 1;
}

function setup() {
  var server_url = "https://learn-the-wotd.herokuapp.com/test";
  // BROKEN too loadStrings(server_url, setWord);
  target = altMethod(); //loadStrings("pdocs/words2.txt", setWord);
  //altMethod();
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
}


function draw(){
  if(waitt == 1 ) {
    if (!population.isFinished()) {
      population.naturalSelection();
      population.generate();
      population.calcFitness();
      population.evaluate();
      var word = population.getBest(); //TODO fetch from flask webserver...
      //DISPLAY INFO
      let statstext = "total generations:     " + population.getGenerations() + "<br>";
      statstext += "average fitness:       " + floor(population.getAverageFitness()*100) + "%<br>";
      statstext += "total population:      " + popmax + "<br>";
      statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

      document.getElementById('WotD').innerHTML = "\"" + word +"\"";
      document.getElementById('stats').innerHTML = statstext;
    }
  }
}
