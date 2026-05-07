const db = require('../config/db');

// Listar Oficina
exports.listar = async (req, res) => {
    try {
        const [oficinas] = await db.execute('SELECT titulo, descricao, categoria, carga_horaria, data_oficina, horario, total_vagas, fk_instrutor FROM oficinas ORDER BY data_oficina ASC ');
        return res.json(oficinas)
    } catch (erorr) {
        console.error('Erro ao listar Oficinas: ', error)
        return res.status(500).json({ erro: 'Erro no servidor ao listar oficinas' })
    }
};

// Criar Oficina
exports.criar = async (req, res) => {
    const { titulo, descricao, categoria, carga_horaria, data_oficina, horario, total_vagas, fk_instrutor } = req.body;

    if (!titulo || !descricao || !categoria || !carga_horaria || !data_oficina || !horario || !total_vagas || !fk_instrutor) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios para efetuar o cadastro de uma oficina' })
    }

    if (total_vagas <= 0) {
        return res.status(200).json({ erro: 'O total de vagas deve ser maior que 0' })
    }


    try {
        await db.execute('INSERT INTO oficinas (titulo, descricao, categoria, carga_horaria, data_oficina, horario, total_vagas, fk_instrutor) VALUES (?,?,?,?,?,?,?,?)', [titulo, descricao, categoria, carga_horaria, data_oficina, horario, total_vagas, instrutor])
        return res.status(201).json({ mensagem: 'Oficina Criada com Suceso!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Já existe uma oficina com este título' })
        }
        console.error('Erro ao criar oficina: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao criar a oficina' });
    }
};

// Editar Oficina 
exports.editar = async (req, res) => {
    const { titulo, descricao, categoria, carga_horaria, data_oficina, horario, total_vagas, instrutor } = req.body;
    const { id } = req.params;

    if (!titulo || !descricao || !categoria || !carga_horaria || !data_oficina || !horario || !total_vagas || !instrutor) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios para manter uma oficina no sistema' })
    }

    if (total_vagas <= 0) {
        return res.status(200).json({ erro: 'O total de vagas deve ser maior que 0' })
    }

    try {
        await db.execute('UPDATE oficinas SET  titulo =?, descricao =?, categoria =?, carga_horaria =?, data_oficina =?, horario =?, total_vagas =?, fk_instrutor =? WHERE id_oficina =?', [titulo, descricao, categoria, carga_horaria, data_oficina, horario, total_vagas, instrutor, id])
        return res.status(201).json({ mensagem: 'Oficina atualizada com sucesso!' })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Já existe uma oficina com este Título' })
        }
        console.error('Erro ao editar oficina: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao editar a oficina' });
    }
}

// Excluir Oficina
exports.excluir = async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute('DELETE FROM oficinas WHERE id_oficina =?', [id]);
        return res.status(201).json({ mensagem: 'Oficina excluida com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir oficina: ', error);
        return res.status(500).json({ erro: 'Erro no servidor ao excluir a oficina' });
    }
}