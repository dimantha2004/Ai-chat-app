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

    if (Sender12 === "Sender 1") {
        generateAIResponse(message);
    }
}

function displayMessage(message, sender) {
    const messagesContainer = document.getElementById("messagesContainer");

    const newMessage = `
        <div class="message ${sender === "Sender 1" ? "sender-1" : "sender-2"}">
            ${message}
        </div>
    `;

    messagesContainer.innerHTML += newMessage;

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function generateAIResponse(userMessage) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "contents": [
            {
            "parts": [
               {
                "text": userMessage
              }
             ]
         }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBRTOzgv3_jsKK6JAyYpmc-cnWACbua3kQ", requestOptions)
        .then(response => response.json())
        .then(result => {
            const aiMessage = result.candidates[0].content.parts[0].text;
            displayMessage(aiMessage, "Sender 2");
        })       
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
