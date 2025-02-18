const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { //remove !origin for production (postman has no origin for example)
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }, 
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Allow only certain HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Allow cookies or other credentials to be sent
    preflightContinue: false, // Whether to pass the CORS preflight request to the next handler
    optionsSuccessStatus: 204 // Status code sent for successful OPTIONS requests
}

module.exports = corsOptions