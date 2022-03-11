const form = document.getElementById('github-form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    //data we want to pass from the form 
    // debugger
    // event.target[0].value
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(res => res.json())
    .then(data => {
        //login, avatar_url, profile
        const userList = document.getElementById("user-list")
        const reposList = document.getElementById("repos-list")
        reposList.innerHTML = ""
        userList.innerHTML = ""
        data.items.map(item => {
            // console.log(item)
            const li = document.createElement("li")
            const h2 = document.createElement("h2")
            const a = document.createElement("a")
            
            const {login, avatar_url, html_url} = item
            h2.textContent = login

            h2.addEventListener('click', e => showUserRepos(login, e))


            const img = document.createElement("img")
            img.src = avatar_url

            a.href = html_url
            a.innerText = "Profile"

            
            


            li.append(h2, img, a)
            userList.append(li)
            // reposList.append(li)
        })
    })
    form.reset()
})

function showUserRepos(username, e){
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    e.preventDefault()
    // console.log(username)
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(data => {
        data.map(repo => {
            const li = document.createElement("li")
            const h1 = document.createElement('h1')
            const {name} = repo
            h1.textContent = name
            li.append(h1)
            reposList.append(li)
        })
    })
}



    




