import IconBtn from "../../common/IconBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createCategory } from "../../../services/operations/courseDetailsAPI";
import { toast } from "react-hot-toast";

export default function CreateCategory() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  const handleOnChangeCategoryName = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleOnChangeCategoryDescription = (e) => {
    setNewCategoryDescription(e.target.value);
  };

  const handleOnSubmitCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName || !newCategoryDescription) {
      toast.error("Category name and description cannot be empty");
      return;
    }

    const data = { name: newCategoryName, description: newCategoryDescription };
    const result = await createCategory(data, token); 
    if (result.success) {
      setNewCategoryName("");
      setNewCategoryDescription("");
    }
  };

  return (
    <div className="text-white">
      {/* Category creation form */}
      <form
        className="flex flex-col space-y-2"
        onSubmit={handleOnSubmitCategory}
      >
        <label htmlFor="name">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Create Category
          </p>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={newCategoryName}
            onChange={handleOnChangeCategoryName}
            placeholder="Category Name"
            className="form-style w-full"
          />
        </label>
        <label htmlFor="description">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Description
          </p>
          <input
            required
            type="text"
            id="description"
            name="description"
            value={newCategoryDescription}
            onChange={handleOnChangeCategoryDescription}
            placeholder="Category Description"
            className="form-style w-full"
          />
        </label>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create
        </button>
      </form>  
    </div>
  );
}
