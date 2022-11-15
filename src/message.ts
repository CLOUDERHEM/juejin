export const message = {
    text: ['掘金自动任务'],
    push(str: string) {
        console.log(str)
        this.text.push(str)
    },
}
