window.onload = function () {
    const btnAdd = document.querySelector(".btn-add");
    const tableItem = document.getElementsByClassName("contact-table__item");

    const contactDB = {
        contacts: [],

        createContactDB() {

            const contact = {
                name: document.querySelector(".input-name").value,
                vacancy: document.querySelector(".input-vacancy").value,
                phone: document.querySelector(".input-phone").value,
                created: false
            };

            this.contacts.push(contact);
            return contact;
        }

    };

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

    btnAdd.addEventListener('click', () => {


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
    i.addEventListener('click', () => {
        const count = i.querySelector('.table__item-count');

        const contacts = i.querySelector('.contact-table__contacts');

        if (count.textContent.trim().length > 0 && !i.classList.contains('contact-table__contacts--active')) {
            i.classList.add('contact-table__contacts--active');
        } else if (count.textContent.trim().length > 0 && i.classList.contains('contact-table__contacts--active')) {
            i.classList.remove('contact-table__contacts--active');
        }
    })
   })

}
