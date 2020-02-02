const express = require('express')
const Person = require('./models/Person')
const mongoose = require('mongoose')

const router = express.Router()

router.get('/people', (req, res) => {
	Person.find({}, function(err, results) {
		if (err) {
			res.send({success: false, err: err}, 500)
		} else {
			res.send({success: true, results: results})
		}
	})
})

router.post('/people', (req, res) => {
	const person = new Person();
	person.name = req.body.name;
	if (person.name != null && person.name != '') {
		person.save(function (err) {
			if (err) {
				res.send({success: false, result: err, results: []}, 500)
			} else {
				Person.find({}, function(err, results) {
					if (err) {
						res.send({success: false, result: err, results: []}, 500)
					} else {
						res.send({success: true, result: {inserted: person.name}, results: results})
					}
				})
			}
		});	
	} else {
		res.send({success: false, result: {failed: person.name}, results: []}, 400)
	}
})

router.delete('/people', (req, res) => {
	Person.deleteOne({ name: req.body.name }, function(err, result) {
		if (err) {
			res.send({success: false, result: err, results: []}, 500)
		} else {
			Person.find({}, function(err, results) {
				if (err) {
					res.send({success: false, result: err, results: []}, 500)
				} else {
					res.send({success: true, result: result, results: results})
				}
			})
		}
	})
})

createRandomlyGroups = function(output, group_count, min_count) {
	var group_result = []
	if (output.length < group_count * min_count) return null
	for (var i = 0; i < group_count; i++) {
		var count = Math.floor(output.length / group_count)
		if (i === group_count-1) {
			if (output.length % group_count !== 0) {
				count += output.length % group_count	
			}
		}
		if (count < min_count) return null
		var group = []
		for (var j = 0; j < count; j++) {
			var choice = null
			while(true) {
				choice = output[Math.floor(Math.random() * output.length)]
				if (choice._id !== null) {
					choice._id = null
					break;
				}
			}
			if (choice !== null) group.push(choice.name)
		}
		group_result.push(group)
	}
	return group_result
}

router.get('/group', (req, res) => {
	var group_count = req.param('count', 1)
	var min_count = req.param('min', 1)
	Person.find({}, function(err, results) {
		if (err) {
			res.send({success: false, err: err}, 500)
		} else {
			var group_result = createRandomlyGroups(JSON.parse(JSON.stringify(results)), group_count, min_count)
			if (group_result === null) {
				res.send({success: false, result: { message: 'can not create group' }}, 400)
			} else {
				res.send({success: true, result: group_result})
			}
		}
	})
	/*var o = {}, self = this
    o.map = function () {
    	var max = 2
    	var min = 1
    	var key = Math.floor(Math.random() * (max - min + 1)) + min
        emit(key, this.name)
    }
    o.reduce = function (key, vals) {
    	var result = { group: key, person:[] }
    	for (index in vals) {
    		result.person.push(vals[index])
    	}
        return result
    }
    Person.mapReduce(o, function (err, results) {
        if(err) {
        	res.send({success: false, err: err})
        } else {
        	res.send({success: true, mapReduce: results})
        }
    })*/
})

module.exports = router
