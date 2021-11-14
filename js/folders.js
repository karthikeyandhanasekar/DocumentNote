
const search = new URLSearchParams(window.location.search)

const username = search.get("username")
const useremail = search.get("email")

document.title = username


//get currentimestamp
const currenttimestamp = () => {
    let date = new Date()
    return date.valueOf()
}

//displaymodal
const displaymodal = () => {
    document.querySelector(".modal").style.display = "block"


}
document.querySelector(".createfolder").addEventListener("click", displaymodal)



const addfolder = () => {
    let foldername = document.querySelector("#foldername").value
    if (foldername.length !== 0) {
        document.querySelector(".foldernameerror").style.display = "none"

        const userfolder = {
            [useremail]: {
                [foldername.trim()]: {
                    createdAt: currenttimestamp()
                }

            }
        }
        console.log(userfolder);
        closemodal()

    }
    else {
        document.querySelector(".foldernameerror").style.display = "inline"

        document.querySelector(".foldernameerror").innerHTML = "Folder Name Required"
    }


}



document.querySelector(".addf").addEventListener("click", addfolder)


const closemodal = () => {
    document.querySelector(".modal").style.display = "none"
}
document.querySelector(".close").addEventListener("click", closemodal)