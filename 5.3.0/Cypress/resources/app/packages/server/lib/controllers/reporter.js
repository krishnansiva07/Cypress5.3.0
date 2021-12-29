const send = require('send')
const reporter = require('../../../reporter/lib/resolve-dist')

module.exports = {
  handle (req, res) {
    const pathToFile = reporter.getPathToDist(req.params[0])

    return send(req, pathToFile)
    .pipe(res)
  },
}
