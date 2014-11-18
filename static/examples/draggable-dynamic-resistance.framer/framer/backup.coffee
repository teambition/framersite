# This imports all the layers for "Examples Page - Flow 6" into examplesPageFlow6Layers
examplesPageFlow6Layers = Framer.Importer.load "imported/Examples Page - Flow 6"

bg = new BackgroundLayer backgroundColor: "#28AFFA"
	
layerA = new Layer width:100, height:100, backgroundColor: "#fff", borderRadius: 3
layerA.center()

layerA.draggable.enabled = true


initX = layerA.x
initMidX = layerA.midX
initY = layerA.y
screenHeight = Framer.Device.screen.height
screenWidth = Framer.Device.screen.width

# When the layer is being dragged, we change the speed (resistance) dynamically, based on how far away the cursor is from the starting point of the layer.
layerA.on Events.DragMove, (event) ->
	
	# Grab the delta for x distance (We do this for X and not for Y because the bobble is horizontally in the middle of the screen, so delta can be positive or negative
	deltaX = initMidX - event.x
	
	# Since the Y drag can basically only go in one direction, we can immediately map the range. This handy function takes the current y position and maps that from the initial Y to the maximum Y, in this case the window height to a 0.5 to 1 range. This means that the further away from the layer's initial position the drag is, the more resistance we add, such that if you drag all the way to the bottom of the view, the layer will eventually be unable to go further.
	speedY = Utils.mapRange(event.y, screenHeight, initY, 0.5, 1)
	
	# Since you can drag left or right, we need to map the range correctly. If deltaX is positive, we map from the start of the view to the mid point of the layer (everything left of the layer). If the deltaX is negative, we map from the mid point of the layer to the edge of the screen (everything right of the layer).
	if deltaX > 0
		speedX = Utils.mapRange(event.x, 0, initMidX, 0.5, 1)
	else
		speedX = Utils.mapRange(event.x, screenWidth, initMidX, 0.5, 1)
	
	# Set the speeds
	layerA.draggable.speedY = speedY
	layerA.draggable.speedX = speedX

# When the drag is finished, snap back to initial position
layerA.on Events.DragEnd, ->
	layerA.animate 
		properties:
			x: initX,
			y: initY
		curve: "spring(300,18,10)"
		