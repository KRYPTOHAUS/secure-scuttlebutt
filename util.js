var Map = require('pull-stream/throughs/map')

  // opts standardized to work like levelup api
  function stdopts (opts) {
    opts = opts || {}
    opts.keys   = opts.keys   !== false //default keys to true
    opts.values = opts.values !== false //default values to true
    return opts
  }

  function msgFmt (keys, values, obj) {
    if (keys && values)
      return obj
    if (keys)
      return obj.key
    if (values)
      return obj.value
    return null // i guess?
  }

exports.options = stdopts
exports.format = msgFmt

exports.lo = null
exports.hi = undefined

exports.formatStream = function (keys, values) {
  return Map(function (data) {
    if(data.sync) return data
    return keys && values ? data.value : keys ? data.value.key : data.value.value
  })
}


