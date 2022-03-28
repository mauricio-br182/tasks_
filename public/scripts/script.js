document.addEventListener('DOMContentLoaded', () => {
    updateHTML()
})

async function updateHTML() {
    try {
        const response = await fetch('http://localhost:8000/api/')
        const responseBody = await response.json()
        let postHTMLs = ''

        responseBody.forEach(post => {
            const postHTML = `   <div class='post'>
                                    <h2 class="title">${post.title}</h2>
                                    <p class='desc'>${post.desc}</p>
                                    <button  id="${post.id}" class='button' onClick='deletePost()'>x</button>
                                    <input type="checkbox" name="" id="">
                                </div>`
            postHTMLs += postHTML
        });
        document.querySelector('.posts').innerHTML = postHTMLs
    } catch (error) {
        console.log(error)
    }
}

async function createPost() {
    const title = document.querySelector(".title")
    const desc = document.querySelector(".desc")

    if (title.value === "" || desc.value === "") {
        alert('preencha todos os campos')
    } else {
        const post = {
            title: title.value,
            desc: desc.value,
        }
        try {

            const options = {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify(post)
            }

            const response = await fetch('http://localhost:8000/api/posts', options)
            const responseBody = await response.json()
            title.value = ''
            desc.value = ''
            updateHTML()

        } catch (error) {
            console.log(error)
        }
    }
}

function deletePost(){
    document.querySelectorAll('.button').forEach( button => {
        button.addEventListener('click', async () => {
            const id = button.id
            try {
                const options = {
                    method: "DELETE",
                }
                const response = await fetch(`http://localhost:8000/api/delete/posts/${id}`, options)
                const responseBody = await response.json()
                updateHTML()           
            } catch (error) {
                console.log(error)
            }
        })    
    })  
}

function updatePost(){
    document.querySelectorAll('')
}


