let cursors = {}

let isDrawing = false;
let previousX, previousY;

document.addEventListener("DOMContentLoaded", function() {
  const isLocalConnection = window.location.hostname === '10.0.0.138';
  const socket = new WebSocket(isLocalConnection ? 'ws://10.0.0.138:1134' : 'ws://99.245.65.253:1134');

  socket.onopen = function(event) {
    const arena = document.getElementById("arena");

    arena.addEventListener("mousedown", function(event) {
      delete previousX;
      delete previousY;
  
      isDrawing = true;
      const localX = event.offsetX;
      const localY = event.offsetY;
  
      previousX = localX;
      previousY = localY;
  
      draw(localX, localY, localX, localY, arena.getContext("2d"));
    })
  
    arena.addEventListener("mousemove", function(event) {
      const localX = event.offsetX;
      const localY = event.offsetY;

      socket.send(JSON.stringify({ purpose: "move", x: localX, y: localY }));

      if (!isDrawing) return;

      draw(previousX, previousY, localX, localY, arena.getContext("2d"));
  
      previousX = localX;
      previousY = localY;
    })
  
    document.addEventListener("mouseup", function(event) {
      isDrawing = false;
    })
  
    arena.addEventListener("mouseleave", function() {
      delete previousX;
      delete previousY;
    })
  
    arena.addEventListener("mouseenter", function(event) {
      previousX = event.offsetX;
      previousY = event.offsetY;
    })
  
    function draw(startX, startY, endX, endY, ctx) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();
    }
  
    socket.addEventListener("message", function(event) {
      const jsonObject = JSON.parse(event.data);
      if (jsonObject.purpose === "move") {
        if (!cursors[jsonObject.sender]) {
          createCursor(jsonObject.sender);
        }

        const x = jsonObject.x;
        const y = jsonObject.y;
        updateCursor(jsonObject.sender, x, y);
      }
    })

    function createCursor(sender) {
      const cursor = document.createElement("div");
      cursor.className = "cursor";
      document.body.appendChild(cursor);
      cursors[sender] = cursor;
    }

    function updateCursor(sender, x, y) {
      const cursor = cursors[sender];
      const arenaRect = arena.getBoundingClientRect();
      cursor.style.left = (x + arenaRect.left) + "px";
      cursor.style.top = (y + arenaRect.top) + "px";
    }
  }
})