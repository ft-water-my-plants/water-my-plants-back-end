const db = require('../data/db-config');

function find() {
    return db('users')
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users").where("id", id).first();
}

async function add(newUser){
  const [user] = await db('users').insert(newUser, ['username', 'password'])
  return user
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};

// async function add({ username, password, role_name }) { // done for you
//   let created_user_id
//   await db.transaction(async trx => {
//     let role_id_to_use
//     const [role] = await trx('roles').where('role_name', role_name)
//     if (role) {
//       role_id_to_use = role.role_id
//     } else {
//       const [role_id] = await trx('roles').insert({ role_name: role_name })
//       role_id_to_use = role_id
//     }
//     const [user_id] = await trx('users').insert({ username, password, role_id: role_id_to_use })
//     created_user_id = user_id
//   })
//   return findById(created_user_id)
// }
