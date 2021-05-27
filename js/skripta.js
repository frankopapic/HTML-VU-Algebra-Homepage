new TypeIt('#myElement', {
  speed: 100,
  startDelay: 1000,
  deleteSpeed: 200,
  lifelike : true
})
.type('Budi izvrstan u onom što vidiš.')
.pause(600)
.delete(6)
.pause(850)
.type('voliš.')
.pause(950)
.break()
.type('<p id="podebljano">ZAISKRI.</p>')
.go();