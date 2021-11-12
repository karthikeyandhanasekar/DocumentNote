



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

    let signinform = `<form action="" name="signin"  method="post" >
    <h4>Sign-in</h4>
    <input type="email" name="email" id="signinemail" placeholder="username@email.com" required autofocus>
    <input type="password" name="password" id="signinpassword" placeholder="Password" required>
    <label for="" class="error"></label>
    <div class="buttons">
        <input type="submit" name="signin" value="Signin" id="signin">
        <input type="reset" name="reset" value="Reset" >

    </div>
</form>`
    state = !state
    if (state) {
        //need to check this in future
        document.querySelector(".signinlink").innerHTML =''

        document.querySelector(".loginform").innerHTML = signinform
        document.querySelector(".signinlink").innerHTML = "Don't have Create yourself..."

    }
    else {
        document.querySelector(".signinlink").innerHTML =''

        document.querySelector(".loginform").innerHTML = loginform
        document.querySelector(".signinlink").innerHTML = "Had then..educate yourself"

    }
}
document.querySelector(".signinlink").addEventListener("click", toggleform)