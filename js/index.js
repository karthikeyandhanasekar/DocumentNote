//toggle form in mobile 
let state = false
const toggleform = () => {
    let loginform = `
<form action="" name="login"  method="post" >
    <h4>Login</h4>
    <input type="email" name="email" id="loginemail" placeholder="username@email.com" required autofocus>
    <input type="password" name="password" id="loginpassword" placeholder="Password" required>
    <a href="">ForgotPassword..?</a>
    <label for="" class="error"></label>
    <div class="buttons">
        <input type="submit" name="login" value="Login" id="login">
        <input type="reset" name="reset" value="Reset" >

    </div>
</form>`
    const singinform = `
    
    <form  method="post" name="signin" id="signin"   >
    <h4>Sign-in</h4>
    <input type="text" name="username" id="username" placeholder="Username" required autofocus value="karhtik">

    <input type="email" name="email" id="signinemail" placeholder="username@email.com" required  value="karthik@gmail.com">
    <label for="" class="emailerror error"></label>

    <input type="password" name="password" id="signinpassword" placeholder="Password" required value="123456789">
    <label for="" class="passworderror error"></label>
    <div class="buttons">
        <input type="submit" name="signin" value="Signin"  >
        <input type="reset" name="reset" value="Reset" >

    </div>
</form>`
    state = !state
    if (state) {
        console.log(singinform);
        //need to check this in future
        document.querySelector(".signinlink").innerHTML = ''

        document.querySelector(".loginform").innerHTML = singinform
        document.querySelector(".signinlink").innerHTML = "Don't have Create yourself..."

    }
    else {
        document.querySelector(".signinlink").innerHTML = ''

        document.querySelector(".loginform").innerHTML = loginform
        document.querySelector(".signinlink").innerHTML = "Had then..educate yourself"

    }
}


/*
//digitalclock
const digitalclock = () => {
    let date = new Date()

    let format = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()} : ${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} : ${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`

    document.querySelector(".time").innerHTML = format

}
setInterval(digitalclock, 1000)
*/

//get currentimestamp
const currenttimestamp = () => {
    let date = new Date()
    return date.valueOf()
}


//intialize mockapi


//validpassword
const isvalidpassword = (value) => {
    // console.log(value.length);
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
    console.log(result);
    if (result.length === 0)
        return false
    return true
}

//get student details
const studentusers = async () => {
    try {
        let api = await axios.get('https://618dce1ffe09aa00174408ad.mockapi.io/StudentUsers')
        // console.log(api.data);
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
        console.log(emailexist);


        if (emailexist.length != 0) {
            if (isemailexists({ email: emailexist, newemail: form.email.value }))
                document.querySelector(".emailerror").innerHTML = "Email Already exists"
            

            else if (!isvalidpassword(form.password.value))
            {
                document.querySelector(".emailerror").innerHTML = ""
                document.querySelector(".passworderror").innerHTML = "Password should between 8 & 15 characters  "
            }
            else {
                poststudentuser(createuser) ? window.location.href = `folders.html?email=${form.email.value}&username=${form.username.value}` : alert("post fail")

            }
        }
        else {
            document.querySelector(".emailerror").innerHTML = ""
            console.log(document.querySelector(".emailerror").innerHTML);

            document.querySelector(".passworderror").innerHTML = ""

            poststudentuser(createuser) ? window.location.href = `folders.html?email=${form.email.value}&username=${form.username.value}` : alert("post fail")

        }
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
        console.log(form);

        let email = form.email.value
        let password = form.password.value




        let users = await getstudentuser()
        //console.log(users);

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

            window.location.href = `folders.html?email=${form.email.value}&username=${existuser.data[email].password}`
        }
        else {
            document.querySelector(".loginpassworderror").innerHTML = "Invalid Password"
        }


        window.onload = () => login()





    } catch (error) {
        console.log(error);

    }


}

//call signinprocess
document.querySelector("#signin").addEventListener("submit", signin, true)

document.querySelector("#login").addEventListener("submit", login, true)


