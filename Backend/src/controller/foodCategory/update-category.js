import { FoodCategoryModel } from "../../modules/foodCategoryModel.js";

// Helper function to format date to AM/PM
const formatDate = (date) => {
  const options = { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: true 
  };
  return new Date(date).toLocaleString('en-US', options);  // Format to AM/PM format
};

export const updateCategory = async (req, res) => {
  const { categoryId, newCategoryName } = req.body;
  
  try {
    const updatedCategory = await FoodCategoryModel.findByIdAndUpdate(
      categoryId,
      {
        categoryName: newCategoryName,
        updatedAt: new Date(),  // Set the updatedAt field to the current date and time
      },
      { new: true }  // Ensure the updated category is returned
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Format the updatedAt field to AM/PM format
    const formattedDate = formatDate(updatedCategory.updatedAt);

    res.json({
      message: "Category updated successfully",
      category: {
        ...updatedCategory.toObject(),
        updatedAt: formattedDate,  // Add formatted updatedAt field
      },
    });
  } catch (err) {
    console.log("Update category error", err);
    res.status(500).json({ message: "Error occurred during update" });
  }
};
