
import { Dispatch, SetStateAction } from "react";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  types: string[];
  experience: string[];
  selectedFilters: {
    categories: string[];
    types: string[];
    experience: string[];
  };
  setSelectedFilters: Dispatch<SetStateAction<{
    categories: string[];
    types: string[];
    experience: string[];
  }>>;
}

const FilterSidebar = ({
  isOpen,
  onClose,
  categories,
  types,
  experience,
  selectedFilters,
  setSelectedFilters,
}: FilterSidebarProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div 
        className="bg-white w-[300px] h-full flex flex-col animate-slide-in-right"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter Jobs
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Category</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`mobile-category-${category}`}
                      className="rounded border-gray-300 text-hospital-600 focus:ring-hospital-500"
                      checked={selectedFilters.categories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters({
                            ...selectedFilters,
                            categories: [...selectedFilters.categories, category]
                          });
                        } else {
                          setSelectedFilters({
                            ...selectedFilters,
                            categories: selectedFilters.categories.filter(c => c !== category)
                          });
                        }
                      }}
                    />
                    <label htmlFor={`mobile-category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Job Type</h4>
              <div className="space-y-2">
                {types.map(type => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`mobile-type-${type}`}
                      className="rounded border-gray-300 text-hospital-600 focus:ring-hospital-500"
                      checked={selectedFilters.types.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters({
                            ...selectedFilters,
                            types: [...selectedFilters.types, type]
                          });
                        } else {
                          setSelectedFilters({
                            ...selectedFilters,
                            types: selectedFilters.types.filter(t => t !== type)
                          });
                        }
                      }}
                    />
                    <label htmlFor={`mobile-type-${type}`} className="ml-2 text-sm text-gray-700">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Experience</h4>
              <div className="space-y-2">
                {experience.map(exp => (
                  <div key={exp} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`mobile-exp-${exp}`}
                      className="rounded border-gray-300 text-hospital-600 focus:ring-hospital-500"
                      checked={selectedFilters.experience.includes(exp)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters({
                            ...selectedFilters,
                            experience: [...selectedFilters.experience, exp]
                          });
                        } else {
                          setSelectedFilters({
                            ...selectedFilters,
                            experience: selectedFilters.experience.filter(e => e !== exp)
                          });
                        }
                      }}
                    />
                    <label htmlFor={`mobile-exp-${exp}`} className="ml-2 text-sm text-gray-700">
                      {exp}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <Button 
            className="w-full" 
            onClick={() => setSelectedFilters({
              categories: [],
              types: [],
              experience: []
            })}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
