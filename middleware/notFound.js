function notFound(req,res,next){
    res.status(404)
    res.json({
        error : 404,
        message : 'elemento non trovato'
    })
}

module.exports = notFound