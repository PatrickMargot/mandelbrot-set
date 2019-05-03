const ui = document.getElementById("ui")
const uiCtx = ui.getContext("2d")
ui.width = window.innerWidth
ui.height = window.innerHeight
let mouseIsPressed = false

let mouse = {
    x: 0,
    y: 0,
}

let rect = {
    x: null,
    y: null,
    width: null,
    height: null
}
let prevX
let prexY

function drawSection() {
    rect.width = mouse.x - rect.x
    rect.height = mouse.y - rect.y

    if (rect.width === 0 && rect.height === 0) { return }
    
    console.log(rect)
    
    console.log('left ' + (rect.x + app.offset.x) / app.precision)
    console.log('right ' + (rect.x + rect.width + app.offset.x) / app.precision)
    console.log('top ' + (app.height + app.offset.y - rect.y) / app.precision)
    console.log('bot ' + (app.height + app.offset.y - rect.y - rect.height) / app.precision)
    
    const left = (rect.x + app.offset.x) / app.precision
    const right = (rect.x + rect.width + app.offset.x) / app.precision
    const top = (app.height + app.offset.y - rect.y) / app.precision
    const bot = (app.height + app.offset.y - rect.y - rect.height) / app.precision

    const coordinateWidth = Math.abs(right - left)
    const coordinateHeight = Math.abs(top - bot)

    const centerX = coordinateWidth / 2 + left
    const centerY = coordinateHeight / 2 + bot

    if (coordinateWidth >= coordinateHeight) {
        app.setBoundries({
            left,
            right,
            top: centerY + coordinateWidth * app.ratio / 2,
            bot: centerY - coordinateWidth * app.ratio / 2,
        })
    } else if (coordinateWidth < coordinateHeight) {
        app.setBoundries({
            left: centerX - coordinateHeight / app.ratio / 2,
            right: centerX + coordinateHeight / app.ratio / 2,
            top,
            bot,
        })
    }
    
    
    app.init()
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect()
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

ui.addEventListener('mousemove', function(evt) {
    if (mouseIsPressed) {
        mouse = getMousePos(ui, evt)
        if (prevX === mouse.x && prevY === mouse.y) { return }
        uiCtx.fillStyle = "rgba(0,0,0,0.2)"
        uiCtx.clearRect(0, 0, ui.width, ui.height)
        rect.width = mouse.x - rect.x
        rect.height = mouse.y - rect.y
        uiCtx.fillRect(rect.x, rect.y, rect.width, rect.height)
        uiCtx.stroke()
        prevX = mouse.x
        prevY = mouse.y
    }
})

ui.addEventListener('mousedown', function(evt) {
    mouse = getMousePos(ui, evt)
    mouseIsPressed = true
    rect.x = mouse.x
    rect.y = mouse.y
})

ui.addEventListener('mouseout', function(evt) {
    mouseIsPressed = false
    uiCtx.clearRect(0, 0, ui.width, ui.height)
})

ui.addEventListener('mouseup', function(evt) {
    if (mouseIsPressed) {
        uiCtx.clearRect(0, 0, ui.width, ui.height)
        drawSection()
    }
    mouseIsPressed = false
})


