const errorHandler = (error, request, response, next) => {
  console.error(error.name)
  console.error(error.message)

  if (error.name === 'ShitId') {
    return response.status(404).json({ error: error.message })
  }else if (error.name === 'ShitUser') {
    return response.status(404).json({ error: error.message })
  }else if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.message })
  }else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
module.exports = errorHandler