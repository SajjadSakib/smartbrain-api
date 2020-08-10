const registerHandler=(req,res,db,bcrypt)=>{
	const {name,email,password}=req.body;
	if (!name||!email||!password){
		return res.status(400).json('Unable to register')
	}

	var hash = bcrypt.hashSync(password);
	db.transaction(trx=>{
		trx.insert({
			email:email,
			hash:hash
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
			return trx('users')
				.returning('*')
				.insert({
				name:name,
				email:loginEmail[0],
				joined:new Date()
			    })
			    .then(response=>
				res.json(response[0]))
			    
		})
		.then(trx.commit)
        .catch(trx.rollback);
	})
	.catch(err=>res.status(400).json('Failed to register'))
		
 }
 module.exports={
 	registerHandler:registerHandler
 }
