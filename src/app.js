const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require("../models/user.js");

//Router Middlewares
app.use(express.json());

//Type of query (Hint)

/*

1. / --> this means we need to consider all users
2. /?name=swa --> Will return count of all the user name that have prefix swa. We will (Swaraj Jain, Swarak agrawal, etc). 
3. /?name= -->this means we need to consider all users

*/


// Complete this Route which will return the count of Number of Prefixmatch for the name in the query/

app.get("/", async function (req, res) {
	// https://my.newtonschool.co/playground/project/j8xactw291cg
	var name = req.query.name,
		count = 0;
	result = await users.find({});
	if (typeof name === "undefined") {
		count = result.length;
		res.send(JSON.stringify(count));
	} else {
		name = name.toLowerCase();
		for (var i = 0; i < result.length; i++) {
			var len = name.length,
				match = 1,
				cur_name = result[i]["name"].toLowerCase();
			if (cur_name.length >= len) {
				for (var j = 0; j < len; j++) {
					if (cur_name[j] != name[j]) {
						match = 0;
						break;
					}
				}
			}
			count += match;
		}
		res.send(JSON.stringify(count));
	}
});

module.exports = app;
