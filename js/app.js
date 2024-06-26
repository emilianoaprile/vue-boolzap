const { createApp } = Vue
const { DateTime } = luxon


createApp({
    data() {
        return {
            contactIndex: 0,
            newMessage: '',
            timeOutInterval: null,
            searchedContact: '',
            dropDownIsVisible: false,
            userName: 'Sofia',
            userImgPath: './img/avatar_io.png',
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2.png',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3.png',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_6.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8.png',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]

        }
    },

    mounted() {
        console.log('vue ok')
        this.contacts.forEach(contact => {
            contact.messages.forEach(message => {
                message.dropDownIsVisible = false;
            });
        });

    },

    computed: {
        filteredContacts() {
            const searchInput = this.searchedContact.toLowerCase()
            const filtered = this.contacts.filter((contact) => {
                const name = contact.name.toLowerCase()
                if (name.includes(searchInput)) {
                    contact.visible = true
                } else {
                    contact.visible = false
                }
                return contact.name.toLowerCase().includes(searchInput)
            })
            return filtered
        }
    },

    methods: {
        activeContact(contact) {
            const index = this.contacts.indexOf(contact)
            this.contactIndex = index
        },

        sendNewMessage() {
            const trimmedMessage = this.newMessage.trim()
            const date = DateTime.now()

            const messageObject = {
                date: date,
                message: trimmedMessage.charAt(0).toUpperCase() + trimmedMessage.slice(1),
                status: 'sent'
            }

            this.contacts[this.contactIndex].messages.push(messageObject)
            this.newMessage = ''
            this.receivedMessage()
        },

        receivedMessage() {
            if (this.timeOutInterval) {
                clearInterval(this.timeOutInterval)
            }

            this.timeOutInterval = setTimeout(() => {
                const message = 'Ok'
                const messageObject = {
                    date: '20/03/2020 16:30:00',
                    message,
                    status: 'received'
                }

                this.contacts[this.contactIndex].messages.push(messageObject)
            }, 1000)
        },

        showDropDown(message) {
            if (message.dropDownIsVisible) {
                message.dropDownIsVisible = false
            } else {
                this.contacts[this.contactIndex].messages.forEach((msg) => {
                    msg.dropDownIsVisible = this.dropDownIsVisible
                })
                message.dropDownIsVisible = true
            }            
        },

        deleteMessage(index) {
            this.contacts[this.contactIndex].messages.splice(index, 1)
        }

    },
}).mount('#app')