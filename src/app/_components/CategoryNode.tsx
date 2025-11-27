"use client";

import React, { useState } from "react";
import { CategoryIncomingDTO } from "@/types/category";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface Props {
  node: CategoryIncomingDTO;
  values: { category: string[] };
  setFieldValue: (field: string, value: any) => void;
}

const CategoryNodeMulti: React.FC<Props> = ({ node, values, setFieldValue }) => {
  const [expanded, setExpanded] = useState(false);

  const isChecked = values.category.includes(node._id);

  const toggleCategory = () => {
    if (isChecked) {
      setFieldValue(
        "category",
        values.category.filter((id) => id !== node._id)
      );
    } else {
      setFieldValue("category", [...values.category, node._id]);
    }
  };

  return (
    <div className="pl-0">
      <div className="flex items-center gap-2 py-1">
        {node.children?.length ? (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center justify-center w-5 h-5 text-gray-600"
          >
            {expanded ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
          </button>
        ) : (
          <span className="inline-block w-5 h-5" />
        )}

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isChecked} onChange={toggleCategory} />
          <span>{node.name}</span>
        </label>
      </div>

      {expanded &&
        node.children?.length &&
        node.children.map((child) => (
          <CategoryNodeMulti
            key={child._id}
            node={child}
            values={values}
            setFieldValue={setFieldValue}
          />
        ))}
    </div>
  );
};

export default CategoryNodeMulti;
