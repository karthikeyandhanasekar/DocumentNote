//toggle form in mobile 

const toggleform = () => {

    console.log("toggleform");
    document.querySelector(".loginform").classList.toggle("hide")
    document.querySelector(".signinform").classList.toggle("hide",)
    let msg = document.querySelector(".signinlink")
    if (msg.innerHTML === 'Create account')
        msg.innerHTML = 'Already have account?..Login'
    else
        msg.innerHTML = 'Create account'



}

const displaynav = () => {
    document.querySelector("nav").classList.toggle("show")
}


document.querySelector(".burger").addEventListener("click", displaynav)


//get currentimestamp
const currenttimestamp = () => {
    let date = new Date()
    return date.valueOf()
}




//validpassword
const isvalidpassword = (value) => {
    let pattern = new RegExp('[A-Za-z0-9]', 'g')
    if (pattern.test(value) && value.length > 7 && value.length < 16)
        return true

    return false


}
//whether email is unique or not
const isemailexists = ({ email, newemail }) => {

    let result = email.filter((ele) =>
        ele === newemail
    )
    if (result.length === 0)
        return false
    return true
}

//get student details
const studentusers = async () => {
    try {
        let api = await axios.get('https://618dce1ffe09aa00174408ad.mockapi.io/StudentUsers')
        return api.data
    } catch (error) {
        console.log(error);
    }
}

window.onload = () => studentusers()

//post data
const poststudentuser = async (data) => {
    try {
        let api = await axios.post('https://618dce1ffe09aa00174408ad.mockapi.io/StudentUsers', { data })
        if (api.status === 201)
            return true

        return false
    } catch (error) {

    }


}

const getstudentuser = async () => {
    try {
        let api = await axios.get('https://618dce1ffe09aa00174408ad.mockapi.io/StudentUsers')
        if (api.status === 200)
            return api.data;

    } catch (error) {

    }

}



//signin process
const signin = async (event) => {
    try {
        event.preventDefault()
        let form = document.forms['signin']

        let createuser = {
            [form.email.value]: {
                username: form.username.value,
                password: form.password.value,
                createdAt: currenttimestamp(),
                lastlogin: currenttimestamp(),
            }

        }

        let users = await getstudentuser()

        let emailexist = (users.map(ele => Object.keys(ele.data))).flat(1);



        if (isemailexists({ email: emailexist, newemail: form.email.value })) {
            document.querySelector(".emailerror").innerHTML = "Email Already exists"
            return
        }


        else if (!isvalidpassword(form.password.value)) {
            document.querySelector(".emailerror").innerHTML = ""
            document.querySelector(".passworderror").innerHTML = "Password should between 8 & 15 characters  "
            return
        }
        else {
            await poststudentuser(createuser) ? window.location.href = `folders.html?email=${form.email.value}&username=${form.username.value}` : alert("post fail")

        }

        document.querySelector(".emailerror").innerHTML = ""
        document.querySelector(".passworderror").innerHTML = ""
        // poststudentuser(createuser) ? window.location.href = `folders.html?email=${form.email.value}&username=${form.username.value}` : alert("post fail")

        window.onload = () => signin()

    } catch (error) {
        console.log(error);

    }


}

//login
const login = async (event) => {
    try {
        event.preventDefault()
        let form = document.forms['login']
        // console.log(form);

        let email = form.email.value
        let password = form.password.value

        let users = await getstudentuser()

        let existuser = users.filter(ele => {
            let key = Object.keys(ele.data)[0]
            if (key === email)
                return ele.data;
        })[0]
        if (existuser === undefined)
            document.querySelector(".loginemailerror").innerHTML = "Email Not Found"
        else
            document.querySelector(".loginemailerror").innerHTML = ""


        if (existuser.data[email].password === password) {
            document.querySelector(".loginpassworderror").innerHTML = ""

            window.location.href = `folders.html?email=${form.email.value}&username=${existuser.data[email].username}`
        }
        else {
            document.querySelector(".loginpassworderror").innerHTML = "Invalid Password"
        }

        window.onload = () => login()

    } catch (error) {
        console.log(error);

    }
}

const forgotpassword = async (event) => {
    event.preventDefault()
    const users = await getstudentuser()
    console.log(users);
    const form = document.forms['login']
    // console.log(form);

    const email = form.email.value
    let existuser = users.filter(ele => {
        let key = Object.keys(ele.data)[0]
        if (key === email)
            return ele.data;
    })[0]
    if (existuser === undefined)
        document.querySelector(".loginemailerror").innerHTML = "Email Not Found"
    else {
        const userid = existuser.id;
        const url = `forgotpassword.html?id=${userid}`
        console.log(url);
        window.location.href = url
    }
}



//call signinprocess
document.querySelector("#signin").addEventListener("submit", signin, true)

document.querySelector("#login").addEventListener("submit", login, true)
document.querySelector(".forgotpassword").addEventListener("click", forgotpassword, true)


