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

app.get("/", async (req, res) => {
	// https://my.newtonschool.co/playground/project/j8xactw291cg
	try {
		const { name } = req.query;
		let count;
		if (!name) {
			count = await users.find({}).count();
		} else {
			const regex = new RegExp(`^${name}`, "i");
			count = await users.find({ name: { $regex: regex } }).count();
		}
		Number(count);
		res.json({ count });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = app;
