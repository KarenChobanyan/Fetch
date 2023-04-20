"use strict"
const getPostsButton = document.querySelector("#getPosts")
getPostsButton.onclick = async function () {
  let posts = await getPostes()
  let users = await getUsers()
  renderPosts(posts, users)
}

async function getPostes() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts")
  let result = await response.json()
  return (result)

};

async function getUsers() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users")
  let result = await response.json()
  return result
};

function renderPosts(posts, users) {
  let place = document.querySelector("#body")
  place.innerHTML = ""
  for (let i = 0; i < posts.length; i++) {
    let postDiv = document.createElement("div")
    let idDiv = document.createElement("div")
    let nameDiv = document.createElement("div")
    nameDiv.classList.add("nameDiv")
    let userNum = i
    if (userNum >= 10) {
      userNum = Math.ceil(i % users.length)
    }
    nameDiv.innerText = users[userNum].name
    idDiv.setAttribute("id", posts[i].id)
    postDiv.classList.add("postDiv")
    postDiv.addEventListener("click", renderComments)
    let headerDiv = document.createElement("div")
    headerDiv.classList.add("postHeaderDiv")
    let bodyDiv = document.createElement("div")
    bodyDiv.classList.add("postBodyDiv")
    headerDiv.innerText = posts[i].title
    bodyDiv.innerText = posts[i].body
    place.append(postDiv)
    let placeForPost = document.getElementsByClassName("postDiv")[i]
    placeForPost.append(headerDiv)
    placeForPost.append(bodyDiv)
    placeForPost.append(nameDiv)
    placeForPost.append(idDiv)

  }
};


async function renderComments() {
  let comments = await getComments(this)
  let fullWatchPost = document.querySelector("#openComments")
  let closeButton = fullWatchPost.querySelector("#closeButton")
  closeButton.onclick = (() => fullWatchPost.style.display = "none")
  console.log(fullWatchPost);
  let name = this.getElementsByClassName("nameDiv")[0].innerText
  let title = this.getElementsByClassName("postHeaderDiv")[0].innerText
  let post = this.getElementsByClassName("postBodyDiv")[0].innerText
  let divForName = fullWatchPost.querySelector("#forUser")
  divForName.onclick = async () => {
    let users = await getUsers()
    let user = users.filter((el => el.name == name))
    renderUsers(user)
    closeButton.click()
  }
  divForName.innerText = name

  let divForTitle = fullWatchPost.getElementsByClassName("postTitle")[0]
  divForTitle.innerText = title
  let divForPost = fullWatchPost.querySelector("#post")
  divForPost.innerText = post
  let divForCommnts = fullWatchPost.querySelector("#commentSheet")
  for (let i = 0; i < comments.length; i++) {
    let comment = document.createElement("div")
    comment.classList.add("commenttDiv")
    let comWritersEmail = document.createElement("div")
    comWritersEmail.classList.add("commentWriterEmail")
    comWritersEmail.innerText = comments[i].email
    let commentBody = document.createElement("div")
    commentBody.classList.add("commetnBody")
    commentBody.innerText = comments[i].body
    comment.append(comWritersEmail)
    comment.append(commentBody)
    divForCommnts.append(comment)
  }
  let addedComment = fullWatchPost.querySelector("#commnetWritePlace")
  let addCommentButton = fullWatchPost.querySelector("#commentButton")
  addCommentButton.onclick = async function () {
    if (addedComment.value) {
      let newComment = new Comment(addedComment.value, 177, "karen.ysu7@mail.ru")
      let res = await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "Post",
        body: JSON.stringify(newComment)
      })
      let result = await res.json()
      let myComment = document.createElement("div")
      myComment.classList.add("commenttDiv")
      let myEmail = document.createElement("div")
      myEmail.classList.add("commentWriterEmail")
      myEmail.innerText = newComment.email
      let myCommentBody = document.createElement("div")
      myCommentBody.classList.add("commetnBody")
      myCommentBody.innerText = newComment.body
      myComment.append(myEmail)
      myComment.append(myCommentBody)
      divForCommnts.append(myComment)
      addedComment.value = ""
    } else {
      alert("Enter your comment")
    }

  }
  fullWatchPost.style.display = "flex"

};

async function getComments(el) {
  let id = el.lastElementChild.id
  let comment = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
  let result = await comment.json()
  return result
};

class Comment {
  constructor(body, id, email) {
    this.body = body
    this.id = id
    this.email = email
  }
};


const getUsersButton = document.querySelector("#getUsers")
getUsersButton.onclick = async function () {
  let users = await getUsers()
  let close = document.querySelector("#closeButton")
  close.click()
  renderUsers(users)
}


async function getUsers() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users")
  let result = response.json()
  return result
};


function renderUsers(array) {
  let place = document.querySelector("#body")
  place.innerHTML = ""
  for (let i = 0; i < array.length; i++) {
    let userDiv = document.createElement("div")
    userDiv.classList.add("userDiv")
    let userHeader = document.createElement('div')
    userHeader.classList.add("userHeader")
    let usersPics = document.createElement("div")
    usersPics.classList.add("usersPics")
    usersPics.innerText = "No photo"
    let userMain = document.createElement("div")
    userMain.classList.add("userMain")
    let name = document.createElement("div")
    name.classList.add("userInfo")
    name.innerText = `Name:    ${array[i].name}`
    let userName = document.createElement("div")
    userName.classList.add("userInfo")
    userName.innerText = `User name :   ${array[i].username}`
    let email = document.createElement("div")
    email.classList.add("userInfo")
    email.innerText = `Email :    ${array[i].email}`
    let phone = document.createElement("div")
    phone.classList.add("userInfo")
    phone.innerText = `Phone :    ${array[i].phone}`
    let webSite = document.createElement("div")
    webSite.classList.add("userInfo")
    webSite.innerText = `WebSite :    ${array[i].website}`
    userMain.append(name)
    userMain.append(userName)
    userMain.append(email)
    userMain.append(phone)
    userMain.append(webSite)
    userHeader.append(usersPics)
    userHeader.append(userMain)
    userDiv.append(userHeader)
    place.append(userDiv)
  }
}