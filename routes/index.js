var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/lists', function(req, res, next)
{
	res.json([{id: 1234, title: 'listone', color: 'red'},{id: 2345, title: 'listtwo', color: 'blue'}]);
});

router.get('/lists/:id', function(req, res, next)
{
	res.json({"list": [{title: 'todoOne', status: true},{title: 'todoTwo', status: false}]});
});

router.get('/item/:id', function(req, res, next)
{
	res.json({ title: req.params.id, duedate: 'today', notes: 'these are my notes', status: 'active' });
});

router.post('/lists', function(req, res, next)
{
	req.body.list.id = 1234;

	res.json({id: req.body.list.id});

});

router.post('/item', function(req, res, next)
{
	req.body.id = 1234;

	res.json({id: req.body.id});
});

router.put('/item/:id', function(req, res, next)
{
	var todo = { title: req.params.id, duedate: 'today', notes: 'these are my notes', status: 'active' };
		todo.duedate = req.body.duedate;
		todo.status = req.body.status;

		if(todo.duedate == req.body.duedate && todo.status == req.body.status)
		{
			res.sendStatus(200);
		}
});

router.delete('/item/:id', function(req, res, next)
{
	var todo = {"list": [{id: 1234, title: 'todoOne', status: true},{id: 2345, title: 'todoTwo', status: false}]};

		for(var i = 0; i < todo.list.length; i++){
			if(todo.list[i].id == req.params.id){
				todo.list.splice(i,0);
			}
		}

		if(todo.list.length == 1){
			res.sendStatus(200);
		}
});

module.exports = router;


/*
Create an JSON api that does the following tasks and is all tested.

- GET /lists = DONE

- GET /lists/:id = DONE

- GET /item/:id = DONE

- POST /lists = DONE

- POST /item = DONE

- PUT /item/:id = DONE

- DELETE /item/:id = DONE
*/
