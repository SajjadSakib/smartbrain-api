
const profileHandler=(req,res,db)=>{
	const {id}=req.params
	db.select('*').from('users')
	.where('id','=',id)
	.then(response=>{
		if(response.length){
			res.json(response[0])}
		else{
			res.status(400).json('User data in not available')
			}})
		
	.catch(err=>res.json('error getting data'))
}

module.exports={
	profileHandler:profileHandler
}

