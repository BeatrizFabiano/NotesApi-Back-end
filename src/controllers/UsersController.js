/* Hash para cryptografar, e compare para comparar Cryptografias */
const { hash, compare } = require("bcryptjs")
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite/index');
class UsersController {
  async create(request, response) {
    const { name, password } = request.body;
    const email = request.body.email?.toLowerCase();
    const database = await sqliteConnection();

    if (!name) {
      throw new AppError("É preciso inserir um nome")
    }
    if (!email) {
      throw new AppError("É preciso inserir um email")
    }
    if (!password) {
      throw new AppError("É preciso inserir uma senha")
    }

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (checkUserExists) {
      throw new AppError("Este email já está cadastrado.")
    }

    const hashedPassword = await hash(password, 8);

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, password, old_password } = request.body;
    const email = request.body.email?.toLowerCase();
    const user_id = request.user.id;
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
      throw new AppError("Usuário não encontrado.")
    }

    if (email) {
      const checkUserWithInformedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

      if (checkUserWithInformedEmail && checkUserWithInformedEmail.id !== user.id) {
        throw new AppError("Este email já está em uso.")
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("É preciso inserir a senha antiga para definir a nova senha")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
      UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.json();
  }
}

module.exports = UsersController;