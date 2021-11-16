const search = new URLSearchParams(window.location.search)

const useremail = search.get("email")
const folder = search.get("folder")
const username = search.get("username")
document.title = folder

//url back to folder
document.querySelector(".tofolder").href = `folders.html?email=${useremail}&username=${username}`

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
        let api = await axios.get('https://618dce1ffe09aa00174408ad.mockapi.io/StudentContent')
        if (api.status === 200)
            return api.data
    } catch (error) {
        console.log(error);

    }


}
const postcontent = async (data) => {
    try {
        let api = await axios.post('https://618dce1ffe09aa00174408ad.mockapi.io/StudentContent', { data })
        if (api.status === 201)
            return true

        return false
    } catch (error) {

    }


}


const renderfolder = async () => {
    try {
        document.querySelector(".folders").innerHTML = ''
        let folderdiv = `  <div class="createfolder" onclick="return displaymodal()">
        <h1 >+</h1>
    </div>`

        let data = await usernotes()

        let userdata = data.filter(ele => {
            let names = Object.keys(ele.data)[0].split("-")

            if (folder === names[1] && useremail.split('@')[0] === names[0])
                return ele.data
        })
        userdata.reverse()
        userdata.map(ele => {
           // console.log(ele.id);
            const name = Object.keys(ele.data)[0].split("-")[2];
            const content = ele.data[Object.keys(ele.data)[0]].content
            const createat = dateformat(ele.data[Object.keys(ele.data)[0]].createdAt)
            console.log(createat);
            folderdiv += `
            <div class="folder" id="${ele.id}+${name}" onclick="return gotonotes(this)" >
            <p class="foldertitle">${name}</p>
            <p class="createdat">${createat}</p>
        </div>`

        })




        document.querySelector(".folders").innerHTML = folderdiv


    } catch (error) {
        console.log(error);
    }

}
window.onload = () => renderfolder()



const addnote = async () => {
    let note = stringcaptialzise(document.querySelector("#notename").value)
    let contentvalue = document.querySelector("#content").value
    const notename = useremail.split('@')[0] + "-" + folder + "-" + note


    if (contentvalue.length === 0) {
        document.querySelector(".contenterror").style.display = "inline"
        document.querySelector(".contenterror").innerHTML = "Content required"
        return
    } document.querySelector(".contenterror").style.display = "none"

    let data = await usernotes()

    let userdata = data.filter(ele => {
        let names = Object.keys(ele.data)[0].split("-")

        if (folder === names[1] && useremail.split('@')[0] === names[0] && note === names[2])
            return ele.data
    })

    if (userdata.length !== 0) {
        document.querySelector(".notenameerror").style.display = "block"

        document.querySelector(".notenameerror").innerHTML = "Note Name Exists"
        return
    }



    const usernote = {
        [notename]: {
            content: contentvalue,
            createdAt: currenttimestamp()
        }
    }

    if (note.length !== 0) {
        console.log("going topost");
        document.querySelector(".notenameerror").style.display = "none"
       await postcontent(usernote) ? renderfolder() : alert("failure")

        closemodal()
        

    }
    else {
        document.querySelector(".notenameerror").style.display = "inline"

        document.querySelector(".notenameerror").innerHTML = "Note Name Exists/Required"
    }

}



document.querySelector(".addf").addEventListener("click", addnote)


const closemodal = () => {
    document.querySelector(".modal").style.display = "none"
}
document.querySelector(".close").addEventListener("click", closemodal)



const gotonotes = (value) =>
{
    const params =  (value.id).split("+")
    const url = `displaynote.html?email=${useremail}&username=${username}&note=${params[1]}&id=${params[0]}&folder=${folder}`
    console.log(url);
    window.location.href=url
}


