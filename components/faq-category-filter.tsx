
"use client";

type FAQCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type FAQCategoryFilterProps = {
  categories: FAQCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
};

export function FAQCategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: FAQCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`flex items-center px-4 py-2 text-sm rounded-lg border transition-all ${
            activeCategory === category.id
              ? "bg-gradient-to-r from-[#0B3B2E] to-[#1A936F] text-white border-transparent shadow-sm"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-[#0B3B2E]/30"
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}