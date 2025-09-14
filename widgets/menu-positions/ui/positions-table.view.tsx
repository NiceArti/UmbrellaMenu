export const PositionsTableView = ({
  names,
  prices,
}: {
  names: string[];
  prices: string[];
}) => {
  return (
    <table className="w-full">
      <tbody>
        {names.map((name, index) => (
          <tr
            key={index}
            className="inline-flex justify-between w-full text-xl font-semibold tracking-wider"
          >
            <td className="grow max-w-[304px] py-[6px]">{name}</td>
            <td className="border-l-2 border-primary min-w-[80px] w-20 justify-center items-end text-right py-[6px]">
              {index < prices.length ? prices[index] : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
