const search = new URLSearchParams(window.location.search)

const username = search.get("username")
const useremail = search.get("email")
const notename = search.get("note")
const noteid = search.get("id")
const folder = search.get("folder")
document.title = notename
let oldcontent = ''

document.querySelector(".tofolder").href = `folders.html?email=${useremail}&username=${username}`
document.querySelector(".tonote").href = `notes.html?email=${useremail}&folder=${folder}&username=${username}`
console.log(document.querySelector(".tonote").href);


const displaymodal = () => {
    document.querySelector(".modal").style.display = "block"


}


const getnote = async () => {
    try {
        let api = await axios.get(`https://618dce1ffe09aa00174408ad.mockapi.io/StudentContent/${noteid}`)
        if (api.status === 200)
            return api.data
    } catch (error) {
        console.log(error);

    }
}
//update in api
const updateapi = async (data) => {
    try {
        let api = await axios.put(`https://618dce1ffe09aa00174408ad.mockapi.io/StudentContent/${noteid}`, { data })
        if (api.status === 200)
            return true
    } catch (error) {
        console.log(error);

    }
}

//deletenote
const deletenote = async () => {
    try {
        let api = await axios.delete(`https://618dce1ffe09aa00174408ad.mockapi.io/StudentContent/${noteid}`)
        console.log(api);
        if (api.status === 200)
            return true

        return false
    } catch (error) {
        console.log(error);

    }
}
const rendercontent = async () => {
    try {
        let data = await getnote()
        data = data.data[Object.keys(data.data)[0]]
        oldcontent = data.content

        document.querySelector(".contents").innerHTML = data.content


    } catch (error) {
        console.log(error);

    }

}

const confirmupdate = async () => {
    try {
        let data = await getnote()
        data = data.data[Object.keys(data.data)[0]]
        const note = useremail.split('@')[0] + "-" + folder + "-" + notename
        //console.log(key);


        let contentui = document.querySelector(".contents")

        const usernote = {
            [note]: {
                content: contentui.textContent,
                createdAt: data.createdAt
            }
        }
        console.log(usernote);



        await updateapi(usernote) ? window.onload = () => rendercontent() : alert("update failed")
        closemodal()



    } catch (error) {
        console.log(error);
    }

}

let editable = false
const updatecontent = async () => {
    try {
        document.querySelector(".updatedeletenote").innerHTML = ''

        let temp = ""
        let contentui = document.querySelector(".contents")

        editable = !editable
        if (editable) {

            contentui.setAttribute("contenteditable", true)
            contentui.setAttribute("autofocus", true)
            contentui.setAttribute("spellcheck", "true")
            document.querySelector(".noteupdate").innerHTML = "Submit"
            document.querySelector(".noteupdate").style.backgroundColor = "green"
        }
        else {
            contentui.setAttribute("contenteditable", false)

            const newcontent = contentui.textContent

            if (oldcontent === newcontent) {

                alert('Nothing Changed to Update')
                document.querySelector(".noteupdate").innerHTML = "Update"
                document.querySelector(".noteupdate").style.backgroundColor = "#dc143c"
                return
            }
            else {
                temp = `
              
                    <span class="close" onclick="return closemodal()">X</span>
                    <h6 class="confirmessage">Confirm for updation</h6><br>
                    <button onclick="return confirmupdate()">Confirm</button>`

            }
            displaymodal()
            document.querySelector(".updatedeletenote").innerHTML += temp


            document.querySelector(".noteupdate").innerHTML = "Update"
            document.querySelector(".noteupdate").style.backgroundColor = "#dc143c"



        }
    } catch (error) {
        console.log(error);

    }

}

document.querySelector(".noteupdate").addEventListener("click", updatecontent)

window.onload = () => rendercontent()


const confirmdelete = async () => {
    try {
        closemodal()
        await deletenote() ? window.location.href = `notes.html?email=${useremail}&folder=${folder}&username=${username}` :
            alert("deletion failed")
    } catch (error) {
        console.log(error);

    }

}


const deletecontent = () => {
    displaymodal()
    document.querySelector(".updatedeletenote").innerHTML = ''
    const temp = `
    <span class="close" onclick="return closemodal()">X</span>
                    <h6 class="confirmessage">Confirm for Deletion</h6><br>
                    <button onclick="return confirmdelete()">Confirm</button>`
    document.querySelector(".updatedeletenote").innerHTML = temp


}



document.querySelector(".notedelete").addEventListener("click", deletecontent)



const closemodal = () => {
    document.querySelector(".modal").style.display = "none"
}
let talk = false
const voicelist = responsiveVoice.getVoices();
//console.log(voicelist);


const texttospeech = () => {

    talk = !talk
    if (talk) {


        responsiveVoice.speak(document.querySelector(".contents").textContent, "UK English Male", { rate: .8 });
    }
    else {

        if (responsiveVoice.isPlaying()) {
            //   console.log("pause");
            responsiveVoice.pause()
        }

    }



}
// global array
document.querySelector(".speakcontent").addEventListener("click", texttospeech)


const sharecontent = () =>
{
    const whatsAppURL = `https://wa.me?text=${encodeURIComponent(document.querySelector(".contents").textContent)}`;
console.log(whatsAppURL);
    window.open(whatsAppURL)

}


document.querySelector(".sharecontent").addEventListener("click",sharecontent)
