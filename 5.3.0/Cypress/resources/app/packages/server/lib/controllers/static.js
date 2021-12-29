const send = require('send')
const staticPkg = require('../../../static')

module.exports = {
  handle (req, res) {
    const pathToFile = staticPkg.getPathToDist(req.params[0])

    return send(req, pathToFile)
    .pipe(res)
  },
}
