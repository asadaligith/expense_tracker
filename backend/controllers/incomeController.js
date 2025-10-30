const xlsx = require('xlsx');
const Income = require('../models/Income.js');

exports.addIncome = async (req, res) => {
    const userId = req.user.id; 

    try {
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields (source, amount, and date are required by the schema)
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create the new income document
        const newIncome = new Income({
            userId, // Set the userId from the authenticated user
            icon,
            source,
            amount,
            date : new Date(date)
        });

        // Save the new income to the database
        await newIncome.save();

        // Respond with success and the created object
        res.status(200).json({ 
            message: "Income added successfully", 
            income: newIncome 
        });

    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }

};

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id; 

    try {
        // Find all income documents associated with the authenticated user ID,
        // and sort them by date in descending order (-1 means newest first).
        const income = await Income.find({ userId }).sort({ date: -1 }); 
        
        res.json(income);

    } catch (error) {
        console.error("Error retrieving income:", error);
        res.status(500).json({ message: "Server Error" });
    }

};

exports.deleteIncome = async (req, res) => {
     try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};



exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

};
