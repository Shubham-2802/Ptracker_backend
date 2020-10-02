const handleShow = (req,res,db) => {
	const { userid } = req.params;
	db.select('*').from('userdata').where({userid})
	.then(user => {
		if(user.length){
			res.json(user[0])          // responding with the entire user data including websites,username & password
		} else {
			res.status(400).json('No such user')
		}
	})
}

module.exports = {
	handleShow:handleShow
};