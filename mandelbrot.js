class Mandelbrot {
    generateSet ({ section, precision, maxIterations, juliaSetConstant }) {
        const {
            top, // 2
            bot, // -2
            left, // -2
            right, // 2
        } = section

        if (juliaSetConstant) {
            this.isJuliaSet = true
            this.c = juliaSetConstant
        }

        let points = [];

        // for (let y = top * precision; y > bot * precision; y--) {

        for (let y = bot * precision; y < top * precision; y++) {
            for (let x = left * precision; x < right * precision; x++) {
                const { isInMandelbrot, iterations } = this.analyseComplexNum({
                    a: x/precision, 
                    b: y/precision,
                    maxIterations,
                })

                points.push({
                    isInMandelbrot,
                    iterations,
                    x,
                    y,
                });
            }
        }
        return points;
    }

    squareComplexNum({ a, b }) {
        // binomial formula applied to the complex number
        // when you square ib you get -b^2, which is a real number
        let realNum = a*a - b*b;
        let imagNum = 2*a*b;
        return {
            a: realNum,
            b: imagNum
        }
    }

    complexNumToPowerN({ a, b, n }) {
        // I don't have a clue about the maths, just copied it from wikipedia
        // https://en.wikipedia.org/wiki/Multibrot_set

        let realNum = Math.pow(
            a*a + b*b,
            n/2
        ) * Math.cos(n * Math.atan2(b, a))

        let imagNum = Math.pow(
            a*a + b*b,
            n/2
        ) * Math.sin(n * Math.atan2(b, a))

        return {
            a: realNum,
            b: imagNum
        }
    }

    analyseComplexNum({ a, b, maxIterations }) {
        let z = { a, b }
        
        if (!this.isJuliaSet) {
            this.c = {
                a: a,
                b: b,
            }
        }
    
        for (let i = 1; i <= maxIterations; i++) {

            if (z.a*z.a + z.b*z.b >= 4) {
                return {
                    isInMandelbrot: false,
                    iterations: i,
                }
             }
    
            let zSqaured = this.squareComplexNum(z)

            z = {
                a: zSqaured.a + this.c.a,   
                b: zSqaured.b + this.c.b,
            }
        }
        // if the complex number didn't get over 2
        return { isInMandelbrot: true }
    }
}
