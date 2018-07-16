const {dialog} = require('electron').remote
const $ = require('jquery')
const wait = require('siwi-wait')
const {USERNAME, PASSWORD} = require('../../.env.js')
let lock = false
class Jd {
    constructor() {
        this.init()
        this.bindEvent()
    }

    async init() {

    }
    async bindEvent() {
        $('.btn-login').click(async () => {
            await this.autoLogin()
        })
        $('.btn-auto-submit').click(async () => {
            lock = true
            while (lock) {
                await wait(5* 1000)
                console.log('自动下单')
            }
        })

        $('.btn-stop').click(async () => {
            lock = false
        })
        $('.btn-start').click(async () => {
            lock = true
            while (lock) {
                await wait(5* 1000)
                console.log('自动下单')
            }
        })
    }

    /**
     * 执行js
     * @param {*} code 
     */
    async executeJavaScript(code) {
        return new Promise((resolve, reject) => {
            const promiseCode = `
                new Promise((resolve, reject) => {
                    ${code}
                }).catch(error => {
                    console.log(error)
                    return {
                        ret: -1,
                        msg: error.message,
                        stack: error.stack
                    }
                })
            `
            webview.executeJavaScript(promiseCode, false, res => {
                if (res && res['ret'] != -1) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
        }).catch(error => {
            return error
        })
    }

    /**
     * 跳转连接
     * @param {*} url 
     */
    async loadUrl(url) {
        return new Promise((resolve, reject) => {
            $('webview').attr('src', url)
            resolve(true)
        })
    }

    /**
     * 检查的登陆状态
     */
    async checkLoginStatus() {

    }
    /**
     * 自动登陆
     */
    async autoLogin() {

    }

    async autoSubmit() {

    }

    
}


(function(){
    new Jd()
})()