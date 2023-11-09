const formUpload = document.getElementById('form-upload');

const inputName = document.getElementById('input-nama');
const inputRate = document.getElementById('input-rate');
const inputSize = document.getElementById('input-ukuran');
const inputFile = document.getElementById('input-file');

const btnSubmit = document.getElementById('button-submit');

const messageContainer = document.getElementById('message-container');
const preview = document.getElementById('imgpreview');

formUpload.addEventListener('submit', handleSubmitFormUpload);
inputFile.addEventListener('change', handleChangeInputFile);

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
    // Render preview
    const reader = new FileReader();
    reader.onload = function () {
      const imgSrc = reader.result;
      const previewImg = document.createElement("img");
      previewImg.src = imgSrc;
      document.getElementById("new-preview").appendChild(previewImg);
    };
    reader.readAsDataURL(files[0]);
  }
}

async function handleSubmitFormUpload(e) {
  e.preventDefault();
  // Merubah tulisan button submit menjadi loading saat fungsi dijalankan
  btnSubmit.innerText = "Loading...";

  let data; // Declare data outside of the try-catch blocks

  try {
    const formData = new FormData(formUpload);

    formData.append("name", inputName.value);
    formData.append("rate", inputRate.value);
    formData.append("size", inputSize.value);

    const response = await fetch('/admin/upload', {
      method: 'POST',
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
      renderMessage({ message: "Upload Failed!" });
    }
  } finally {
    // Mengembalikan text button submit setelah fetching data
    btnSubmit.innerText = "Submit";
  }
}