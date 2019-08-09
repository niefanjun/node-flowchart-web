const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const webpackDevConfig = require('../tools/webpack.config.demo.dev.js');

const compiler = webpack(webpackDevConfig);

function hotMIddleWare(app) {
	app.use(webpackDevMiddleware(compiler,{
		onInfo: true,
		stats: {
			colors: true
		}
	}));
	app.use(webpackHotMiddleware(compiler));
	// 路由
	app.get('/demo-flow/*', function (req, res, next) {
	    /*var pagename = req.params.pagename
	        ? req.params.pagename + '.html'
	        : 'index.html';*/
	    var pagename = 'index.html';
	    var filepath = path.join(compiler.outputPath, pagename)
	    // 使用webpack提供的outputFileSystem
	    compiler.outputFileSystem.readFile(filepath, function (err, result) {
	        if (err) {
	            // something error
	            return next('输入路径无效，请输入目录名作为路径，有效路径有：\n/' + Object.keys(entries).join('\n/'))
	        }
	        // 发送获取到的页面
	        res.set('content-type', 'text/html')
	        res.send(result)
	        res.end()
	    })
	})
}
module.exports = hotMIddleWare;