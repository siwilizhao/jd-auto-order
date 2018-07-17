const {
    dialog
} = require('electron').remote
const webview = document.querySelector('webview')
const $ = require('jquery')
const wait = require('siwi-wait')
const {
    USERNAME,
    PASSWORD
} = require('../../.env.js')
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
                await wait(5 * 1000)
                console.log('自动下单')
            }
        })

        $('.btn-stop').click(async () => {
            lock = false
        })
        $('.btn-start').click(async () => {
            lock = true
            while (lock) {
                await wait(5 * 1000)
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
        const href = `https://plogin.m.jd.com/user/login.action?appid=461&returnurl=http%3A%2F%2Fhome.m.jd.com%2FmyJd%2Fhome.action&ipChanged=`
        await this.loadUrl(href)
        const code = `
            document.getElementById('username').value = ${USERNAME}
            document.getElementById('password').value = '${PASSWORD}'
            document.getElementById('loginBtn').className += ' btn-active'
            document.getElementById('loginBtn').click()
        `
        const res = await this.executeJavaScript(code)
        console.log(res)
    }

    async autoSubmit() {

    }


}


(function () {
    new Jd()
})()