export default {
    title: 'repositorys schema',
    description: 'describes a simple book',
    version: 0,
    type: 'object',
    properties: {
        name: {
            type: 'string',
            primary: true
        },
        path: {
            type: 'string'
        },
        open: {
            type: 'number'
        }
    },
    required: ['path']
};