
import { useState } from "react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const iconNames = Object.keys(Icons)
    .filter(name => name !== "createLucideIcon" && name !== "default")
    .filter(name => search ? name.toLowerCase().includes(search.toLowerCase()) : true);

  const LucideIcon = (Icons as any)[value] || Icons.Hash;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <LucideIcon className="h-5 w-5 mr-2" />
            <span>{value}</span>
          </div>
          <Icons.ChevronDown className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle>Select an Icon</DialogTitle>
        <div className="py-4">
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[300px] rounded-md border">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 p-4">
              {iconNames.map((name) => {
                const IconComponent = (Icons as any)[name];
                return (
                  <Button
                    key={name}
                    variant={value === name ? "default" : "outline"}
                    className="h-10 aspect-square flex items-center justify-center p-0"
                    onClick={() => {
                      onChange(name);
                      setOpen(false);
                    }}
                  >
                    <IconComponent className="h-5 w-5" />
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IconPicker;
