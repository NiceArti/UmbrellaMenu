import { useState } from "react";

export function useCreateSection() {
  const [adding, setAdding] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newHidden, setNewHidden] = useState(false);
  const [newTableView, setNewTableView] = useState(false);
  const [newNames, setNewNames] = useState<string[]>([]);
  const [newPrices, setNewPrices] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  return {
    adding,
    setAdding,
    newTag,
    setNewTag,
    newTitle,
    setNewTitle,
    newHidden,
    setNewHidden,
    newTableView,
    setNewTableView,
    newNames,
    setNewNames,
    newPrices,
    setNewPrices,
    creating,
    setCreating,
  };
}
