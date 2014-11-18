(function() {
  var bg, examplesPageFlow6Layers, initMidX, initX, initY, layerA, screenHeight, screenWidth;

  examplesPageFlow6Layers = Framer.Importer.load("imported/Examples Page - Flow 6");

  bg = new BackgroundLayer({
    backgroundColor: "#28AFFA"
  });

  layerA = new Layer({
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 3
  });

  layerA.center();

  layerA.draggable.enabled = true;

  initX = layerA.x;

  initMidX = layerA.midX;

  initY = layerA.y;

  screenHeight = Framer.Device.screen.height;

  screenWidth = Framer.Device.screen.width;

  layerA.on(Events.DragMove, function(event) {
    var deltaX, speedX, speedY;
    deltaX = initMidX - event.x;
    speedY = Utils.mapRange(event.y, screenHeight, initY, 0.5, 1);
    if (deltaX > 0) {
      speedX = Utils.mapRange(event.x, 0, initMidX, 0.5, 1);
    } else {
      speedX = Utils.mapRange(event.x, screenWidth, initMidX, 0.5, 1);
    }
    layerA.draggable.speedY = speedY;
    return layerA.draggable.speedX = speedX;
  });

  layerA.on(Events.DragEnd, function() {
    return layerA.animate({
      properties: {
        x: initX,
        y: initY
      },
      curve: "spring(300,18,10)"
    });
  });

}).call(this);
