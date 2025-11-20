document.getElementById("myForm").addEventListener("submit", processForm);

function processForm(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    const state = document.getElementById("state").value;

    const selectedClass = document.querySelector("input[name='class']:checked");

    if (!firstName || !lastName || !password) {
        alert("Please fill out First Name, Last Name, and Password.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    if (!selectedClass) {
        alert("Please select your class year.");
        return;
    }

    if (age < 18) {
        alert("Age must be between 18 and 100.");
        return;
    }

    const formData = {
        firstName,
        lastName,
        password,
        age,
        state,
        class: selectedClass.value,
        remember: document.getElementById("remember").checked
    };

    console.log("Form Data Collected:", formData);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "formprocess.json", true);

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
