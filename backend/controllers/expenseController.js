const xlsx = require('xlsx')
const Expense = require("../models/Expense");

// Add all Expense Source
exports.addExpense = async (req, res) => {
    // Assuming userId is attached to the request object by the 'protect' middleware
    const userId = req.user.id; 

    try {
        const { icon, category, amount, date } = req.body;

        // Validation: Check for missing fields (source, amount, and date are required by the schema)
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create the new income document
        const newExpense = new Expense({
            userId, // Set the userId from the authenticated user
            icon,
            source,
            amount,
            date : new Date(date)
        });

        // Save the new income to the database
        await newExpense.save();

        // Respond with success and the created object
        res.status(200).json({ 
            message: "Expense added successfully", 
            income: Expense 
        });

    } catch (error) {
        console.error("Error adding Expense:", error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    // Assuming userId is attached to the request object by the 'protect' middleware
    const userId = req.user.id; 

    try {
        // Find all income documents associated with the authenticated user ID,
        // and sort them by date in descending order (-1 means newest first).
        const expense = await Expense.find({ userId }).sort({ date: -1 }); 
        
        res.json(expense);

    } catch (error) {
        console.error("Error retrieving Expense:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
//  Delete Expense 

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// Download Excel (Placeholder)
// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};