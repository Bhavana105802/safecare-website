document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Multi-step Form Navigation
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const formSteps = document.querySelectorAll('.form-step');

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.form-step');
            const currentStepNum = parseInt(currentStep.getAttribute('data-step'));

            if (validateStep(currentStepNum)) {
                currentStep.classList.remove('active');
                const nextStep = document.querySelector(`.form-step[data-step="${currentStepNum + 1}"]`);
                nextStep.classList.add('active');
                if (currentStepNum + 1 === 3) {
                    populateSummary();
                }
                document.querySelector('.appointment-form-container').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.form-step');
            const currentStepNum = parseInt(currentStep.getAttribute('data-step'));

            currentStep.classList.remove('active');
            const prevStep = document.querySelector(`.form-step[data-step="${currentStepNum - 1}"]`);
            prevStep.classList.add('active');
            document.querySelector('.appointment-form-container').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form Validation
    function validateStep(stepNumber) {
        const currentStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        const requiredFields = currentStep.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                const errorMessage = field.parentElement.querySelector('.error-message');
                if (!errorMessage) {
                    const message = document.createElement('p');
                    message.classList.add('error-message');
                    message.style.color = '#d32f2f';
                    message.style.fontSize = '0.85rem';
                    message.style.marginTop = '5px';
                    message.textContent = 'This field is required';
                    field.parentElement.appendChild(message);
                }
            } else {
                field.classList.remove('error');
                const errorMessage = field.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });

        return isValid;
    }

    // Populate Summary
    function populateSummary() {
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const dob = document.getElementById('dob').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const branch = document.getElementById('branch');
        const branchText = branch.options[branch.selectedIndex].text;
        const department = document.getElementById('department');
        const departmentText = department.options[department.selectedIndex].text;
        const doctor = document.getElementById('doctor');
        const doctorText = doctor.options[doctor.selectedIndex].text;
        const appointmentDate = document.getElementById('appointment-date').value;
        const appointmentTime = document.getElementById('appointment-time');
        const appointmentTimeText = appointmentTime.options[appointmentTime.selectedIndex].text;
        const reason = document.getElementById('reason').value;

        const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.getElementById('summary-name').textContent = `${firstName} ${lastName}`;
        document.getElementById('summary-dob').textContent = new Date(dob).toLocaleDateString();
        document.getElementById('summary-contact').textContent = `${phone} | ${email}`;
        document.getElementById('summary-branch').textContent = branchText;
        document.getElementById('summary-department').textContent = departmentText;
        document.getElementById('summary-doctor').textContent = doctorText;
        document.getElementById('summary-datetime').textContent = `${formattedDate} at ${appointmentTimeText}`;
        document.getElementById('summary-reason').textContent = reason;
    }

    // Set minimum date for appointment to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${yyyy}-${mm}-${dd}`;

    document.getElementById('appointment-date').setAttribute('min', formattedToday);
    const newDateSelect = document.getElementById('new-date');
    if (newDateSelect) {
        newDateSelect.setAttribute('min', formattedToday);
    }
});
