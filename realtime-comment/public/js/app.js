let username
let socket=io()
do{
    username=prompt("Enter Your Name:")
}
while(!username)

const textarea=document.querySelector("#textarea")
const button=document.querySelector("#button")
const commentbox=document.querySelector('.comment__box')

button.addEventListener(('click'),(e)=>{
     e.preventDefault()
     let comment=textarea.value;
     if(!comment)
    {
        alert("type comment")
            return
    }
    textarea.value=" "
    postComment(comment)
})

function postComment(comment)
{
    
    //apend dom
     const data={
        username:username,  
        comment:comment
    }
    appendToDom(data)
    //broadcast

    broadCastComment(data)
    //sync with mongoDB
}

    function appendToDom(data){
        let lTag = document.createElement('li')
        lTag.classList.add('comment', 'mb-3')

        let markup = `
        <div class="card border-light mb-3">
            <div class="card-body">
                <h6 class="card-title">${data.username}</h6>
                <p class="card-text">${data.comment}</p>
                <div class="text-muted">
                     <img src="/img/clock.png" alt="clock">
                    <small>${moment(data.time).format('LT')}</small>
                </div>
            </div>
        </div>
        `
        lTag.innerHTML = markup

        commentbox.prepend(lTag)   
    }
function broadCastComment(data)
{
    //socket
   socket.emit("comment",data)
}

socket.on("comment",(data)=>{
    appendToDom(data)
})

