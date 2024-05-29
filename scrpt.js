import { updatebird, setupbird, getbirdRect } from "./bird.js"
import { updatepipes, setuppipes, getpassedpipes, getpiperects } from "./pipe.js"

document.addEventListener("keypress", handlestart, {once: true})
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lasttime
function updateloop(time){
    if(lasttime==null){
        lasttime=time
        window.requestAnimationFrame(updateloop)
        return
    }
    const delta = time - lasttime
    updatebird(delta)
    updatepipes(delta)
    if(checklose()) return handlelose()
    lasttime = time
    window.requestAnimationFrame(updateloop)
}

function checklose(){
    const birdrect = getbirdRect()
    const insidepipe = getpiperects().some(rect=>iscollision(birdrect, rect))
    const outside = birdrect.top<0 || birdrect.bottom>window.innerHeight
    return outside || insidepipe
}

function iscollision(r1,r2){
    return(
        r1.left<r2.right &&
        r1.top<r2.bottom &&
        r1.right>r2.left &&
        r1.bottom>r2.top 
    )
}

function handlestart(){
    title.classList.add("hide")
    setupbird()
    setuppipes()
    lasttime=null
    window.requestAnimationFrame(updateloop)
}

function handlelose(){
    setTimeout(()=>{
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = `${getpassedpipes()} Pipes`
        document.addEventListener("keypress", handlestart, {once: true})
    },100)
}