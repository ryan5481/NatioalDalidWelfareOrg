const mongoose = require ("mongoose");

const navbarSchema = ({

    label: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        immutable: true,
    },
    children: [
        {
            label: {
                type: String,
                required: true,
            },
            href: {
                type: String,
                immutable: true,
            },
        },
    ],

    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now },

})

const Navbar = mongoose.model("Navbar", navbarSchema);

module.exports = Navbar


/**
 * 
 * {
    "label" : "Services",
    "href" : "services",
    "children": [
                    {
                    "label" : "Assessment Test",
                    "href" : "assessmenty-test"
                    },
                    {
                    "label" : "Admission Counselling",
                    "href" : "admission-counselling"
                    },
                    {
                    "label" : "Scholarship Guidance",
                    "href" : "scholarship-guidance"
                    },
                    {
                    "label" : "Visa Guidance",
                    "href" : "visa-guidance"
                    },
                    {
                    "label" : "Visa Service",
                    "href" : "visa-service"
                    }
                ]
}
 * 
 */