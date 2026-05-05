# URL Shortener API

Projeto simples de encurtador de URLs feito com Node.js, Express e MySQL.

A ideia é transformar links grandes em links curtos e redirecionar para o original.

---

## O que o projeto faz

* Criar links encurtados
* Redirecionar para a URL original
* Contar quantas vezes o link foi acessado
* Validar se a URL é válida

---

## Tecnologias

* Node.js
* Express
* MySQL
* nanoid

---

## Como rodar

1. Clonar o repositório

```
git clone https://github.com/seu-usuario/url-shortener-api.git
```

2. Instalar dependências

```
npm install
```

3. Criar banco de dados no MySQL e tabela:

```sql
CREATE TABLE links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) NOT NULL UNIQUE,
  clicks INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Rodar o servidor

```
node src/server.js
```

---

## Rotas

### Criar link

POST `/shorten`

```json
{
  "url": "https://google.com"
}
```

---

### Usar link encurtado

GET `/:code`

Exemplo:

```
http://localhost:3000/abc123
```

---

## Observações

* Só aceita URLs com http ou https
* Projeto feito para prática de backend

---

## Autor

Tiago Campos da Silva
