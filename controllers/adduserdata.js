const handleStore = (req,res,bcrypt,db) => {
	const {website,username,password} = req.body;
	const {userid} = req.params;
	if (!website || !username || !password){
		return res.status(400).json("Empty field values")
	}
	var hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			userid:userid,
			website:website,
			username:username,
			hash:hash
		})
		.into('userdata')               // inserting website,username and encrypted password into userdata table corresponding to respective user
		.then(res => {
			res.status(200).json({status:'success'})
		})
    })
	.catch(err => res.status(400).json('Unable to add user data'))  // response on encountering any kind of error
}

module.exports = {
	handleStore: handleStore
};