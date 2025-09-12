export function PositionsColumns({
  editable,
  names,
  prices,
  onChangeName,
  onChangePrice,
  onRemove,
}: {
  editable: boolean;
  names: string[];
  prices: string[];
  onChangeName?: (index: number, value: string) => void;
  onChangePrice?: (index: number, value: string) => void;
  onRemove?: (index: number) => void;
}) {
  return (
    <div className="inline-flex justify-between w-full gap-3">
      <div className="grow max-w-[304px] flex flex-col gap-2 text-xl font-semibold tracking-wider">
        {names.map((value, i) => (
          <div key={i} className="flex items-center gap-2">
            {editable && onRemove && (
              <button
                type="button"
                className="px-2 py-1 border text-sm"
                onClick={() => onRemove(i)}
                aria-label="Удалить строку"
                title="Удалить строку"
              >
                ✖
              </button>
            )}
            {editable ? (
              <input
                className="rounded border p-2 text-black flex-1"
                value={value}
                onChange={(e) => onChangeName?.(i, e.target.value)}
              />
            ) : (
              <span className="flex-1">{value}</span>
            )}
          </div>
        ))}
      </div>
      <div className="border-l-2 border-primary max-w-20 w-20 justify-center items-end flex flex-col gap-2 text-xl font-semibold tracking-wider">
        {prices.map((value, i) =>
          editable ? (
            <input
              key={i}
              className="w-full text-right rounded border p-2 text-black"
              value={value}
              onChange={(e) => onChangePrice?.(i, e.target.value)}
            />
          ) : (
            <span key={i}>{value}</span>
          )
        )}
      </div>
    </div>
  );
}
