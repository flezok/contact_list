window.onload = function () {
    const name = document.querySelector(".input-name");
    const vacancy = document.querySelector(".input-vacancy");
    const phone = document.querySelector(".input-phone");

    const contactDB = {
        contacts: [],

        createContactDB() {

            const contact = {
                name: name.value,
                vacancy: vacancy.value,
                phone: phone.value,
                created: false
            };

            this.contacts.push(contact);
            return contact;
        }

    };

    function checkInput(value) {

        if (/[^a-zA-Z]/ig.test(value)){
            console.log('ошибка, есть цифры или строка не из англ')
        } else{
            console.log(value.trim())
        }
        
    }

    function createContact(contact) {
        return `
        <div class="contacts-item">
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

    btnAdd.addEventListener('click', () => {

        checkInput(name.value);
        checkInput(vacancy.value);
        checkInput(phone.value);

        contactDB.createContactDB()

        contactDB.contacts.forEach((e) => {
            [...tableItem].forEach((i) => {
                if (e.name[0] === i.dataset.id && e.created === false) {
                    let thisContacts = i.querySelector('.contact-table__contacts');

                    thisContacts.insertAdjacentHTML('beforeend', createContact(e));

                    let count = thisContacts.childElementCount;


                    i.querySelector('.contact-table__inner .table__item-count').textContent = count;

                    e.created = true;
                }
            })
        });

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
    })
   })


}
