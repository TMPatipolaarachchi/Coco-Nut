const express = require('express');
const router = express.Router();
const Fertiliser = require('../model/Fertiliser');

// Corrected soil data with proper values
const soilData = {
    "Sandy": 3,
    "Clay": 2,
    "Loamy": 2.5,  // Changed from 2-3 to numerical value
    "Organic": 2
};

// Standardized fertilizer data structure
const fertilizerData = [
    // Tall Coconut
    {
        Coconuttype: "Tall",
        Age: "1-3",
        fertilizer: { N: 300, P2O5: 150, K2O: 300 }
    },
    {
        Coconuttype: "Tall",
        Age: "4-5",
        fertilizer: { N: 400, P2O5: 200, K2O: 400 }
    },
    {
        Coconuttype: "Tall",
        Age: ">5",
        fertilizer: { N: 500, P2O5: 250, K2O: 600 }
    },
    // Hybrid Coconut
    {
        Coconuttype: "Hybrid",
        Age: "1-3",
        fertilizer: { N: 300, P2O5: 250, K2O: 400 }
    },
    {
        Coconuttype: "Hybrid",
        Age: "4-5",
        fertilizer: { N: 400, P2O5: 300, K2O: 500 }
    },
    {
        Coconuttype: "Hybrid",
        Age: ">5",
        fertilizer: { N: 500, P2O5: 350, K2O: 650 }
    },
    // Dwarf Coconut
    {
        Coconuttype: "Dwarf",
        Age: "1-3",
        fertilizer: { N: 250, P2O5: 200, K2O: 350 }
    },
    {
        Coconuttype: "Dwarf",
        Age: "4-5",
        fertilizer: { N: 350, P2O5: 250, K2O: 450 }
    },
    {
        Coconuttype: "Dwarf",
        Age: ">5",
        fertilizer: { N: 450, P2O5: 300, K2O: 550 }
    }
];

router.post('/addfertiliser', async (req, res) => {
    try {
        const { Soiltype, Coconuttype, Age } = req.body;

        // Validate input
        if (!Soiltype || !Coconuttype || !Age) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        // Get soil frequency with proper default
        const numberOfApplications = soilData[Soiltype] || 2;

        // Find fertilizer recommendation
        const fertilizerEntry = fertilizerData.find(entry => 
            entry.Coconuttype === Coconuttype &&
            entry.Age === Age
        );

        if (!fertilizerEntry) {
            return res.status(404).json({ msg: "Fertilizer data not found for given parameters" });
        }

        // Create new fertilizer record
        const newFertiliser = new Fertiliser({
            Soiltype,
            Coconuttype,
            Age,
            numberOfApplications,
            fertilizer: fertilizerEntry.fertilizer
        });

        await newFertiliser.save();

        res.json({
            msg: "Data saved successfully",
            numberOfApplications,
            fertilizer: fertilizerEntry.fertilizer,
            fertiliserRecord: newFertiliser
        });
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ msg: "Server error", error: e.message });
    }
});



module.exports = router;