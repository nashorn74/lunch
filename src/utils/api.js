export function fetchPeople (dispatch, setPeopleData) {
	fetch('http://localhost:2018/api/people')
	.then(response => response.json())
	.then(data => {
		dispatch(setPeopleData(data.results))
	})
}

export function addPeople (name, dispatch, deletePeopleData) {
	fetch('http://localhost:2018/api/people', 
		{
			method: 'post',
			headers: {
	            'Content-Type': 'application/json',
	        },
			body: JSON.stringify({ name: name })
		})
	.then(response => response.json())
	.then(data => {
		dispatch(deletePeopleData(data))
	})
}

export function deletePeople (name, dispatch, deletePeopleData) {
	fetch('http://localhost:2018/api/people', 
		{
			method: 'delete',
			headers: {
	            'Content-Type': 'application/json',
	        },
			body: JSON.stringify({ name: name })
		})
	.then(response => response.json())
	.then(data => {
		dispatch(deletePeopleData(data))
	})
}

export function createGroup (count, min, dispatch, createGroupData) {
	fetch('http://localhost:2018/api/group?count='+count+'&min='+min)
	.then(response => response.json())
	.then(data => {
		dispatch(createGroupData(data))
	})
}
