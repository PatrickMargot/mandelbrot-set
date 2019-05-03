class App {
    constructor () {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.ratio = this.height / this.width
        const pixels = this.width * this.height;
        console.log('pixels: ' + pixels);
        

        this.setBoundries({
            left: -3,
            right: 3,
            top: 3 * this.ratio,
            bot: -3 * this.ratio,
        })
        
        const screen = document.getElementById('mandelbrot-screen')
        screen.width = this.width
        screen.height = this.height
        const context = screen.getContext('2d')
        
        this.painter = new Painter({ ctx: context, mandelbrotFillColor: 'black' })
        
        this.mandelbrot = new Mandelbrot()
    }
    
    setBoundries (boundries) {
        this.boundries = boundries
        
        this.coordinateWidth = Math.abs(this.boundries.right - this.boundries.left)
        this.coordinateHeight = Math.abs(this.boundries.top - this.boundries.bot)
    
        this.precision = this.width / this.coordinateWidth

        this.offset = {
            x: this.boundries.left * this.precision,
            y: this.boundries.bot * this.precision,
        }
    }

    setJuliaSetConstant (juliaSetConstant) {
        this.juliaSetConstant = { ...juliaSetConstant }
    }

    setMaxIterations (max) {
        this.maxIterations = max
    }

    init () {
        // let i;

        // this.timeout() {
        //     setTimeout(function () {
        //         // Do Something Here
        //         // Then recall the parent function to
        //         // create a recursive loop.
        //         this.timeout();
        //     }, 1000);
        // }

        const points = this.mandelbrot.generateSet({
            section: this.boundries,
            precision: this.precision,
            maxIterations: this.maxIterations,
            juliaSetConstant: this.juliaSetConstant,
        })
        
        console.log('points: ' + points.length)
        
        this.painter.drawMandelbrot({
            points,
            offset: this.offset,
            width: this.width,
            height: this.height,
        })
    }
}

const app = new App()

// app.setJuliaSetConstant({
//     a: 0.3551502847002599,
//     b: 0.10134266946979897,
// })
app.setMaxIterations(500)
app.init()
