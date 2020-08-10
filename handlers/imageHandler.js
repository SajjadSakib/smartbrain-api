const Clarifai =require('clarifai');
const app = new Clarifai.App({
 apiKey: API_KEY
});

const imageHandler=(req,res,db)=>{
	const {id}=req.body;
	db('users')
	.returning('entries')	
    .where('id', '=', id)
    .increment('entries', 1)		
	.then(response=>
		res.json(response[0]))
}
const imageUrl=(req,res)=>{
	let {url}=req.body
	app.models.predict(Clarifai.FACE_DETECT_MODEL, url)
	.then(response=>res.json(response))
	.catch(err=>res.status(400).json('Unable to work with api'))
}
module.exports={
	imageHandler,
	imageUrl
}
