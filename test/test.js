"use strict";

var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var app = require('../app.js');

chai.use(chaiHttp);

describe('/GET lists', ()=>{
	it('/GETs an array of lists', (done)=>{
		chai.request(app)
			.get('/lists')
			.end((err, res)=>{ 
				expect(res).to.be.json;
				expect(res).to.be.array;
				expect(res.body[0]).to.include.keys('title', 'color');
				expect(res.body[1]).to.include.keys('title', 'color');
				done();
			});
	});
});

describe('/GET lists/:id', ()=>{
	it('/GETs a list of todo items', (done)=>{
		chai.request(app)
			.get('/lists/:id')
			.end((err, res)=>{ 
				expect(res).to.be.json;
				expect(res.body).to.include.key('list');
				expect(res.body.list).to.be.array;
				expect(res.body.list[0]).to.include.keys('title', 'status');
				expect(res.body.list[1]).to.include.keys('title', 'status');
				done();
			});
	});
});

describe('/GET item/:id', ()=>{
	it('/GETs a todo item', (done)=>{
		chai.request(app)
			.get('/item/:id')
			.end((err, res)=>{ 
				expect(res).to.be.json;
				expect(res.body).to.include.keys('title', 'duedate', 'notes', 'status');
				done();
			});
	});
});

describe('/POST lists', ()=>{
	it('/POSTs a list and returns id', (done)=>{
		chai.request(app)
			.post('/lists')
			.send({"list": [{title: 'todoOne', status: true},{title: 'todoTwo', status: false}]})
			.end((err, res)=>{ 
				expect(res).to.be.json;
				expect(res.body).to.include.keys('id');
				done();
			});
	});
});

describe('/POST item', ()=>{
	it('/POSTs an item and returns id', (done)=>{
		chai.request(app)
			.post('/item')
			.send({ title: 'mynote', duedate: 'today', notes: 'these are my notes', status: 'active' })
			.end((err, res)=>{ 
				expect(res).to.be.json;
				expect(res.body).to.include.keys('id');
				done();
			});
	});
});

describe('/PUT updates item', ()=>{
	it('/PUTs new values in an item', (done)=>{
		chai.request(app)
			.put('/item/:id')
			.send({ title: 'mynote', duedate: 'tomorrow', notes: 'these are my notes', status: false })
			.end((err, res)=>{ 
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('/DELETE deletes an item', ()=>{
	it('/DELETEs item', (done)=>{
		chai.request(app)
	    .get('/lists')
		    .end(function(err, res){
		      chai.request(app)
		        .delete('/item/'+res.body[0].id)
		        .end(function(err, res){
		          expect(res).to.have.status(200);
		          done();
		      });
		      done();
		    });
		});
});


