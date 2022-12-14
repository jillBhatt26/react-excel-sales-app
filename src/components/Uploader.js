import { read, utils } from 'xlsx/xlsx.mjs';

const Uploader = ({ setSalesSummary }) => {
    // event handlers
    const handleSheetUpload = event => {
        event.preventDefault();

        const file = event.target.files[0];

        const validTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv'
        ];

        if (!validTypes.includes(file.type)) {
            return alert('Please upload only spreadsheet files!');
        }

        const fileReader = new FileReader();

        if (file) {
            fileReader.addEventListener('load', event => {
                const csvDump = event.target.result;

                const workbook = read(csvDump, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json(worksheet);

                const givenYearData = json.filter(
                    element => parseInt(element.YEAR_ID) === 2004
                );

                const productLines = [
                    ...new Set(givenYearData.map(data => data.PRODUCTLINE))
                ];

                const territories = [
                    ...new Set(givenYearData.map(data => data.TERRITORY))
                ];

                const productLinesData = productLines
                    .map(productline => {
                        const territoryWiseData = territories.map(territory => {
                            const yearData = givenYearData.filter(
                                data =>
                                    data.PRODUCTLINE === productline &&
                                    data.TERRITORY === territory
                            );

                            const totalShipments = yearData.reduce(
                                (acc, cv) => {
                                    return (acc += parseInt(
                                        cv.QUANTITYORDERED
                                    ));
                                },
                                0
                            );

                            const nonShippedOrders = yearData.reduce(
                                (acc, cv) => {
                                    if (cv.STATUS.toUpperCase() !== 'SHIPPED') {
                                        acc += cv.QUANTITYORDERED;
                                    } else {
                                        acc += 0;
                                    }

                                    return acc;
                                },
                                0
                            );

                            const netShipments =
                                totalShipments - nonShippedOrders;

                            const netSales = yearData.reduce((acc, cv) => {
                                if (cv.STATUS.toUpperCase() === 'SHIPPED') {
                                    acc += cv.SALES;
                                } else {
                                    acc += 0;
                                }

                                return acc;
                            }, 0);

                            return {
                                productline,
                                territory,
                                totalShipments,
                                netShipments,
                                netSales: netSales.toFixed(2)
                            };
                        });

                        return {
                            productline,
                            territoryWiseData
                        };
                    })
                    .map(line => line.territoryWiseData);

                setSalesSummary(productLinesData);
            });

            fileReader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className="bg-white rounded max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-3xl mx-auto text-center my-10 shadow-md p-4">
            <div className="flex justify-center items-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold mr-1">
                                Click to upload
                            </span>
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            .xls, .xlsx, .csv
                        </p>
                    </div>

                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".xlsx, .xls, .csv"
                        onChange={handleSheetUpload}
                    />
                </label>
            </div>
        </div>
    );
};

export default Uploader;
