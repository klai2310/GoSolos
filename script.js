document.addEventListener('DOMContentLoaded', function() {
    const selectedValues = [];

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
            checkInputs(); // Verificar inputs após clique no botão
        });
    });

    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.querySelector('.button');

    function checkInputs() {
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isNameValid = nameValue !== '';
        const isEmailValid = emailPattern.test(emailValue);
        const isMessageValid = messageValue.length >= 20;

        if (isNameValid && isEmailValid && isMessageValid && selectedValues.length > 0) {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '#A91079'; // Cor do botão ativado
        } else {
            submitButton.disabled = true;
            submitButton.style.backgroundColor = '#ccc'; // Cor do botão desativado
        }
    }

    form.addEventListener('input', checkInputs);
    emailInput.addEventListener('input', checkInputs);
    messageInput.addEventListener('input', checkInputs);

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
        selectedValues.length = 0;
        submitButton.disabled = true;

        alert('Seu formulário foi enviado com sucesso!');
    });
});
