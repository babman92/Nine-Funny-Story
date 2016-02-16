var express = require('express');
var app = new express();
var conn = require('./connection.js');
conn.initConnectionToDB();
require('events').EventEmitter.prototype._maxListeners = 0;
var NUMBER_STORY_PER_PAGE = 10;

var sql_select_all_cat = 'select * from nine_funny_category';
var sql_select_story_by_cat_id = 'select * from nine_funny_story where category_id = % limit $ offset #';

app.get('/', function(req, res){
	res.end('Hello api');
});

app.get('/api/nine-funny/list-cat', function(req, res){
	conn.excuteQuery(sql_select_all_cat, function(row){
		res.end(JSON.stringify(row));			
	});
});

app.get('/api/nine-funny/list-story', function(req, res){
	var cat_id = req.param('cat-id');
	var page = req.param('page');
	var limit = NUMBER_STORY_PER_PAGE;
	var offset = (page * NUMBER_STORY_PER_PAGE);
	var sql = sql_select_story_by_cat_id.replace('%', cat_id).replace('$', limit).replace('#', offset);
	console.log(sql);
	conn.excuteQuery(sql, function(row){
		res.end(JSON.stringify(row));
	});
});

var server = app.listen(2017, function(){
	console.log('server is listening at port 2017...');
});