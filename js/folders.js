
const search = new URLSearchParams(window.location.search)

const username = search.get("username")
const useremail = search.get("email")

document.title = username


//get currentimestamp
const currenttimestamp = () => {
    let date = new Date()
    return date.valueOf()
}

//generatedate 
const dateformat = (timestamp) => {
    const date = new Date(timestamp)
    return "" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()


}

//captialize string
const stringcaptialzise = (value) => value[0].toUpperCase() + value.slice(1,).toLowerCase()



//displaymodal
const displaymodal = () => {
    document.querySelector(".modal").style.display = "block"


}



const usernotes = async () => {
    try {
        let api = await axios.get('https://618dce1ffe09aa00174408ad.mockapi.io/StudentNotes')
        if (api.status === 200)
            return api.data
    } catch (error) {
        console.log(error);

    }


}
const renderfolder = async () => {
    try {
        document.querySelector(".folders").innerHTML = ''
        let folder = `  <div class="createfolder" onclick="return displaymodal()">
        <h1 >+</h1>
    </div>`

        let data = await usernotes()
        //console.log(data);

        let userdata = data.filter(ele => {
            let key = Object.keys(ele.data)[0]
            if (key === useremail)
                return ele.data;
        })
        userdata.reverse()
        userdata.map(ele => {

            let temp = ele.data[useremail]
            let foldername = Object.keys(temp)[0]
            let notecount = temp[foldername]["notes"].length
            let createat = dateformat(temp[foldername]["createdAt"])
            folder += `
            <div class="folder" id="${foldername}" onclick="return gotonotes(this)" >
            <p class="foldertitle">${foldername}</p>
            <p class="note">${notecount} &nbsp Notes </p>
            <p class="createdat">${createat}</p>
        </div>`


        })
        document.querySelector(".folders").innerHTML = folder


    } catch (error) {
        console.log(error);
    }

}

window.onload = () => renderfolder()

//post data
const poststudentnotes = async (data) => {
    try {
        let api = await axios.post('https://618dce1ffe09aa00174408ad.mockapi.io/StudentNotes', { data })
        if (api.status === 201)
            return true

        return false
    } catch (error) {

    }


}

const addfolder = async () => {
    let foldername = stringcaptialzise(document.querySelector("#foldername").value)
    const userfolder = {
        [useremail]: {
            [foldername]: {
                notes: [],
                createdAt: currenttimestamp()
            }

        }
    }
    let data = await usernotes()
    let existemail = new Set(data.map(ele => Object.keys(ele.data)[0]))
    let checkemail = [...existemail].filter(ele => useremail === ele)
    if (checkemail.length === 0) {
        poststudentnotes(userfolder) ? alert("sucess") : alert("failure")
        closemodal()
        renderfolder()
        return
    }

    data = data.filter(ele => {
        if (useremail === Object.keys(ele.data)[0])
            return ele.data


    })
    data = data.map(ele => ele.data)
    data = data.filter(ele => foldername === Object.keys(ele[useremail])[0])


    if (foldername.length !== 0 && data.length === 0) {
        document.querySelector(".foldernameerror").style.display = "none"


        poststudentnotes(userfolder) ? alert("sucess") : alert("failure")

        closemodal()
        renderfolder()

    }
    else {
        document.querySelector(".foldernameerror").style.display = "inline"

        document.querySelector(".foldernameerror").innerHTML = "Folder Name Exists/Required"
    }




}



document.querySelector(".addf").addEventListener("click", addfolder)


const closemodal = () => {
    document.querySelector(".modal").style.display = "none"
}
document.querySelector(".close").addEventListener("click", closemodal)

const gotonotes = (value) => {
    console.log(value.id);
    window.location.href = `notes.html?email=${useremail}&folder=${value.id}&username=${username}`
}


