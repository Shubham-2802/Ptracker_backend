const handleRegister = (req,res,bcrypt,db) => {
	const {username,password} = req.body;
	if (!username || !password){
		return res.status(400).json("Unable to register")
	}
	var hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash:hash,
			username:username
		})
	.into('user')               // inserting username and encrypted password into user table
	.returning('username')
	.then(username => {
			return trx('login')     // subsequently inserting username and joined datetime into login table for further signin option
			.returning('*')
			.insert({
					username:username,
					joined:new Date()
				})
			.then(user => {
			 res.json('account created')  // response on successfull registration
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
    })
	.catch(err => res.status(400).json('Unable to Register'))  // response on encountering any kind of error
}

module.exports = {
	handleRegister: handleRegister
};