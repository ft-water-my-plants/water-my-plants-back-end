   
const plants = [
    {nickname: 'Plant 1', species: 'Species 1', h2oFrequency: 1},
    {nickname: 'Plant 2', species: 'Species 2', h2oFrequency: 2},
    {nickname: 'Plant 3', species: 'Species 3', h2oFrequency: 3},
    {nickname: 'Plant 4', species: 'Species 4', h2oFrequency: 4}
]
exports.seed = function(knex) {
return knex('plants').del()
    .then(function () {
    return knex('plants').insert(plants);
    });
};