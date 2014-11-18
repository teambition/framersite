background = new BackgroundLayer backgroundColor:"rgba(77, 208, 225, 1.00)"

layer = new Layer backgroundColor:"#fff", borderRadius:4

layer.center()
layer.shadowColor = "rgba(0,0,0,0.2)"

layer.states.add
	elevatedZ1:
		shadowY: 2
		shadowBlur: 10
	elevatedZ2:
		shadowY: 6
		shadowBlur: 20
	elevatedZ3:
		shadowY: 12
		shadowBlur: 15
	elevatedZ4:
		shadowY: 16
		shadowBlur: 28
	elevatedZ5:
		shadowY: 27
		shadowBlur: 24
		
layer.states.animationOptions =
	curve: "ease-in"
	time: 0.15
		
layer.on Events.Click, ->
	layer.states.next()
	layer.html = layer.states.current

