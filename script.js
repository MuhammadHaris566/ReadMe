document.getElementById("content-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Get input values
    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;
    const imageInput = document.getElementById("image");
    const optionalQuestion = document.getElementById("optional-question").value;

    // Create a new content item only if there's some content
    const contentItem = document.createElement("div");
    contentItem.classList.add("content-item");

    // Check if title is provided
    if (title) {
        const contentTitle = document.createElement("h3");
        contentTitle.innerText = title;
        contentItem.appendChild(contentTitle);
    }

    // Check if text is provided
    if (text) {
        const contentText = document.createElement("p");
        contentText.innerText = text;
        contentItem.appendChild(contentText);
    }

    // Check if an image is uploaded
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "100%"; // Make the image responsive
            img.style.borderRadius = "5px";
            contentItem.appendChild(img);
        };
        reader.readAsDataURL(imageInput.files[0]);
    }

    // Check if an optional question is provided
    if (optionalQuestion) {
        const questionText = document.createElement("p");
        questionText.innerText = "Question: " + optionalQuestion;
        contentItem.appendChild(questionText);
    }

    // If there's no content (all fields empty), show a warning
    if (!title && !text && !imageInput.files[0] && !optionalQuestion) {
        alert("Please provide at least one piece of content.");
        return;
    }

    // Add a remove button to delete the content item
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.innerText = "Remove";
    removeButton.onclick = function () {
        contentItem.remove(); // Remove this content item when the button is clicked
    };
    contentItem.appendChild(removeButton);

    // Add the new content item to the display section
    document.getElementById("content-display").appendChild(contentItem);

    // Reset the form
    this.reset();
});
