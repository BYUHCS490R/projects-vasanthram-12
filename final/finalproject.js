document.getElementById("myForm").addEventListener("submit", processForm);

function processForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const model = document.getElementById("model").value;
    const abilities = document.querySelectorAll("input[name='ability']:checked");
    const emotions = document.querySelector("input[name='emotions']:checked");
    const role = document.getElementById("role_description").value;

    if (!name || !email || !model) {
        alert("Please fill out Name, Email, and select an Android Model.");
        return;
    }

    if (!emotions) {
        alert("Please select if androids should have emotions.");
        return;
    }

    let selectedAbilities = [];
    abilities.forEach(a => selectedAbilities.push(a.value));

    const formData = {
        name,
        email,
        model,
        abilities: selectedAbilities,
        emotions: emotions.value,
        role
    };

    console.log("Form Data Collected:", formData);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "finalproject.json", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            document.getElementById("message").innerText = response.message;

            document.getElementById("myForm").innerHTML = "";
        } 
        else if (xhr.readyState === 4) {
            alert("Error: Could not connect to server.");
        }
    };

    xhr.send();
}

