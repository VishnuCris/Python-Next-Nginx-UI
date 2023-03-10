import Cookies from 'js-cookie';

const postOptions = (data={}) =>{
	return{
		method:'POST',
		mode:'cors',
		headers:{
			'Content-Type':'application/json',
		},
		credentials:'include',
		body:JSON.stringify(data),
	}
}

const externalPostOptions = (data={}) =>{
	return{
		method:'POST',
		mode:'cors',
		headers:{
			'Content-Type':'application/json',
		},
		body:JSON.stringify(data),
	}
}

export const callApi = (url,data) =>{
	let headersPOST = postOptions(data)
	if(Cookies.get('csrf_access_token')){
		headersPOST['headers'] = {...headersPOST['headers'],...{'X-CSRF-Token':Cookies.get('csrf_access_token')}}
	}	
	return fetch('http://127.0.0.1:5001'+url,headersPOST)
		.then(res => res.json())
		.catch(err => {
			return {msg:err,status:false}
		})
}

export const externalApiCall = (url,data) =>{
	let headersPOST = externalPostOptions(data)
	headersPOST['headers'] = {...headersPOST['headers'],...{"Content-Type":"application/json","Authorization":"Bearer "+process.env.NEXT_PUBLIC_OPENAI_API_KEY}}
	return fetch(url,headersPOST)
		.then(res => {
			return res.json()
		})
		.catch(err => {
			return {message:err,status:false}
		})
}

export const validateInputs = (data) =>{
	for(let key in data){
		if(!data[key])
			return {'msg':`Please enter ${key}`,'status':false}
	}
	return {'status':true}
}
