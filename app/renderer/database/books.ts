export default {
    title: 'book schema',
    description: 'describes a simple book',
    version: 0,
    type: 'object',
    properties: {
        name: {
            type: 'string',
            primary: true
        },
        color: {
            type: 'string'
        },
        open: {
            type: 'number'
        }
    },
    required: []
};