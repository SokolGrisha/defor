module.exports = function EthAPI(to_address, str_abi) {
	this.web3 = new Web3();
	this.web3.setProvider(new this.web3.providers.HttpProvider("https://ropsten.infura.io"));
	this.abi = JSON.parse(str_abi);

	this.to_address = to_address;
	this.contract = new this.web3.eth.Contract(this.abi, this.to_address);

	this.check = function(arg, from_address) {
		return this.contract.methods.test(arg).call({from : from_address});
	}

	this.add = function(props) {
		this.private_key = buffer.Buffer.from(props.key, 'hex');

		this.web3.eth.getTransactionCount(props.fromAdress).then((current_nonce) => {
			let payloadData = this.contract.methods.add(props.reqHash).encodeABI();
			let rawTx = {
				nonce: this.web3.utils.toHex(current_nonce),
				gasLimit: this.web3.utils.toHex(50000),
				gasPrice: this.web3.utils.toHex(90000000000),
				to: this.to_address,
				from: props.fromAddress,
				value: this.web3.utils.toHex(0),
				data: payloadData
			};

			let tx = new EthJS.Tx(rawTx);
			tx.sign(this.private_key);
			let serTx = tx.serialize();

			return this.web3.eth.sendSignedTransaction('0x' + serTx.toString('hex'), (err, hash) => {
				if(err) props.reject && props.reject(err);
				else props.resolve && props.resolve(hash);
			});
		});
	}
}