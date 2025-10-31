import React, { useState } from "react";
import Input from '../input/Input';
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";
import { HiDeviceMobile } from "react-icons/hi";
import { LuCircleDivide } from "react-icons/lu";

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="className">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.category}
        onChange={(e) => handleChange("category", e.target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc"
        type="text"
      />

<Input
  value={income.amount}
  onChange={(e) => handleChange("amount", e.target.value)}
  label="Amount"
  placeholder=""
  type="number"
/>

<Input
  value={income.date}
  onChange={(e) => handleChange("date", e.target.value)}
  label="Date"
  placeholder=""
  type="date"
/>

<div className="flex justify-end mt-6 ">
  <button
    type="button"
    className="add-btn add-btn-fill"
    onClick={() => onAddExpense(income)}
  >
    Add Expense
  </button>
</div>

</div>
  );
};

export default AddExpenseForm;