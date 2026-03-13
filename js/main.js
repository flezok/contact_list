window.onload = function () {
    const name = document.querySelector(".input-name");
    const vacancy = document.querySelector(".input-vacancy");
    const phone = document.querySelector(".input-phone");

    const contactDB = {
        contacts: [],
        nextId: 1,
        createContactDB() {
            const contact = {
                id: this.nextId++,
                name: name.value.trim(),
                vacancy: vacancy.value.trim(),
                phone: phone.value.trim(),
                created: false
            };

            this.contacts.push(contact);
            return contact;
        }
        

    };

    function checkInput(input) {
        if (!input.value.trim() || /[^a-zA-Z ]/ig.test(input.value) || input.value.length > 17){
            inputError(input);
        } else{
            return true;
        }
    }

    function checkInputPhone(input) {
        if (input.value.trim() && /^\s*\+\d{5,}\s*$/ig.test(input.value) && input.value.length < 17){
            return true;
        } else {
            inputError(input);
        }
    }

    function createContact(contact) {
        return `
        <div id=${contact.id} class="contacts-item">
            <div class="contacts-item__inner">
                <p class="contacts-item__text">
                    Name: ${contact.name}
                </p>
                <p class="contacts-item__text">
                    Vacancy: ${contact.vacancy}
                </p>
                <p class="contacts-item__text">
                    Phone: ${contact.phone}
                </p>
            </div>
            <button class="contacts-item-delete">
                x
            </button>
        </div>
        `
    }

    const btnAdd = document.querySelector(".btn-add");
    const tableItem = document.getElementsByClassName("contact-table__item");
    const error = document.querySelector('.error');

    function hideError (e, value) {
        error.style.opacity = '0';
        error.style.userSelect = 'none';
        e.style.border = "1px solid transparent";
        e.style.backgroundColor = "#e4e4e4";
        e.placeholder = value;
    }

    function showError () {
        error.style.opacity = '1';
        error.style.userSelect = 'auto';
        setTimeout(hideError, 3000);
    }

    function inputError (input) {
        let value = input.placeholder;
        input.style.border = "3px solid #cf2222";
        input.style.backgroundColor = "#cc6262";
        if (input.value.length > 17) {
            input.placeholder = "Can't be longer than 17 symbols";
        } else {
            input.placeholder = 'invalid value';
        }
        input.value = '';
        
        setTimeout(() => hideError(input, value), 3000);
    }

    btnAdd.addEventListener('click', () => {
        let correctName = checkInput(name);
        let correctVacancy = checkInput(vacancy);
        let correctPhone = checkInputPhone(phone);

        if (correctName && correctVacancy && correctPhone) {
            contactDB.createContactDB();
            contactDB.contacts.forEach((e) => {
                [...tableItem].forEach((i) => {
                    if (e.name[0].toLowerCase() === i.dataset.id && e.created === false) {
                        let thisContacts = i.querySelector('.contact-table__contacts');
                        thisContacts.insertAdjacentHTML('beforeend', createContact(e));
                        let count = thisContacts.childElementCount;
                        i.querySelector('.contact-table__inner .table__item-count').textContent = count;
                        e.created = true;
                    }
                })
            });
        } else {
            showError();
        }

    });

   [...tableItem].forEach(i => {
    const tableInner = i.querySelector('.contact-table__inner');
    tableInner.addEventListener('click', () => {
        const count = i.querySelector('.table__item-count');
        if (count.textContent.trim().length > 0 && !i.classList.contains('contact-table__contacts--active')) {
            i.classList.add('contact-table__contacts--active');
        } else if (count.textContent.trim().length > 0 && i.classList.contains('contact-table__contacts--active')) {
            i.classList.remove('contact-table__contacts--active');
        }
    });

    

   })


}
