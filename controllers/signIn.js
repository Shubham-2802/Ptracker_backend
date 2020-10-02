const handlesignIn = (req,res,bcrypt,db) => {
	const {username, password} = req.body;
	if (!username || !password){
		return res.status(400).json("Unable to signIn")
	}
	db.select('username','hash').from('user')
	 .where('username','=',username)
	 .then(data => {
	 	const isValid = bcrypt.compareSync(password, data[0].hash);  //validating the entered password by user with the stored password in database
	 	if(isValid){
	 		return db.select('*').from('login')
	 		.where('username','=',username)
	 		.then(user => {
	 			res.json([{status:'success'},{userid:user.userid}])   // response as success message and userid
	 		})
	 		.catch(err => res.status(400).json('No such user'))
	 	} else {
	 		res.status(400).json('wrong credentials')
	 	}
	 })
	 .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handlesignIn:handlesignIn
};