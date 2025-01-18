const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners-model');

// Root route
router.get("/", (req, res) => {
    res.send("hey");
});

// Create owner route (development environment only)
if (process.env.NODE_ENV === 'development') {
    router.post("/create", async (req, res) => {
        try {
            // Check if any owner exists
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(503).send("You don't have permission!");
            }

            // Create a new owner
            const { fullname, email, password } = req.body;
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password
            });
            res.status(201).send(createdOwner);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error creating owner");
        }
    });
}

// Admin page rendering route
router.get("/admin", (req, res) => {
    try {
        let success = req.flash("success"); // Ensure flash middleware is configured
        res.render("createproducts", { success });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error rendering admin page");
    }
});

module.exports = router;
