let song;
let fft;

let userControl;

function preload() {
  song = loadSound("sample-visualisation.mp3");
}

function setup() {
  createCanvas(800, 600);

  // Initialize the FFT object
  fft = new p5.FFT();

  // Create a user control slider
  userControl = createSlider(0, 1, 0.5, 0.01);
  userControl.position(10, height - 50);
}

function draw() {
  background(30, 30, 30);

  // Analyze the audio spectrum
  let spectrum = fft.analyze();
  let userValue = userControl.value();

  // Disable drawing outlines
  noStroke();

  // Visualize the spectrum with ellipses
  for (let i = 0; i < spectrum.length; i += 10) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height) * userValue;
    let w = width / spectrum.length;

    // Map color based on frequency index
    let c = color(map(i, 0, spectrum.length, 0, 255), 255, 255);
    fill(c);

    // Draw ellipses
    ellipse(x, height / 2, w, h);
  }

  // Calculate and visualize the spectral centroid
  let spectralCentroid = fft.getCentroid();
  let centroidPlot = map(log(spectralCentroid), 0, log(spectrum.length), 0, width);

  // Draw a line indicating the spectral centroid
  stroke(155, 200, 100);
  line(centroidPlot, 0, centroidPlot, height);

   // Display the spectral centroid value
  fill(255);
  text('Spectral Centroid: ' + round(spectralCentroid) + ' Hz', 10, 20);
}

function mousePressed() {
  // Toggle play/pause of the audio
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}