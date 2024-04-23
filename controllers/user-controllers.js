const users = [
    {id: 1, name: 'Name 1'},
    {id: 2, name: 'Name 2'},
    {id: 3, name: 'Name 3'}
];

exports.getUsers = (request, response) => {
    response.status(200).json({success: true, count: users.length, data: users});
}
