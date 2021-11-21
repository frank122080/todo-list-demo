const publicPath = process.env.NODE_ENV === 'production' ? './' : '/'

const exportObject = { publicPath }

module.exports = exportObject