# simuladoSenacWedding07-05-26

## Objetivo do sistema:

>   Desenvolver uma aplicação Web para controle de inscrições em Oficinas, permitindo o cadastro de participantes, instrutores e oficinas, além da realização e consulta das inscrições   
>
>O sistema deve permitir que a instituição visualize quais oficinas estão disponíveis, quantas vagas ainda existem e quais participantes estão inscritos em cada oficina

### Como baixar o projeto e quais os requisitos:

> [!NOTE]
> 
> Tecnologias necessárias: [MySQL Workbench 8.0](https://dev.mysql.com/downloads/mysql/8.0.html), [VSCode](https://code.visualstudio.com/)

#### Como baixar:
 1. Baixe os programas acima (Ao baixar o VSCode selecione a "opção de abrir arquivos com VSCode")
 1. Baixe o projeto pelo [GitHub](https://github.com/rafaelmarmitt/simuladoSenacWedding07-05-26)
    ![Imagem Guia](/img/gitDown.png)
    Clique no botão Verde e após abrir a aba clique em Download ZIP   

 1. Descompacte o arquivo em alguma pasta criada e clique com o botão direito na pasta e selecione "Abrir com VSCode"
 1. Crie um arquivo .env e adicione as variaveis de ambiente  
 Use estas como modelo:
 ```js
    PORT = 3000
    DB_HOST = localhost
    DB_USER = root
    DB_PASS = admin
    DB_NAME = sistema_oficinas
    JWT_SECRET = 'ChaveSecreta'
 ```
 5. Adicione o Seeder no MySQL Workbench e execute o SQL que está no arquivo **banco.sql** da pasta **/BancoDeDados**
 6. Após isso abra o terminal do VSCode, para abrir apenas use o comando **ctrl-shift-''** e execute o comando `npm install express mysql2 cors dotenv` para instalar as dependências
 7. Depois execute o comando `cd backend`no terminal e após isso `node server.js`, assim o sistema estará no ar, podendo ser acessado pelo link: [http://localhost:3000](http://localhost:3000)



## Projeto Desenvolvido:
> [!IMPORTANT]
>
> Não consegui desenvolver grande parte do sistema, fiz o Banco de dados, uma parte do backend e a documentação no tempo de prova.

### Backend
#### Funções Feitas:

##### /backend/controllers/instrutorController.js :

**Listar Instrutores:**
   ``` js
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
   ```

**Criar Instrutores:**
 ```js
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
 ```

**Editar Instrutores:**
```js
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
```

**Excluir Instrutores:**
```js
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
```

##### /backend/controllers/oficinaController.js
**Listar Oficinas:**
   ``` js
// Listar Oficinas
exports.listar = async (req, res) => {
    try {
        const [oficinas] = await db.execute('SELECT titulo, descricao, categoria, carga_horaria, data_oficina, horario, total_vagas, fk_instrutor FROM oficinas ORDER BY data_oficina ASC ');
        return res.json(oficinas)
    } catch (erorr) {
        console.error('Erro ao listar Oficinas: ', error)
        return res.status(500).json({ erro: 'Erro no servidor ao listar oficinas' })
    }
};

   ```

**Criar Oficina:**
 ```js
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
 ```

**Editar Oficina:**
```js
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

```

**Excluir Oficina:**
```js
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
```

##### Estrutura das pastas
![Estrutura das Pastas](/img/pastas.png)

Estrutura simples, mas organizada. Acabei não fazendo front end.

### Banco de dados (Tabelas):
> [!WARNING]
> Todos os campos das tabelas estão como VARHCAR(), sei que está errado e deveria usar DATE, DATETIME, TIME e outros tipos de informação para algumas colunas, mas não consegui fazer a integração, então acabei optando por deixar tudo como VARCHAR para poder entregar alguma coisa.

![Diagrama SQL](/img/diagrama.png)

### Dificuldades Encontradas:
* Acabei tendo bastante dificuldade nos controllers que ainda não decorei no sistema real, que comparando, seria o de convidados e checkins, por isso não consegui desenvolver os controllers de inscrição e participantes.

* Por não saber como fazer o back da forma correta para estes controllers precisei por todos os campos das tabelas em VARCHAR() para tentar integrar com o sistema, mas mesmo assim não consegui.

* Não consegui desenvolver o Front do sistema, basicamente pelo mesmo motivo, não consigo desenvolver a parte do JS do front, as conexões com o back e as funções reativas do sistema.  
* No final, meu servidor não está abrindo, está dando um erro que nunca tinha visto. Eu pesquisei o que poderia ser, mas não consegui achar uma solução