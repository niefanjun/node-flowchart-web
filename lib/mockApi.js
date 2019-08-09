const awaitHandlerFactory = require('./awaitHandlerFactory');
const bodyParse = require('body-parser');
function bindMockApi(app) {
	app.use('/api',bodyParse.json({}));
	app.get('/api/test',function(req,res) {
		let result = {
			resultCode: '0000',
			data: {
				test: 'test',
			}
		}
		res.json(result);
	})
	app.post('/api/getTree',function(req,res) {
		console.log(req.body);
		let result = {
			resultCode: '0000',
			data: {
				project_id: 123,
				project_name: '测试项目',
				tree: {
				    "nodes": [{
				        "type": "node",
				        "size": "80*48",
				        "shape": "flow-rect",
				        "color": "#1890FF",
				        "label": "任务",
				        "node_type": "mission",
				        "node_name": "任务",
				        "x": 293.0749969482422,
				        "y": 200.20000076293945,
				        "id": "a5bfaafc",
				        "node_id":"1",
				        "index": 0
				    }, {
				        "type": "node",
				        "size": "72*72",
				        "shape": "flow-circle",
				        "color": "#FA8C16",
				        "label": "主题",
				        "node_type": "theme",
				        "node_name": "主题",
				        "x": 295.0749969482422,
				        "y": 68.20000076293945,
				        "id": "fa6a6c8d",
				        "node_id":"2",
				        "index": 1
				    }],
				    "edges": [{
				        "source": "fa6a6c8d",
				        "sourceAnchor": 2,
				        "target": "a5bfaafc",
				        "targetAnchor": 0,
				        "id": "fa49802f",
				        "index": 2
				    }]
				}
			}
		}
		res.json(result);
	})
	app.post('/api/updateTree',function(req,res){
		// 创建新树的模拟接口
		let newTree = req.body.tree;
		let dealedTree = newTree.nodes.map((item) => {
			item.project_id = new Date().getTime() + Math.floor(Math.random()*100);
			return item;
		})
		console.log(dealedTree);
		let result = {
			resultCode: '0000',
			data: {
				project_id: 123,
				project_name: '测试项目',
				tree: {
					nodes: dealedTree,
					edges: newTree.edges
				}
			}
		}
		res.json(result);
	})
}
module.exports = bindMockApi;