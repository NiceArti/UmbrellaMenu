import { AddButton } from "@/widgets/admin/add-button";
import { RemoveButton } from "@/widgets/admin/remove-button";

export function EditableTableView({
  names,
  prices,
  setNames,
  setPrices,
}: {
  names: string[];
  prices: string[];
  setNames: (v: string[]) => void;
  setPrices: (v: string[]) => void;
}) {
  return (
    <div className="w-full">
      <table className="w-full">
        <tbody>
          {names.map((_, index) => (
            <tr
              key={index}
              className="inline-flex justify-between w-full text-xl font-semibold tracking-wider"
            >
              <td className="grow max-w-[304px] py-[6px] pr-2">
                <input
                  className="w-full rounded border p-2 text-black"
                  value={names[index]}
                  onChange={(e) => {
                    const next = [...names];
                    next[index] = e.target.value;
                    setNames(next);
                  }}
                />
              </td>
              <td className="border-l-2 border-primary min-w-[80px] w-20 text-right py-[6px] pl-2">
                <input
                  className="w-full rounded border p-2 text-black text-right"
                  value={index < prices.length ? prices[index] : ""}
                  onChange={(e) => {
                    const next = [...prices];
                    next[index] = e.target.value;
                    setPrices(next);
                  }}
                />
              </td>
              <td className="py-[6px] pl-2">
                <RemoveButton
                  onClick={() => {
                    const nextNames = names.filter((_, i) => i !== index);
                    const nextPrices = prices.filter((_, i) => i !== index);
                    setNames(nextNames);
                    setPrices(nextPrices);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3">
        <AddButton
          onClick={() => {
            setNames([...(names || []), ""]);
            setPrices([...(prices || []), ""]);
          }}
        />
      </div>
    </div>
  );
}
