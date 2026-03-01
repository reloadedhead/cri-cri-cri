import { useState } from "react";

export function useModalState() {
  const [open, onOpenChange] = useState(false);

  return {
    open,
    onOpenChange,
    onOpen: () => onOpenChange(true),
    onClose: () => onOpenChange(false),
  };
}
