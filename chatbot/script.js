document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const optionsContainer = document.getElementById('optionsContainer');

    // Initial welcome message
    addMessage('Welcome to Vardhaman College Chatbot! How can I help you today?', false);

    // Predefined responses with URL placeholders
    const responses = {
        "admissions": "Admissions at Vardhaman College are open for various undergraduate and postgraduate programs. The admission process typically includes: 1. Online application 2. Entrance examination 3. Document verification 4. Fee payment. For specific program requirements, please visit our admissions page: [https://vardhaman.org/admission-procedure/] or contact the admissions office at admissions@vardhamancollege.edu",
        "courses": "Vardhaman College offers a wide range of courses including: 1. Engineering (B.Tech) 2. Medicine (MBBS) 3. Management (MBA) 4. Computer Science 5. Electronics 6. Mechanical Engineering 7. Civil Engineering. Each program has its own duration and specialization options. For detailed course information, visit: [https://vardhaman.org/academics/]",
        "campus": "Our campus features: 1. Modern classrooms 2. Well-equipped laboratories 3. Sports facilities 4. Library 5. Cafeteria 6. Student clubs 7. Cultural events 8. Hostel facilities. We have a vibrant student community with various extracurricular activities. Take a virtual tour: [https://vardhaman.org/infrastructure-built-up-area/]",
        "facilities": "College facilities include: 1. Digital library 2. Computer labs 3. Research centers 4. Sports complex 5. Medical center 6. Hostel accommodation 7. Transportation 8. Wi-Fi campus 9. Cafeteria 10. Auditorium. All facilities are maintained to high standards. View our facilities: [FACILITIES_URL]",
        "scholarships": "We offer various scholarships: 1. Merit-based 2. Need-based 3. Sports scholarships 4. Cultural scholarships 5. Research fellowships. Eligibility criteria and application process vary for each scholarship. Check scholarship details: [https://vardhaman.org/scholarship/]",
        "placements": "Our placement cell provides: 1. Career counseling 2. Resume building 3. Interview preparation 4. Company visits 5. Internship opportunities 6. Job fairs. Top companies regularly recruit from our campus with competitive packages. View placement statistics: [https://vardhaman.org/placement-trainings/]",
        "international": "For international students, we offer: 1. Special admission process 2. Visa assistance 3. International student support 4. Cultural integration programs 5. Language support 6. Accommodation assistance. International student guide: [INTERNATIONAL_URL]",
        "research": "Research opportunities include: 1. Ph.D. programs 2. Research projects 3. Industry collaborations 4. Funding opportunities 5. Publication support 6. Conference participation 7. Research labs 8. Faculty mentorship. Research portal: [https://vardhaman.org/centres-of-excellence/]",
        "fees": "Our fee structure varies by program: 1. Engineering: ₹1,50,000 per year 2. Medicine: ₹5,00,000 per year 3. Management: ₹2,00,000 per year 4. Computer Science: ₹1,20,000 per year. Additional fees may apply for hostel, transportation, and other facilities. Fee calculator: [https://vardhaman.org/fee-structure/]",
        "library": "Our library features: 1. 50,000+ books 2. Digital resources 3. E-journals 4. Study spaces 5. Computer access 6. Research assistance 7. 24/7 access during exams 8. Online catalog 9. Inter-library loan 10. Printing facilities. Library catalog: https://vardhaman.org/central-library/]",
        "hostel": "Hostel facilities include: 1. Separate boys and girls hostels 2. AC and non-AC rooms 3. Wi-Fi access 4. Common rooms 5. Laundry service 6. 24/7 security 7. Mess facilities 8. Medical assistance 9. Sports facilities 10. Study rooms. Hostel information: [https://vardhaman.org/hostel-dining/]",
        "transport": "Transportation services: 1. College buses 2. Multiple routes 3. Pick-up points 4. Safe travel 5. Regular schedules 6. Emergency contact 7. GPS tracking 8. Comfortable seating 9. Affordable fees 10. Student discounts. Transport routes: [https://vardhaman.org/transport/]",
        "events": "Regular events include: 1. Annual fest 2. Tech symposium 3. Cultural week 4. Sports meet 5. Alumni meet 6. Industry talks 7. Workshops 8. Competitions 9. Guest lectures 10. Community service. Events calendar: [https://vardhaman.org/campus-life-events/]",
        "alumni": "Our alumni network: 1. 10,000+ members 2. Industry leaders 3. Mentorship program 4. Job referrals 5. Networking events 6. Success stories 7. Alumni portal 8. Career guidance 9. Fundraising 10. Campus visits. Alumni portal: [https://alumni.vardhaman.org/]",
        "contact": "Contact information: 1. Main office: +91-8688901557 2. Email: info@vardhamancollege.edu 3. Address: Vardhaman College, Shamshabad , Telangana, PIN 501218. 4. Website: [https://vardhaman.org/about-vardhaman/] 5. Social media: @vardhamancollege 6. Emergency: +91-8688901557. Contact form: [https://vardhaman.org/contact/]"
    };

    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.className = isUser ? 'user-message' : 'bot-message';
        
        // Convert URLs to clickable links - handles both formats
        const messageWithLinks = message.replace(
            /\[(https?:\/\/[^\]]+)\]|\[([A-Z_]+)\]/g,
            (match, url, placeholder) => {
                if (url) {
                    // Handle actual URLs in square brackets
                    return `<a href="${url}" target="_blank" class="message-link">${url}</a>`;
                } else if (placeholder) {
                    // Handle placeholder URLs
                    const placeholderUrl = responses[placeholder];
                    return placeholderUrl ? `<a href="${placeholderUrl}" target="_blank" class="message-link">${placeholderUrl}</a>` : match;
                }
                return match;
            }
        );
        
        messageElement.innerHTML = messageWithLinks;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    // Function to handle errors
    function handleError(error) {
        console.error('Error:', error);
        addMessage('Sorry, there was an error processing your request.', false);
    }

    // Function to send message
    function sendMessage(option) {
        try {
            // Simulate a small delay
            setTimeout(() => {
                const response = responses[option];
                if (response) {
                    addMessage(response);
                } else {
                    handleError(new Error('Invalid option'));
                }
            }, 500);
        } catch (error) {
            handleError(error);
        }
    }

    // Function to disable all option buttons
    function disableOptions() {
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    // Function to enable all option buttons
    function enableOptions() {
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(button => {
            button.disabled = false;
        });
    }

    // Add click event listeners to all option buttons
    const optionButtons = optionsContainer.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const option = button.dataset.option;
            const buttonText = button.textContent;

            // Add user message to chat
            addMessage(`You asked about: ${buttonText}`, true);

            // Disable all buttons while processing
            disableOptions();
            button.textContent = 'Processing...';

            // Send message and handle response
            sendMessage(option);

            // Re-enable all buttons after a short delay
            setTimeout(() => {
                enableOptions();
                button.textContent = buttonText;
            }, 1000);
        });
    });
});