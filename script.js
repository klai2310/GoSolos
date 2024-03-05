const selectedValues = [];
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.select-button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                selectedValues.push(value);
            } else {
                const index = selectedValues.indexOf(value);
                if (index > -1) {
                    selectedValues.splice(index, 1);
                }
            }
        });
    });

    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        if (selectedValues.length === 0) {
            event.preventDefault();
            alert('Selecione pelo menos uma opção.');
        }
    });
});



  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.querySelector('.button');

    function checkInputs() {
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        if (nameValue !== '' && emailValue !== '' && messageValue !== '') {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    function checkEmail() {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test(emailValue)) {
            emailInput.classList.remove('invalid');
        } else {
            emailInput.classList.add('invalid');
        }
    }

    function checkMessage() {
        const messageValue = messageInput.value.trim();

        if (messageValue.length >= 20) {
            messageInput.classList.remove('invalid');
        } else {
            messageInput.classList.add('invalid');
        }
    }

    form.addEventListener('input', checkInputs);
    emailInput.addEventListener('input', checkEmail);
    messageInput.addEventListener('input', checkMessage);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            interests: selectedValues
        };

        localStorage.setItem('formData', JSON.stringify(formData));

        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        selectedValues = []
        submitButton.disabled = true;

        alert('Seu formulário foi enviado com sucesso!');
    });
});
