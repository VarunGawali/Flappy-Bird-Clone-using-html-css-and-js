const birdele = document.querySelector("[data-bird]")
const birdspeed = .5
const jumpduration = 125
let timesincelastjump = Number.POSITIVE_INFINITY

export function setupbird(){
    settop(window.innerHeight/2)
    document.removeEventListener('keydown', handlejump)
    document.addEventListener('keydown',handlejump)
}

export function updatebird(delta){
    if(timesincelastjump<jumpduration){
        settop(gettop() - birdspeed*delta)
    } else{
        settop(gettop() + birdspeed*delta)
    }
    timesincelastjump+=delta
}

export function getbirdRect(){
    return birdele.getBoundingClientRect()
}

function settop(top){
    birdele.style.setProperty("--bird-top", top)
}

function gettop(){
    return parseFloat(getComputedStyle(birdele).getPropertyValue("--bird-top"))

}

function handlejump(e){
    if(e.code!== "Space") return

    timesincelastjump=0
}