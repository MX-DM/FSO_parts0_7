const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    
    next(error)
}

const getToken = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')){
        req.token = authorization.replace('Bearer ', '')
    }
    next()
}

module.exports = {
    errorHandler,
    getToken
}