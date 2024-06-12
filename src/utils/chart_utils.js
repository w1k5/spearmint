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