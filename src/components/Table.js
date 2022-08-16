import { Fragment } from 'react';

const Table = ({ summaryTableHeaderItems, salesSummary }) => {
    return (
        <div className="bg-white rounded max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto text-center my-10 shadow-md p-4 overflow-auto">
            <table className="w-full">
                <thead className="mb-4">
                    <tr>
                        {summaryTableHeaderItems.length > 0 &&
                            summaryTableHeaderItems.map((item, idx) => (
                                <th key={idx} className="text-xl">
                                    {item.toUpperCase()}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {salesSummary.length > 0 &&
                        salesSummary.map((sales, sales_idx) => (
                            <Fragment key={sales_idx}>
                                {sales.length > 0 &&
                                    sales.map((sale, idx) => (
                                        <tr key={idx} className="border-b my-3">
                                            {summaryTableHeaderItems.map(
                                                (header, idx) => (
                                                    <td
                                                        key={idx}
                                                        className="text-lg"
                                                    >
                                                        {sale[header]}
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                            </Fragment>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
