"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  items: { value: string; label: string }[];
  placeholder?: string;
  onSelect: (value: string) => void;
  selectedValue?: string;
}

export function Combobox({
  items,
  placeholder = "Select an item...",
  onSelect,
  selectedValue = "",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>();

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="combobox"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-sm justify-between"
        >
          {selectedValue
            ? items.find((item) => item.value === selectedValue)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: triggerWidth }}
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Search..."
            className="h-9"
            onValueChange={setSearchTerm}
          />
          <CommandList>
            {filteredItems.length > 0 ? (
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.value}
                    onSelect={() => {
                      onSelect(item.value);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedValue === item.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No items found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
