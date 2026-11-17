// Negação por padrão (P13): só estas rotas dispensam login
const ROTAS_PUBLICAS = new Set([
  'GET /api/v1/pontos', 'GET /api/v1/campanhas',
  'POST /api/v1/login', 'POST /api/v1/cadastro',
]);
app.use((req, res, next) =>
  ROTAS_PUBLICAS.has(`${req.method} ${req.path}`) ? next() : autenticar(req, res, next));

// Token conferido com algoritmo, emissor e audiência fixos (P08)
function autenticar(req, res, next) {
  try {
    const dados = jwt.verify(req.cookies.acesso, CHAVE_PUBLICA, {
      algorithms: ['ES256'], issuer: 'conectasangue-api', audience: 'conectasangue',
    });
    req.usuario = { id: dados.sub, perfil: dados.perfil, hemocentroId: dados.hemocentro_id };
    return next();
  } catch {
    return res.status(401).end(); // qualquer erro nega o acesso (falha fechada)
  }
}
const exigirPerfil = (...perfis) => (req, res, next) =>
  (perfis.includes(req.usuario.perfil) ? next() : res.status(403).end());

// Doador: o id vem do token, nunca da URL (P15)
app.get('/api/v1/doadores/me', exigirPerfil('doador'), async (req, res) => {
  const { rows } = await db.query(
    'SELECT nome, email, cep, endereco FROM doadores WHERE id = $1',
    [req.usuario.id]);
  return rows.length ? res.json(rows[0]) : res.status(404).end();
});

// Operador: só confirmações de campanhas do próprio hemocentro (P16)
app.get('/api/v1/campanhas/:id/confirmacoes', exigirPerfil('operador'), async (req, res) => {
  const { rows } = await db.query(
    `SELECT d.nome, d.telefone
       FROM confirmacoes c
       JOIN campanhas k ON k.id = c.id_campanha
       JOIN doadores d ON d.id = c.id_doador
      WHERE c.id_campanha = $1 AND k.hemocentro_id = $2`,
    [req.params.id, req.usuario.hemocentroId]);
  return res.json(rows); // campanha de outro hemocentro devolve lista vazia
});
