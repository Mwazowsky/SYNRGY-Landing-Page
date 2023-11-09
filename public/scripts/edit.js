const formEdit = document.getElementById('form-edit');

const editInputName = document.getElementById('edit-input-nama');
const editInputRate = document.getElementById('edit-input-rate');
const editInputSize = document.getElementById('edit-input-ukuran');
const editInputFile = document.getElementById('edit-input-file');

const btnEdit = document.getElementById('button-edit');

formEdit.addEventListener('submit', handleSubmitFormEdit);

editInputFile.addEventListener('change', handleChangeInputFile);

// Fungsi setelah submit / post
function renderMessage(response_data_) {
    const { message, success, url } = response_data_;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    if (success) {
        messageDiv.innerHTML = `
      <div class="banner success">
        <p class="message">${message}</p>
      </div>
    `;
        // Clear form fields on success
        inputName.value = '';
        inputRate.value = '';
        inputSize.value = '';
        inputFile.value = '';
        // Clear the preview image
        preview.innerHTML = '';
    } else {
        messageDiv.innerHTML = `
      <div class="banner failure">
        <p class="message">Failed: ${message}</p>
      </div>
    `;
    }

    messageContainer.innerHTML = ''; // Clear previous messages
    messageContainer.appendChild(messageDiv); // Append the new message
}


function handleChangeInputFile(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
        // Check if the preview elements exist before appending a child
        const newPreview = document.getElementById("new-preview");
        if (newPreview) {
            // Render preview
            const reader = new FileReader();
            reader.onload = function () {
                const imgSrc = reader.result;
                const previewImg = document.createElement("img");
                previewImg.src = imgSrc;
                newPreview.innerHTML = ''; // Clear existing content
                newPreview.appendChild(previewImg);
            };
            reader.readAsDataURL(files[0]);
        }
    }
}


async function handleSubmitFormEdit(e) {
    e.preventDefault();
    // Change the button text to "Loading" while the function is running
    btnEdit.innerText = "Loading...";

    let data; // Declare data outside of the try-catch blocks

    console.log(carId);

    try {
        const formData = new FormData(formEdit);

        formData.append("car_name", editInputName.value);
        formData.append("rate", editInputRate.value);
        formData.append("capacity", editInputSize.value);

        const response = await fetch(`/admin/edit/${carId}`, {
            method: 'PUT', // Use the appropriate HTTP method (e.g., PUT)
            body: formData,
        });

        data = await response.json(); // Assign data inside the try block

        console.log("data > ", data);

        renderMessage(data);

    } catch (error) {
        if (data) {
            // If data is available, you can still render it
            renderMessage(data);
        } else {
            // Handle the error without data
            renderMessage({ message: "Edit Failed!" });
        }
    } finally {
        // Restore the button text to "Submit" after fetching data
        btnEdit.innerText = "Submit";
    }
}