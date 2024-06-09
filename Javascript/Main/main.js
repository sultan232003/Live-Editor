const Editor = document.getElementById("editor")
let Editor_position = null
let x_pos
let y_pos
window.addEventListener("mousedown", (e) => {
    if (e.clientX > window.innerWidth - Editor.clientWidth && e.clientY > window.innerHeight - Editor.clientHeight) {
        Editor_position = "top_left"
    } else if (e.clientX > window.innerWidth - Editor.clientWidth) {
        Editor_position = "bottom_left"
    } else if (e.clientY > window.innerHeight - Editor.clientHeight) {
        Editor_position = "top_right"
    } else { Editor_position = null }
    if (!Editor.classList.contains("active")) {
        Editor.classList.add("active")
        if (Editor_position == null) {
            x_pos = e.clientX + 5
            y_pos = e.clientY + 5
        } else if (Editor_position == "top_left") {
            x_pos = e.clientX + 5 - Editor.clientWidth
            y_pos = e.clientY + 5 - Editor.clientHeight
        } else if (Editor_position == "bottom_left") {
            x_pos = e.clientX + 5 - Editor.clientWidth
            y_pos = e.clientY + 5
        } else if (Editor_position == "top_right") {
            x_pos = e.clientX + 5
            y_pos = e.clientY + 5 - Editor.clientHeight
        }
        Editor.style.cssText = `left:${x_pos}px; top:${y_pos}px`
    }
})
const Code_input = document.getElementById("code_input")
const clear_input = () => {
    Code_input.value = ""
}
const Close = document.getElementById("close")
Close.addEventListener("mouseup", () => {
    Editor.classList.remove("active")
    clear_input()
})
const Clear = document.getElementById("clear")
Clear.addEventListener("mouseup", () => {
    clear_input()
})
let target
let current_target
let indicator
document.addEventListener('mousedown', function (e) {
    target = e.srcElement.className || e.srcElement.id
    if (!current_target == target) {
        clear_input()
    }
    current_target = target
    if (e.srcElement.className) {
        indicator = "."
    } else { indicator = "#" }
    console.log(target)
}, false);
Code_input.addEventListener("mousedown", (e) => {
    e.stopPropagation()
})
let Temp_element
Code_input.addEventListener("keydown", (e) => {
    Temp_element = document.getElementById(target) || document.getElementsByClassName(target)
    Temp_element.style.cssText = Code_input.value
})
const Copy = document.getElementById("copy")
Copy.addEventListener("mouseup", () => {
    navigator.clipboard.writeText(indicator + target + "{ " + Code_input.value + " }")
})
const Move = document.getElementById("move")
let drag = false
Move.addEventListener("mousedown", (e) => {
    drag = true
})
let top_touch = false
let bottom_touch = false
let left_touch = false
let right_touch = false
document.addEventListener("mousemove", (e) => {
    if (e.clientX >= Move.getBoundingClientRect().x - Editor.getBoundingClientRect().x + 5) { left_touch = true } else { left_touch = false }
    if (e.clientX <= window.innerWidth - (Editor.getBoundingClientRect().right - Move.getBoundingClientRect().right) - 15) { right_touch = true } else { right_touch = false }
    if (e.clientY >= Move.getBoundingClientRect().y - Editor.getBoundingClientRect().y + 5) { top_touch = true } else { top_touch = false }
    if (e.clientY <= window.innerHeight - (Editor.getBoundingClientRect().bottom - Move.getBoundingClientRect().bottom) - 15) { bottom_touch = true } else { bottom_touch = false }
    if (drag) {
        if (top_touch && bottom_touch && left_touch && right_touch) {
            x_pos = e.clientX - Editor.clientWidth + 75
            y_pos = e.clientY - 16
        } else if (!top_touch && left_touch && right_touch && bottom_touch) {
            x_pos = e.clientX - Editor.clientWidth + 55
            y_pos = 2
        } else if (top_touch && !bottom_touch && left_touch && right_touch) {
            x_pos = e.clientX - Editor.clientWidth + 55
            y_pos = window.innerHeight - Editor.clientHeight - 7
        } else if (top_touch && bottom_touch && !left_touch && right_touch) {
            x_pos = 2
            y_pos = e.clientY - 16
        } else if (top_touch && bottom_touch && left_touch && !right_touch) {
            x_pos = window.innerWidth - Editor.clientWidth - 7
            y_pos = e.clientY - 16
        }
        Editor.style.cssText = `left:${x_pos}px; top:${y_pos}px;width:${Editor_width}px; max-width:${Max_width}px !important; height: ${Editor_height}px;max-height:${Max_height}px !important;`
    }
})
document.addEventListener("mouseup", (e) => { drag = false })
Close.addEventListener("mousedown", (e) => {
    e.stopPropagation()
})
Clear.addEventListener("mousedown", (e) => {
    e.stopPropagation()
})
Copy.addEventListener("mousedown", (e) => {
    e.stopPropagation()
})
let stretch_top = false, stretch_bottom = false, stretch_left = false, stretch_right = false, stretch_top_left = false, stretch_top_right = false, stretch_bottom_left = false, stretch_bottom_right = false
const Resize_left = document.getElementById("resize_left")
const Resize_right = document.getElementById("resize_right")
const Resize_top = document.getElementById("resize_top")
const Resize_bottom = document.getElementById("resize_bottom")
let stretch = false
Editor.addEventListener("mousedown", () => {
    stretch = true
})
Resize_right.addEventListener("mousedown", () => { stretch_right = true })
Resize_left.addEventListener("mousedown", () => { stretch_left = true })
Resize_bottom.addEventListener("mousedown", () => { stretch_bottom = true })
Resize_top.addEventListener("mousedown", () => { stretch_top = true })
let Editor_width = 250
let Editor_height = 250
let Max_width = window.innerWidth - (x_pos - 4)
let Max_height = window.innerHeight - (y_pos - 5)
document.addEventListener("mousemove", (e) => {
    if (stretch_right) {
        Editor_width = e.clientX - Editor.getBoundingClientRect().x
        Editor.style.cssText = `width:${Editor_width}px; max-width:${Max_width}px !important; height: ${Editor_height}px;max-height:${Max_height}px !important; left:${x_pos}px; top:${y_pos}px`
    }
    if (stretch_left) {
        Editor_width = e.clientX - Editor.getBoundingClientRect().x
        Editor.style.cssText = `width:${Editor_width}px; max-width:${Max_width}px !important; height: ${Editor_height}px;max-height:${Max_height}px !important; left:${x_pos}px; top:${y_pos}px`
    }
    if (stretch_bottom) {
        Editor_height = e.clientY - Editor.getBoundingClientRect().y
        Editor.style.cssText = `height:${Editor_height}px; max-height:${Max_height}px !important; width:${Editor_width}px; left:${x_pos}px; top:${y_pos}px`
    }
})
document.addEventListener("mouseup", () => {
    stretch_right = false
    stretch_left = false
    stretch_top = false
    stretch_bottom = false
})
const Left_allign = document.getElementById("Left")
const Right_allign = document.getElementById("Right")
const Bottom_allign = document.getElementById("Bottom")
Left_allign.addEventListener("click",()=>{
    x_pos = 0
    y_pos = 0
    Editor_height = window.innerHeight - 4
    Editor_width = 250
    Editor.style.cssText = `left: ${x_pos} ; top: ${y_pos} ; width: ${Editor_width}px; height:${Editor_height}px;right:auto; transition: 100ms linear;`
})
Right_allign.addEventListener("click",()=>{
    x_pos = window.innerWidth - (Editor.clientWidth + 6)
    y_pos = 0
    Editor_height = window.innerHeight - 4
    Editor.style.cssText = `transition: 100ms linear;left: ${x_pos}px ; top: 0 ; width: ${Editor_width}px; height:${Editor_height}px;`
})
Bottom_allign.addEventListener("click",()=>{
    Editor.style.cssText = `transition: 100ms linear;left: 0 ; top: auto ; width: calc(100vw - 4px); height:250px;bottom:4px;`
})