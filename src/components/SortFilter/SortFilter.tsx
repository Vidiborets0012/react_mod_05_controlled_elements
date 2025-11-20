import type { SortOrder } from "../../types/task";

interface SortOrderProps {
  sortOrder: SortOrder;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SortFilter({ sortOrder, onChange }: SortOrderProps) {
  return (
    <select value={sortOrder} onChange={onChange}>
      <option value="asc">Completed last</option>
      <option value="desc">Completed first</option>
    </select>
  );
}
