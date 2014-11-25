# Made with Framer
# by Min-Sang Choi
# www.framerjs.com

# Setting up the layers
bg = new BackgroundLayer backgroundColor:'#e9e9e9'
container = new Layer x:0, y:0, width:640, height:1136, backgroundColor:'transparent', shadowY:4, shadowBlur:15, shadowColor:'rgba(0,0,0,0.3)'

mymap = new Layer x:0, y:0, width:640, height:1136,backgroundColor:'#fff'
mymap.html = "<div id='map-canvas' style='height:1136px'></div>"
searchtexts = ""
searchbg = new Layer x:0, y:1136, width:640, height:1136,backgroundColor:'#eee',opacity:0
buttonhome = new Layer x:20, y:20, width:600, height:100, backgroundColor:'#fff', shadowY:4, shadowBlur:8, shadowColor:'rgba(0,0,0,0.3)'
buttonhome.style = borderRadius:'3px'
searchfield = new Layer x:buttonhome.width*0.1, y:30, width:buttonhome.width*0.7, backgroundColor:'transparent'
searchfield.style = 
	color:'#7D7D7D'
	fontFamily:'Roboto'
searchicn = new Layer 
	x:20, y:0, width:34, height:34, image:"images/searchicon.png"
overflowicn = new Layer 
	x:530, y:0, width:44, height:44, image:"images/overflow.png"
cancelicn = new Layer 
	x:570, y:0, width:44, height:44, image:"images/btncancel.png",scale:0	
buttonhome.addSubLayer(searchicn)	
buttonhome.addSubLayer(overflowicn)
buttonhome.addSubLayer(cancelicn)
cancelicn.centerY()
searchicn.centerY()	
overflowicn.centerY()
buttonhome.addSubLayer(searchfield)
buttonhome.html = "<input id='_searchfield' type='text' style='width:70%;padding:18px;margin-top:13px;margin-left:60px;margin-bottom:14px;font-size:30px;color:#7D7D7D' placeholder='Search'></input>"
searchfield.html = ""
myquery = ""
searchfield.ignoreEvents = false

fabbtn = new Layer x:480, y:1800, width:130,height:130, borderRadius:'65px', backgroundColor:'#0E9C57',shadowY:4,shadowBlur:8,shadowColor:'rgba(0,0,0,0.3)',scale:0
driveicn = new Layer 
	x:0, y:0, width:44, height:44, image:"images/car.png"
fabbtn.addSubLayer(driveicn)
driveicn.center()
locationlayer = new Layer x:0, y:1136, width:640, height:1136, backgroundColor:'#fff',shadowY:4, shadowBlur:15, shadowColor:'rgba(0,0,0,0.3)'
locationtitle = new Layer x:0, y:0, width:640, height:140, backgroundColor:'transparent'
locationrating = new Layer x:268, y:locationtitle.height, width:640, height:80, backgroundColor:'transparent'

locationtitle.style = 
	padding:'50px'
	color:'#333'
	fontFamily:'Roboto'
	fontWeight:'500'
	fontSize:'50px'
	lineHeight:'1.2'
locationrating.style = 
	paddingLeft:'50px'
	paddingTop:'26px'
	color:'#aaa'
	fontFamily:'Roboto'
	fontSize:'28px'
	lineHeight:'1.2'

locationratingbg = new Layer x:20, y:locationrating.y+2, width:268, height:84, backgroundColor:'#ccc'
locationratingstar = new Layer x:20, y:locationrating.y+2, width:0, height:84, backgroundColor:'#F5CB5B'
starmask = new Layer 
	x:20, y:locationrating.y, width:268, height:87, image:"images/stars.png"
locationaddress = new Layer x:0, y:locationratingbg.y+87, width:640, height:140, backgroundColor:'transparent'
locationaddress.style = 
	paddingLeft:'50px'
	paddingTop:'24px'
	color:'#7D7D7D'
	fontFamily:'Roboto'
	fontSize:'28px'
	lineHeight:'1.2'
locationphone = new Layer x:0, y:locationaddress.y+60, width:640, height:80, backgroundColor:'transparent'
locationphone.style = 
	paddingLeft:'50px'
	paddingTop:'24px'
	color:'#7D7D7D'
	fontFamily:'Roboto'
	fontSize:'28px'
	lineHeight:'1.2'

locationlayer.addSubLayer(locationtitle)	
locationlayer.addSubLayer(locationrating)
locationlayer.addSubLayer(locationratingbg)
locationlayer.addSubLayer(locationratingstar)
locationlayer.addSubLayer(starmask)
locationlayer.addSubLayer(locationaddress)
locationlayer.addSubLayer(locationphone)

# Default values (related to Google Maps API)
myzoom = 18
mycenter = new google.maps.LatLng(37.783944,-122.401289)
service = 0
infowindow = 0
map = 0
marker = 0
infowindow.style = color:'#000'	
myquery = null

# Setting up the maps
initialize = () ->
	
	mapOptions = { zoom: myzoom, center: mycenter, disableDefaultUI:true}
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)
	infowindow = new google.maps.InfoWindow()

# Request Query
textSearch = () ->	

	request = {location:mycenter, radius:'2000',query:document.getElementById('_searchfield').value}
	service = new google.maps.places.PlacesService(map)
	service.textSearch(request, callback)

