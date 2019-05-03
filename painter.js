class Painter {
    constructor({
        ctx,
        mandelbrotFillColor,
    }) {
        this.ctx = ctx
        this.mandelbrotFillColor = mandelbrotFillColor
        this.palette = [
            '#511849',
            '#EDDD53',
            '#ADD45C',
            '#57C785',
            '#00BAAD',
            '#2A7B9B',
            '#3D3D6B',
            '#511849',
            '#900C3F',
            '#C70039',
            '#FF5733',
            '#FF8D1A',
        ]
    }

    drawMandelbrot ({
        points,
        offset,
        width,
        height,
    }) {
        points.forEach(
            point => {
                const {
                    x,
                    y,
                    isInMandelbrot,
                    iterations,
                } = point

                const fillStyle = isInMandelbrot
                    ? this.mandelbrotFillColor
                    : this.getNonMandelbrotFillStyle(iterations)

                this.setFillStyle(fillStyle)

                this.ctx.fillRect(
                    x - offset.x,
                    height - y + offset.y - 1,
                    1,
                    1,
                )
            }
        )
    }

    getNonMandelbrotFillStyle (iterations) {
        // let color = '000066';

        // for (let i = 0; i < iterations; i++) {
        //     color = addHexColor(color, '000504');
        // }

        // return '#' + color;

        // only change color if the iteration number changed
        if (this.lastIterationNum !== iterations) {
            this.color = this.palette[iterations % this.palette.length]
            this.lastIterationNum = iterations
        }

        return this.color
    }



    setFillStyle (fillStyle) {
        this.ctx.fillStyle = fillStyle
    }
}
