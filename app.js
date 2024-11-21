let Sender12 = null;

function toggleDropdown() {
    const dropdown = document.getElementById("senderDropdown");
    dropdown.classList.toggle("show");
}

function selectSender(sender) {
    const dropbtn = document.querySelector(".dropbtn");
    dropbtn.textContent = sender;
    Sender12 = sender;
    toggleDropdown();
}

function handleButtonClick() {
    const inputBox = document.getElementById("inputText");
    const message = inputBox.value.trim();

    if (!Sender12) {
        alert("Select a sender!");
        return;
    }

    if (!message) {
        alert("Enter a message!");
        return;
    }

    displayMessage(message, Sender12);
    inputBox.value = ""; 
}

function displayMessage(message, sender) {
    const messagesContainer = document.getElementById("messagesContainer");

    
    const messageHTML = document.createElement("div");
    messageHTML.classList.add("message", sender === "Sender 1" ? "sender-1" : "sender-2");
    messageHTML.innerHTML = message;

    
    messagesContainer.appendChild(messageHTML);

    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


window.onclick = function(event) {
    if (!event.target.matches(".dropbtn")) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};
