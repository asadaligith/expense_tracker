const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new  Types.ObjectId(String(userId));

        // 1. Fetch total income & expenses (All Time)
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        console.log("totalIncome", totalIncome, "userId is valid:", isValidObjectId(userId));
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // 2. Calculate time-based metrics
        
        // Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total expenses for last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 income transactions
const last5Income = await Income.find({ userId })
  .sort({ date: -1 })
  .limit(5);

const mappedIncome = last5Income.map(txn => ({
  ...txn.toObject(),
  type: "income",
}));

// Fetch last 5 expense transactions
const last5Expense = await Expense.find({ userId })
  .sort({ date: -1 })
  .limit(5);

const mappedExpense = last5Expense.map(txn => ({
  ...txn.toObject(),
  type: "expense",
}));

// Combine and sort transactions
const lastTransactions = [...mappedIncome, ...mappedExpense]
  .sort((a, b) => b.date - a.date)
  .slice(0, 10);
        // 4. Final Response
        const finalTotalIncome = totalIncome[0]?.total || 0;
        const finalTotalExpenses = totalExpense[0]?.total || 0;
        
        res.json({
            // All-Time Totals
            totalBalance: finalTotalIncome - finalTotalExpenses,
            totalIncome: finalTotalIncome,
            totalExpenses: finalTotalExpenses,
            
            // Time-based Metrics
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            
            // Combined Transaction List
            recentTransactions: lastTransactions,
        });

    } catch (error) {
        // 5. Error Handling
        console.error("Dashboard data fetching error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};