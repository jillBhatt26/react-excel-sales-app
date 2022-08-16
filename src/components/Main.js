import { useState, useEffect } from 'react';
import Table from './Table';
import Uploader from './Uploader';

const Main = () => {
    // component states
    const [summaryTableHeaderItems, setSummaryTableHeaderItems] = useState([]);
    const [salesSummary, setSalesSummary] = useState([]);

    useEffect(() => {
        if (salesSummary.length) {
            setSummaryTableHeaderItems(Object.keys(salesSummary[0][0]));
        }
    }, [salesSummary]);

    return (
        <div>
            <Uploader setSalesSummary={setSalesSummary} />

            {salesSummary.length > 0 && (
                <Table
                    salesSummary={salesSummary}
                    summaryTableHeaderItems={summaryTableHeaderItems}
                />
            )}
        </div>
    );
};

export default Main;
