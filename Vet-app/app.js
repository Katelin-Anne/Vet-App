const { createApp } = Vue;

createApp({
    data() {
        return {
            // Appointment Data
            appointment: {
                ownerName: "",
                petName: "",
                date: ""
            },
            appointmentMessage: "",

            // Product Data
            products: [
                { id: 1, name: "Dog Food", price: 1259.99, quantity: 0, image: "assets/dog-food.jpg" },
                { id: 2, name: "Cat Food", price: 1224.99, quantity: 0, image: "assets/cat-food.jpg" },
                { id: 3, name: "Bird Cage", price: 1500.00, quantity: 0, image: "assets/bird-cage.jpg" },
                { id: 4, name: "Fish Tank", price: 1200.00, quantity: 0, image: "assets/fish-tank.jpg" }
            ]
        };
    },
    computed: {
        totalAmount() {
            return this.products.reduce((total, product) => {
                return total + product.price * product.quantity;
            }, 0).toFixed(2);
        }
    },
    methods: {
        bookAppointment() {
            const { ownerName, petName, date } = this.appointment;
            if (ownerName && petName && date) {
                this.appointmentMessage = `Appointment booked successfully for ${petName} on ${date}!`;
                // Clear form
                this.appointment.ownerName = "";
                this.appointment.petName = "";
                this.appointment.date = "";
            }
        },
        checkout() {
            const items = this.products
                .filter(product => product.quantity > 0)
                .map(product => `${product.quantity}x ${product.name}`);
            
            if (items.length === 0) {
                alert("No items in the cart!");
                return;
            }

            const emailBody = `
                Thank you for your purchase!
                \n\nOrder Summary:
                \n${items.join("\n")}
                \n\nTotal Amount: R${this.totalAmount}
                \n\nWe appreciate your business!
            `;

            alert(emailBody); // Simulated email receipt

            // Reset quantities
            this.products.forEach(product => product.quantity = 0);
        }
    }
}).mount("#app");
