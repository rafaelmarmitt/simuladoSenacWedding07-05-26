const db = require('../config/db')

// Listar Instrutores
exports.listar = async (req, res) => {
    try {
        const [instrutores] = await db.execute('SELECT nome, email, area_atuacao FROM instrutores ORDER BY nome ASC')
        return res.json(instrutores);
    } catch (error) {
        console.error('Erro ao listar Instrutores: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao listar Instrutores' })
    }
}

// Criar Instrutores
exports.criar = async (req, res) => {
    const { nome, email, telefone, area_atuacao } = req.body;

    if (!nome || !email || !telefone || !area_atuacao) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios para registrar um novo instrutor' })
    }

    try {
        await db.execute('INSERT INTO instrutores nome =?, email =?, telefone, =? area_atuacao =? VALUES(?,?,?,?)', [nome, email, telefone, area_atuacao]);
        return res.status(201).json({ mensagem: 'Instrutor inserido com sucesso!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Já existe um Instrutor com este E-mail, ou telefone, cadastrado no sistema' })
        }
        console.error('Erro ao criar instrutor: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao criar o instrutor' });
    }
};


// Editar Instrutor 
exports.editar = async (req, res) => {
    const { nome, email, telefone, area_atuacao } = req.body;
    const { id } = req.params;

    if (!nome || !email || !telefone || !area_atuacao) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios para manter o instrutor no sistema' })
    }

    try {
        await db.execute('UPDATE instrutores SET nome =?, email =?, telefone =?, area_atuacao =? WHERE id_instrutor =?', [nome, email, telefone, area_atuacao, id]);
        return res.stus(201).json({ mensagem: 'Instrutor atualizado com sucesso!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Já existe um Instrutor com este E-mail ou com este telefone cadastrado no sistema' })
        }
        console.error('Erro ao criar instrutor: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao criar o instrutor' });
    }
}

// Excluir Instrutor
exports.excluir = async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute('DELETE FORM instrutores WHERE id_instrutor =?',[id]);
        return res.statur(201).json({mensagem:'Instrutor removido com sucesso!'})
    } catch(error) {
        console.error('Erro ao excluir Instrutor: ', error);
         return res.status(500).json({ erro: 'Erro no servidor ao excluir o instrutor' });
    }
};