# Callback of textSearch
callback = (results, status) ->
	if status == google.maps.places.PlacesServiceStatus.OK
			place = results[0]
			createMarker(results[0])
			map.setZoom(20)		
			map.setCenter(results[0].geometry.location)
			locationwindow(place)			
	else
		noresults()

# When there's no result		
noresults = () ->
	
	alertbg = new Layer x:0, y:0, width:640, height:1136,backgroundColor:'rgba(0,0,0,0.5)'
	alertlayer = new Layer x:0, y:0, width:540, height:400,scale:0,backgroundColor:'#fff'
	container.addSubLayer(alertbg)
	container.addSubLayer(alertlayer)
	alertlayer.center()
	
	alertlayer.animate
		properties:
			scale:1
		curve:'spring(100,12,0)'
	
	alertbg.on Events.Click,->
		alertdismiss()
	alertlayer.on Events.Click,->
		alertdismiss()

	alertdismiss = () ->
		
		alertbg.animate
			properties:
				opacity:0
			curve:'spring(100,12,0)'
		
		Utils.delay 0.6, -> alertbg.y = 1400
		
		alertlayer.animate
			properties:
				scale:0.5
				opacity:0
			curve:'spring(50,12,0)'
		
		Utils.delay 0.6, -> alertlayer.scale = 0

# Creating Marker		
createMarker = (place) ->
	placeLoc = place.geometry.location
	marker = new google.maps.Marker({map:map, position: placeLoc})

# Animating Stuffs	
gosearch = () ->
	buttonhome.animate
		properties:
			width:container.width
			height: 100
			x:0
			y:0
		curve:'linear'
		time:0.3
	buttonhome.borderRadius = '0px'

	cancelicn.animate
		properties:
			scale:1
			opacity:1
		curve:'spring(60,12,0)'
	
	locationlayer.animate
		properties:
			y:1500
		curve:'cubic-bezier(0.4, 0, 1, 1)'
		time:0.2
		
	fabbtn.animate
		properties:
			y:1500
		curve:'cubic-bezier(0.4, 0, 1, 1)'
		time:0.2
	
	overflowicn.animate
		properties:
			opacity:0
		curve:'spring(100,12,0)'

	searchbg.y = 0
	searchbg.animate
		properties:
			opacity:1
		curve:'spring(50,12,0)'	
	document.getElementById('_searchfield').focus()
	return

# Reverse
goback = () ->
	searchbg.y = 1136
	searchbg.animate
		properties:
			opacity:0
		curve:'spring(100,12,0)'

	overflowicn.animate
		delay:0.3
		properties:
			opacity:1
		curve:'spring(100,12,0)'
	
	cancelicn.animate
		properties:
			scale:0
			opacity:0
		curve:'spring(60,12,0)'			

	buttonhome.animate
		properties:
			width:600
			height:100
			x:20
			y:20
		curve:'linear'
		time:0.3
	buttonhome.borderRadius = '3px'
	document.getElementById('_searchfield').blur()
	
# Search box clicked
buttonhome.on Events.Click, (e) ->	
	overflowicn.animateStop()
	cancelicn.animateStop()
	gosearch()

# Canceled (1)
searchbg.on Events.Click, ->
	overflowicn.animateStop()
	cancelicn.animateStop()	
	goback()

# Canceled (2)
cancelicn.on Events.Click,->
	document.getElementById('_searchfield').value = ''
	cancelicn.scale = 0.6
	cancelicn.animate
		properties:
			scale:1
		curve:'spring(60,12,0)'

	Utils.delay 0.3, -> goback()

# Enter key is pressed (Send Query)	
buttonhome._element.addEventListener "keydown", ((e) ->
	if e.keyCode == 13 && document.getElementById('_searchfield').value != ''
		overflowicn.animateStop()
		cancelicn.animateStop()	
		textSearch() 
		goback()
	return
), false

# Show up results
locationwindow = (place) ->
	
	request = {placeId: place.place_id}
	service = new google.maps.places.PlacesService(map);
	service.getDetails(request, detailcallback);
		
	locationlayer.y = 1136
	locationlayer.animate
		properties:
			y:736
		curve:'cubic-bezier(0, 0, 0.2, 1)'
		time:0.3
		
	fabbtn.y = 660
	fabbtn.animate
		delay:0.2
		properties:
			scale:1
		curve:'cubic-bezier(0, 0, 0.2, 1)'
		time:0.2

# Detail Callback
detailcallback = (place,status) ->	
	locationtitle.html = place.name
	locationaddress.html = place.vicinity
	if place.rating != undefined
		locationrating.html = place.rating+' ('+place.user_ratings_total+')'
		locationphone.html = place.formatted_phone_number
		locationratingstar.animate
			delay:0.2
			properties:
				width:place.rating*49
			curve:'cubic-bezier(0, 0, 0.2, 1)'
		
	else 
		locationrating.html = 'no ratings'
		locationratingstar.animate
			delay:0.2
			properties:
				width:0
			curve:'cubic-bezier(0, 0, 0.2, 1)'
 
container.addSubLayer(mymap)
container.addSubLayer(searchbg)
container.addSubLayer(buttonhome)
container.addSubLayer(locationlayer)
container.addSubLayer(locationwindow)
container.addSubLayer(fabbtn)

Utils.delay 0.2, -> initialize()