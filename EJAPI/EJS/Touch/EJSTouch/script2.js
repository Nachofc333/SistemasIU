//Este ejemplo muestra cómo detectar el gesto de pellizcar/zoom, que usa eventos de puntero (API Pointer Events) para detectar si el usuario acerca o aleja dos punteros.

const pointers = new Array();
let prevDiff = -1;

function pointerDownHandler(ev) {
  const pointer = {
    id: ev.pointerId,
    x: ev.clientX,
    y: ev.clientY
  }
  pointers.push(pointer);
}

function pointerMoveHandler(ev) {
  ev.target.style.border = "dashed";

  for (let i = 0; i < pointers.length; i++) {
    if (ev.pointerId === pointers[i].id) {
      pointers[i].x = ev.clientX;
      pointers[i].y = ev.clientY;
      break;
    }
  }

 
  if (pointers.length === 2) {
    const curDiff = calcDistance(pointers[1], pointers[0]);

    if (prevDiff > 0) {
      if (curDiff > prevDiff) {
        ev.target.style.background = "lightgreen";
      } else if (curDiff < prevDiff) {
        ev.target.style.background = "lightblue";
      }
    }

    prevDiff = curDiff;
  }
}

function pointerUpHandler(ev) {
  removePointerEvent(ev);
  ev.target.style.background = "white";
  ev.target.style.border = "1px solid black";

  if (pointers.length < 2) {
    prevDiff = -1;
  } 
}

function removePointerEvent(ev) {
  const idx = pointers.findIndex(pointer => ev.pointerId === pointer.id);
  pointers.splice(idx, 1);
}

function calcDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function init() {
  const targetEl = document.querySelector("#target");
  targetEl.addEventListener("pointerdown", pointerDownHandler);
  targetEl.addEventListener("pointermove", pointerMoveHandler);
  targetEl.addEventListener("pointerup", pointerUpHandler);

}

init();