const search = new URLSearchParams(window.location.search)

const username = search.get("username")
const useremail = search.get("email")
const notename = search.get("note")
const noteid = search.get("id")
const folder = search.get("folder")
document.title = notename

document.querySelector(".tofolder").href = `folders.html?email=${useremail}&username=${username}`
document.querySelector(".tonote").href = `notes.html?email=${useremail}&folder=${folder}&username=${username}`
console.log(document.querySelector(".tonote").href);





const getnote = async () => {
    try {
        let api = await axios.get(`https://618dce1ffe09aa00174408ad.mockapi.io/StudentContent/${noteid}`)
        if (api.status === 200)
            return api.data
    } catch (error) {
        console.log(error);

    }


}

const rendercontent = async () =>
{
   try {
    let data = await getnote()
    data = data.data[Object.keys(data.data)[0]]

    document.querySelector(".contents").innerHTML=data.content
   } catch (error) {
       console.log(error);
       
   }

}


window.onload = () => rendercontent()