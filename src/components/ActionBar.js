import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ActionBar = ({ salesSummary, summaryTableHeaderItems }) => {
    const exportToCSV = () => {
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

        let salesDataArrays = [];

        if (salesSummary) {
            salesSummary.forEach(sales => {
                salesDataArrays = [...salesDataArrays, ...sales];
            });
        }

        const headerArray = summaryTableHeaderItems.map(item =>
            item.toUpperCase()
        );

        const ws = XLSX.utils.json_to_sheet(salesDataArrays);
        XLSX.utils.sheet_add_aoa(ws, [headerArray], {
            origin: 'A1'
        });
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, 'sales-summary.xlsx');
    };

    return (
        <div className="bg-white rounded max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto text-center my-10 shadow-md p-4 overflow-auto">
            <button
                className="bg-sky-400 text-white py-2 px-5 rounded font-semibold"
                onClick={exportToCSV}
            >
                Export
            </button>
        </div>
    );
};

export default ActionBar;
