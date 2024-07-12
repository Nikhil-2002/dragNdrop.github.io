let dragRef;
let xPos, yPos;

document.querySelectorAll(".dummyDiv").forEach((div) => {
  div.addEventListener("mousedown", onMouseDown);
});

function onMouseDown(e) {
  dragRef = e.target;
  xPos = dragRef.style.left;
  yPos = dragRef.style.top;
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e) {
  dragRef.style.left =
    e.pageX -
    document.getElementById("parentB").getBoundingClientRect().x +
    "px";
  dragRef.style.top =
    e.pageY -
    document.getElementById("parentB").getBoundingClientRect().y +
    "px";
}
function onMouseUp(e) {
  let isDropped = false;
  document.querySelectorAll(".dropzone").forEach((dropzone) => {
    const dzRect = dropzone.getBoundingClientRect();
    const refRect = dragRef.getBoundingClientRect();
    const answer = dropzone.getAttribute("data-answer");

    if (
      refRect.left > dzRect.left &&
      refRect.right < dzRect.right &&
      refRect.top > dzRect.top &&
      refRect.bottom < dzRect.bottom &&
      dragRef.innerText === answer
    ) {
      isDropped = true;
      dragRef.style.position = "absolute";
      dragRef.style.left =
        dzRect.left -
        document.getElementById("parentB").getBoundingClientRect().x +
        "px";
      dragRef.style.top =
        dzRect.top -
        document.getElementById("parentB").getBoundingClientRect().y +
        "px";

      dragRef.style.width = dropzone.offsetWidth + "px";
      dragRef.style.height = dropzone.offsetHeight + "px";
      dragRef.style.lineHeight = dropzone.offsetHeight + "px";
      dragRef.style.borderColor = "#2ecc71";
      dragRef.style.backgroundColor = "#d4efdf";
      dragRef.style.color = "#2ecc71";
    }
  });

  if (!isDropped) {
    dragRef.style.left = xPos;
    dragRef.style.top = yPos;
  }

  dragRef = null;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}
