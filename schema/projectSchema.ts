const projectSchema = {
    title: 'HTTPInterface schema',
    version: 0,
    primaryKey: 'projectId',
    type: 'object',
    properties: {
        projectId: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        name: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        age: {
            description: 'age in years',
            type: 'integer',

            // number fields that are used in an index, must have set minimum, maximum and multipleOf
            minimum: 0,
            maximum: 150,
            multipleOf: 1
        }
    },
    required: ['firstName', 'lastName', 'projectId'],
    indexes: ['age']
}