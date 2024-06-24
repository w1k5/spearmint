export const options = {
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    if (context.raw !== null) {
                        return new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(context.raw);
                    }
                },
                maintainAspectRatio: false
            },
        },
    },
};

export const groupBy = (data, interval) => {
    const groupedData = {};

    data.forEach(entry => {
        const date = new Date(entry.date || entry.Date);
        let key;

        switch (interval) {
            case 'week':
                const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
                key = `${weekStart.getFullYear()}-${weekStart.getMonth() + 1}-${weekStart.getDate()}`;
                break;
            case 'year':
                key = date.getFullYear();
                break;
            case 'month':
                key = `${date.getFullYear()}-${date.getMonth() + 1}`;
                break;
            default:
            case 'daily':
                key = date.toLocaleDateString();
                break;
        }

        if (!groupedData[key]) {
            groupedData[key] = [];
        }

        groupedData[key].push(entry);
    });

    return groupedData;
};

export const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};