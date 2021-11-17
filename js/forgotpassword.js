
const search = new URLSearchParams(window.location.search)

const userid = search.get("id")
console.log(userid);


const isvalidpassword = (value) => {
    let pattern = new RegExp('[A-Za-z0-9]', 'g')
    if (pattern.test(value) && value.length > 7 && value.length < 16)
        return true

    return false


}

const getuser = async () => {
    try {
        let api = await axios.get(`https://618dce1ffe09aa00174408ad.mockapi.io/StudentUsers/${userid}`)
        if (api.status === 200)
            return api.data
    } catch (error) {
        console.log(error);

    }
}
//update in api
const updateapi = async (data) => {
    try {
        let api = await axios.put(`https://618dce1ffe09aa00174408ad.mockapi.io/StudentUsers/${userid}`, { data })
        if (api.status === 200)
            return true
    } catch (error) {
        console.log(error);

    }
}

const displaynav = () => {
    document.querySelector("nav").classList.toggle("show")
}
document.querySelector(".burger").addEventListener("click", displaynav)




const updatepassword = async (event) => {
    event.preventDefault()
    const form = document.forms["updatepassword"]
    const newpassword = form.newpassword.value
    console.log(newpassword);
    document.querySelector(".loginpassworderror").innerHTML = ""

    if (!isvalidpassword(newpassword)) {
        document.querySelector(".loginpassworderror").innerHTML = "Password should between 8 & 15 characters"
        return
    }

    const data = await getuser()
    const userdata = data.data[Object.keys(data.data)[0]]
    if (userdata.password === newpassword) {
        document.querySelector(".loginpassworderror").innerHTML = "Password is same with previous password"
        return
    }
    const updateuser = {
        [Object.keys(data.data)[0]]:
        {
            username: userdata.username,
            password: newpassword,
            createdAt: userdata.createdAt,
            lastlogin: userdata.lastlogin
        }
    }
   // console.log(updateuser);
    await updateapi(updateuser) ? window.location.href="../index.html" : alert("update password failed")

}




document.querySelector("#updatepassword").addEventListener("submit", updatepassword, true)