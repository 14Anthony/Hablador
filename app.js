//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});
//update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form

    newNameForm.reset();
    //show then hide the update message
    updateMessage.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMessage.innerText = '', 3000);
});

// chatroom listeners updating chatroom
rooms.addEventListener('click', e => {
    console.log(e);

    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat))
    }
});


// check local storage for user name
const username = localStorage.usernam ? localStorage.username : 'Anonymous';
// class instances

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);
// console.log(chatroom);
//get the chats and render
chatroom.getChats(data => chatUI.render(data));