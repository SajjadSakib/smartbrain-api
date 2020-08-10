const signinHandler=(req,res,db,bcrypt)=>{
	const {email,password}=req.body;
	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(response=>{
		var isValid = bcrypt.compareSync(password, response[0].hash);
	if(isValid){
		return db.select('*').from('users')
		.where('email','=',email)
		.then(data=>{res.json(data[0])})
		.catch(err=>res.status(400).json('login error'))
	}else{
		res.status(400).json('Wrong credentials')
	}
	})
	.catch(err=>res.status(400).json('Wrong credentials'))
}

module.exports={
	signinHandler:signinHandler
}

	