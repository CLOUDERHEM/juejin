const message = {
	text: ['掘金自动任务'],
	push (str) {
		console.log(str)
		this.text.push(str)
	},
}


module.exports = message