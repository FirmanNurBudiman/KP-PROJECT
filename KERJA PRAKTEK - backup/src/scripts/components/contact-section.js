document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const tenantInput = document.getElementById('tenant');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitbutton');
    const nameError = document.getElementById('nameError');
    const tenantError = document.getElementById('tenantError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
  
    function validateName(name) {
        return /^[a-zA-Z\s]{2,}$/.test(name);
    }
  
    function validateTenant(tenant) {
        return tenant.trim().length >= 2;
    }
  
    function validatePhone(phone) {
        return /^\+?[0-9]{10,15}$/.test(phone);
    }
  
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
  
    function validateForm() {
        let isValid = true;
  
        if (!validateName(nameInput.value)) {
            nameError.textContent = "Please enter a valid name (at least 2 characters, letters only)";
            nameInput.style.borderColor = 'red';
            isValid = false;
        } else {
            nameError.textContent = "";
            nameInput.style.borderColor = 'initial';
        }
  
        if (!validateTenant(tenantInput.value)) {
            tenantError.textContent = "Please enter a valid tenant name (at least 2 characters)";
            tenantInput.style.borderColor = 'red';
            isValid = false;
        } else {
            tenantError.textContent = "";
            tenantInput.style.borderColor = 'initial';
        }
  
        if (!validatePhone(phoneInput.value)) {
            phoneError.textContent = "Please enter a valid phone number";
            phoneInput.style.borderColor = 'red';
            isValid = false;
        } else {
            phoneError.textContent = "";
            phoneInput.style.borderColor = 'initial';
        }
  
        if (!validateMessage(messageInput.value)) {
            messageError.textContent = "Please enter a message (at least 10 characters)";
            messageInput.style.borderColor = 'red';
            isValid = false;
        } else {
            messageError.textContent = "";
            messageInput.style.borderColor = 'initial';
        }
  
        submitButton.disabled = !isValid;
    }
  
    if (nameInput && tenantInput && phoneInput && messageInput) {
        nameInput.addEventListener('input', validateForm);
        tenantInput.addEventListener('input', validateForm);
        phoneInput.addEventListener('input', validateForm);
        messageInput.addEventListener('input', validateForm);
    }
  
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            if (!submitButton.disabled) {
                sendToWhatsapp();
            }
        });
    }
  
    function sendToWhatsapp() {
        const number = '+6283861616016';
        const name = nameInput.value;
        const tenant = tenantInput.value;
        const phone = phoneInput.value;
        const message = messageInput.value;
        const url = `https://wa.me/${number}?text=`
              + `Name : ${encodeURIComponent(name)}%0a`
              + `Tenant : ${encodeURIComponent(tenant)}%0a`
              + `Phone : ${encodeURIComponent(phone)}%0a`
              + `Message : ${encodeURIComponent(message)}%0a%0a`;
        window.open(url, '_blank').focus();
    }
  
    window.sendToWhatsapp = sendToWhatsapp;
  });
  