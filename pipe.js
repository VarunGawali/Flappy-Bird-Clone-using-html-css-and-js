const holeheight = 120
const pipewidth=120
const pipeinterval=1500
const pipespeed = .75
let pipes = []
let timesincelastpipe
let passedpipecount

export function setuppipes(){
    document.documentElement.style.setProperty("--pipe-width",pipewidth)
    document.documentElement.style.setProperty("--hole-height",holeheight)
    pipes.forEach(pipe=>pipe.remove())
    timesincelastpipe=pipeinterval
    passedpipecount=0
}

export function updatepipes(delta){
    timesincelastpipe += delta
    if(timesincelastpipe>pipeinterval){
        timesincelastpipe -= pipeinterval
        createpipe()
    }
    pipes.forEach(pipe=>{
        if(pipe.left + pipewidth<0){
            passedpipecount++
            return pipe.remove()
        }
        pipe.left = pipe.left - delta*pipespeed
    })
}

export function getpassedpipes(){
    return passedpipecount
}

export function getpiperects(){
    return pipes.flatMap(pipe=>pipe.rects())
}

function createpipe(){
    const pipeele = document.createElement("div")
    const topele = createpipesegment("top")
    const bottomele = createpipesegment("bottom")
    pipeele.append(topele)
    pipeele.append(bottomele)
    pipeele.classList.add("pipe")
    pipeele.style.setProperty("--hole-top", randomNumberBetween(holeheight*1.5, window.innerHeight - holeheight*.5))
    const pipe = {
        get left(){
            return parseFloat(getComputedStyle(pipeele).getPropertyValue("--pipe-left"))
        },
        set left(value){
            pipeele.style.setProperty("--pipe-left", value)
        },
        remove(){
            pipes = pipes.filter(p=> p!==pipe)
            pipeele.remove()
        },
        rects(){
            return [
                topele.getBoundingClientRect(),
                bottomele.getBoundingClientRect(),
            ]
        }
    }
    pipe.left=window.innerWidth
    document.body.append(pipeele)
    pipes.push(pipe)
}

function createpipesegment(position){
    const segment = document.createElement("div")
    segment.classList.add("segment",position)
    return segment
}

function randomNumberBetween(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min)
}