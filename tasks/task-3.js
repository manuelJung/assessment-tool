
const users = {
  'id-1': {
    name: 'user-1',
    address: {
      street: 'street 1',
      city: 'city 1'
    }
  },
  'id-2': {
    name: 'user-2',
    address: {
      street: 'street 2',
      city: 'city 1'
    }
  },
  'id-3': {
    name: 'user-3',
    address: {
      street: 'street 3',
      city: 'city 2'
    }
  },
}

// cast to array grouped by city
function format (users) {
  // to implement
}

const result = format(users)

console.log(JSON.stringify(result, null, 2))

const expectedResult = {
  'city 1': [
    {
      id: 'id-1',
      name: 'user-1',
      address: {
        street: 'street 1',
        city: 'city 1'
      }
    },{
      id: 'id-2',
      name: 'user-2',
      address: {
        street: 'street 2',
        city: 'city 1'
      }
    },
  ],
  'city 2': [
    {
      id: 'id-3',
      name: 'user-3',
      address: {
        street: 'street 3',
        city: 'city 2'
      }
    },
  ]
}
